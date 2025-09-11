import { Property, Agent, PropertyFilters } from '@/types'

const API_BASE_URL = 'https://dinmaegler.onrender.com'

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Property endpoints
  async getProperties(filters?: PropertyFilters): Promise<Property[]> {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString())
        }
      })
    }

    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request<Property[]>(`/Homes${query}`)
  }

  async getProperty(id: string): Promise<Property> {
    return this.request<Property>(`/Homes/${id}`)
  }

  // Agent endpoints
  async getAgents(): Promise<Agent[]> {
    return this.request<Agent[]>('/agents')
  }

  async getAgent(id: string): Promise<Agent> {
    return this.request<Agent>(`/agents/${id}`)
  }
}

export const apiService = new ApiService()
