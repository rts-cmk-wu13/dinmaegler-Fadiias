
export interface PropertyImage {
  name: string
  size: number
  width: number
  height: number
  url: string
  formats: {
    thumbnail: {
      name: string
      hash: string
      ext: string
      mime: string
      width: number
      height: number
      size: number
      path: string | null
      url: string
    }
  }
  id: string
}

export interface Agent {
  name: string
  title: string
  phone: string
  email: string
  image: PropertyImage
  description: string
  id: string
}

export interface Property {
  id: string
  energylabel: string
  type: string
  images: PropertyImage[]
  gross: number
  payment: number
  price: number
  city: string
  cost: number
  basementsize: number
  lotsize: number
  netto: number
  postalcode: number
  adress1: string
  adress2: string
  description: string
  livingspace: number
  agent: Agent
  built: number
  remodel?: number
  rooms: string
  floors?: number
  basement?: string
  floorplan: PropertyImage
  lat: number
  long: number
  users: any[]
}


export interface PropertyFilters {
  minPrice?: number
  maxPrice?: number
  type?: string
  city?: string
  minLivingspace?: number
  maxLivingspace?: number
  energylabel?: string
}
