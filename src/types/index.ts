export interface CropPrice {
  id: number;
  cropName: string;
  tamilName: string;
  maxPrice1: number;
  maxPrice2: number;
  maxPrice3: number;
  maxPrice4: number;
  minPrice1: number;
  minPrice2: number;
  minPrice3: number;
  minPrice4: number;
}
export interface Crop {
  id: number;
  name: string;
  tamilName: string;
  minPrice: string;
  maxPrice: string;
}

export interface SavePricePayload {
  cropId: number;
  minPrice: number;
  maxPrice: number;
}

export type Trend = "up" | "down" | "same";

export type ToastType = "success" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface CropInputState {
  minPrice: string;
  maxPrice: string;
}

export type TrendType = "LAST30" | "MONTHLY" | "YEARLY";

export interface TrendPoint {
  label: string;
  value: number;
}

export interface TrendOption {
  type: TrendType;
  label: string;
  tamilLabel: string;
  description: string;
}

export interface CropPriceWithId extends CropPrice {
  id: number;
}
