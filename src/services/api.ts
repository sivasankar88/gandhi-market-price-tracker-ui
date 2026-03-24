import axiosInstance from "./axiosInstance";
import type {
  CropPrice,
  Crop,
  SavePricePayload,
  TrendType,
  TrendPoint,
} from "../types";

export const farmerApi = {
  getPrices: () => axiosInstance.get<CropPrice[]>("/public/farmerDashboard"),
};

export const cropApi = {
  getAll: () => axiosInstance.get<Crop[]>("/admin/getCropsWithPrices"),
};

export const adminApi = {
  savePrice: (payload: SavePricePayload) =>
    axiosInstance.post("/admin/prices", payload),
  saveCrop: (payload: { name: string; tamilName: string }) =>
    axiosInstance.post("/admin/addCrop", payload),
};

export const trendApi = {
  getTrend: (cropId: number, type: TrendType) =>
    axiosInstance.get<TrendPoint[]>(`/public/prices/trend`, {
      params: { cropId, type },
    }),
};

export const auth = {
  login: (credentials: any) => axiosInstance.post(`/auth/login`, credentials),
  refresh: (token: any) =>
    axiosInstance.post(`/auth/refresh`, { refreshToken: token }),
};
