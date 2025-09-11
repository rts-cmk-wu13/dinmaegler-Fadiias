
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: 'DKK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * Format area in square meters
 */
export const formatArea = (area: number): string => {
  return `${area} m²`
}

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Format address as a single string
 */
export const formatAddress = (address: {
  street: string
  city: string
  postalCode: string
  region: string
}): string => {
  return `${address.street}, ${address.postalCode}  ${address.city}`
}

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: ReturnType<typeof setTimeout>
  
  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as T
}
