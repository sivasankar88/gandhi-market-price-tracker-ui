export interface CropPrice {
  cropName: string
  tamilName: string
  price1: number
  price2: number
  price3: number
  price4: number
}

export interface Crop {
  id: number
  name: string
  tamilName: string
}

export interface SavePricePayload {
  cropId: number
  minPrice: number
  maxPrice: number
}

export type Trend = 'up' | 'down' | 'same'

export type ToastType = 'success' | 'error'

export interface Toast {
  id: number
  message: string
  type: ToastType
}

export interface CropInputState {
  minPrice: string
  maxPrice: string
}
