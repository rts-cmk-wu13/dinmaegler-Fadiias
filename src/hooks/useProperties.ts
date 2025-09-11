import { useState, useEffect } from 'react'
import { Property, PropertyFilters } from '@/types'
import { apiService } from '@/services/api'

interface UsePropertiesOptions extends PropertyFilters {
  limit?: number
}

interface UsePropertiesReturn {
  properties: Property[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
}

export const useProperties = (options?: UsePropertiesOptions): UsePropertiesReturn => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<UsePropertiesReturn['pagination']>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // In development mode, always use mock data if no backend is available
        if (import.meta.env.DEV) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const mockData = createMockProperties(options?.limit || 10)
          setProperties(mockData)
          setPagination({
            page: 1,
            limit: options?.limit || 10,
            total: 100,
            totalPages: Math.ceil(100 / (options?.limit || 10))
          })
          setLoading(false)
          return
        }
        
        const data = await apiService.getProperties(options)
        
        // Apply limit if specified
        const limitedData = options?.limit ? data.slice(0, options.limit) : data
        
        setProperties(limitedData)
        setPagination({
          page: 1,
          limit: options?.limit || data.length,
          total: data.length,
          totalPages: 1
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Fallback to mock data in case of API error
        const mockData = createMockProperties(options?.limit || 10)
        setProperties(mockData)
        setPagination({
          page: 1,
          limit: options?.limit || 10,
          total: 100,
          totalPages: Math.ceil(100 / (options?.limit || 10))
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [options])

  return { properties, loading, error, pagination }
}

// Mock data for development
const createMockProperties = (limit: number): Property[] => {
  return Array.from({ length: limit }, (_, i) => ({
    id: `property-${i + 1}`,
    energylabel: ['A', 'B', 'C', 'D'][i % 4],
    type: i % 2 === 0 ? 'Villa' : 'Ejerlejlighed',
    images: [{
      name: `image-${i}.jpg`,
      size: 100,
      width: 400,
      height: 300,
      url: `/placeholder-property-${(i % 4) + 1}.jpg`,
      formats: {
        thumbnail: {
          name: `thumb-${i}.jpg`,
          hash: `hash-${i}`,
          ext: '.jpg',
          mime: 'image/jpeg',
          width: 200,
          height: 150,
          size: 25,
          path: null,
          url: `/placeholder-thumb-${(i % 4) + 1}.jpg`
        }
      },
      id: `img-${i}`
    }],
    gross: 8000 + (i * 500),
    payment: 200000 + (i * 50000),
    price: 2500000 + (i * 250000),
    city: ['København', 'Aarhus', 'Odense', 'Roskilde'][i % 4],
    cost: 3000 + (i * 200),
    basementsize: i % 3 === 0 ? 50 : 0,
    lotsize: 500 + (i * 100),
    netto: 6000 + (i * 400),
    postalcode: 2000 + i,
    adress1: `Eksempelvej ${i + 1}`,
    adress2: ['Centrum', 'Nord', 'Vest', 'Øst'][i % 4],
    description: `Smuk og velindrettet ${i % 2 === 0 ? 'villa' : 'lejlighed'} beliggende i roligt område med gode transportmuligheder.`,
    livingspace: 120 + (i * 20),
    agent: {
      name: `Mægler ${['Hansen', 'Nielsen', 'Jensen'][i % 3]}`,
      title: 'Ejendomsmægler',
      phone: '+45 7070 4000',
      email: `agent${(i % 3) + 1}@dinmaegler.dk`,
      image: {
        name: `agent-${i}.jpg`,
        size: 50,
        width: 200,
        height: 200,
        url: `/placeholder-agent-${(i % 3) + 1}.jpg`,
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
            url: `/placeholder-agent-thumb-${(i % 3) + 1}.jpg`
          }
        },
        id: `agent-img-${i}`
      },
      description: 'Erfaren ejendomsmægler',
      id: `agent-${(i % 3) + 1}`
    },
    built: 1980 + i,
    remodel: i % 2 === 0 ? 2010 + i : undefined,
    rooms: `${3 + (i % 3)}/${2 + (i % 2)}`,
    floorplan: {
      name: `floorplan-${i}.jpg`,
      size: 75,
      width: 600,
      height: 400,
      url: `/placeholder-floorplan-${i}.jpg`,
      formats: {
        thumbnail: {
          name: `floorplan-thumb-${i}.jpg`,
          hash: `floorplan-hash-${i}`,
          ext: '.jpg',
          mime: 'image/jpeg',
          width: 300,
          height: 200,
          size: 20,
          path: null,
          url: `/placeholder-floorplan-thumb-${i}.jpg`
        }
      },
      id: `floorplan-${i}`
    },
    lat: 55.6761 + (i * 0.01),
    long: 12.5683 + (i * 0.01),
    users: []
  }))
}
