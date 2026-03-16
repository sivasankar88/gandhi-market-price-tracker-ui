import axios from "axios";
import type {
  CropPrice,
  Crop,
  SavePricePayload,
  TrendType,
  TrendPoint,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const farmerApi = {
  getPrices: () => api.get<CropPrice[]>("/public/farmerDashboard"),
};

export const cropApi = {
  getAll: () => api.get<Crop[]>("/public/allCrops"),
};

export const adminApi = {
  savePrice: (payload: SavePricePayload) => api.post("/admin/prices", payload),
};

export const trendApi = {
  getTrend: (cropId: number, type: TrendType) =>
    api.get<TrendPoint[]>(`/public/prices/trend`, { params: { cropId, type } }),
};

export default api;
