import { useState, useEffect } from 'react'
import { Agent } from '@/types'
import { apiService } from '@/services/api'

interface UseAgentsOptions {
  limit?: number
}

interface UseAgentsReturn {
  agents: Agent[]
  loading: boolean
  error: string | null
}

export const useAgents = (options?: UseAgentsOptions): UseAgentsReturn => {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // In development mode, always use mock data if no backend is available
        if (import.meta.env.DEV) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 300))
          
          const mockData = createMockAgents(options?.limit || 10)
          setAgents(mockData)
          setLoading(false)
          return
        }
        
        const response = await apiService.getAgents()
        
        const limitedAgents = options?.limit 
          ? response.slice(0, options.limit)
          : response
        setAgents(limitedAgents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Fallback to mock data in case of API error
        const mockData = createMockAgents(options?.limit || 10)
        setAgents(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [options?.limit])

  return { agents, loading, error }
}

// Mock data for development
const createMockAgents = (limit: number): Agent[] => {
  const agentNames = ['Peter Hansen', 'Maria Nielsen', 'Lars Jensen', 'Anna Andersen', 'Thomas Madsen']
  const titles = ['Ejendomsmægler', 'Boligrådgiver', 'Senior Mægler', 'Salgschef']
  
  return Array.from({ length: Math.min(limit, agentNames.length) }, (_, i) => ({
    name: agentNames[i],
    title: titles[i % titles.length],
    phone: '+45 7070 4000',
    email: `${agentNames[i].toLowerCase().replace(' ', '.')}@dinmaegler.dk`,
    image: {
      name: `agent-${i}.jpg`,
      size: 50,
      width: 200,
      height: 200,
      url: `/placeholder-agent-${i + 1}.jpg`,
      formats: {
        thumbnail: {
          name: `agent-thumb-${i}.jpg`,
          hash: `agent-hash-${i}`,
          ext: '.jpg',
          mime: 'image/jpeg',
          width: 100,
          height: 100,
          size: 15,
          path: null,
          url: `/placeholder-agent-thumb-${i + 1}.jpg`
        }
      },
      id: `agent-img-${i}`
    },
    description: `Erfaren ${titles[i % titles.length].toLowerCase()} med mange års erfaring på det danske boligmarked.`,
    id: `agent-${i + 1}`
  }))
}
