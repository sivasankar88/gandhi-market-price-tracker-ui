import { useEffect, useState } from "react";
import useCrops from "../hooks/useCrops";
import { adminApi } from "../services/api";
import { useToast } from "../components/ui/ToastProvider";
import Spinner from "../components/ui/Spinner";
import ErrorBanner from "../components/ui/ErrorBanner";
import type { Crop, CropInputState } from "../types";
import axios from "axios";

export default function AdminDashboard() {
  const { crops, loading, error, refresh } = useCrops();
  const showToast = useToast();
  const [inputs, setInputs] = useState<Record<number, CropInputState>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [newCrop, setNewCrop] = useState<{ name: string; tamilName: string }>({
    name: "",
    tamilName: "",
  });
  const [savingCrop, setSavingCrop] = useState(false);
  useEffect(() => {
    console.log("rendered");
    initialUpdate();
  }, [crops]);

  const handleChange = (
    cropId: number,
    field: keyof CropInputState,
    value: string,
  ): void => {
    setInputs((prev) => ({
      ...prev,
      [cropId]: { ...prev[cropId], [field]: value },
    }));
  };

  const initialUpdate = () => {
    let inputValue: Record<number, CropInputState> = {};
    crops.map((item: Crop) => {
      inputValue[item.id] = {
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
      };
    });
    console.log(inputValue);
    setInputs(inputValue);
  };

  const handleSave = async (
    cropId: number,
    cropName: string,
  ): Promise<void> => {
    const cropInputs = inputs[cropId] ?? { minPrice: "", maxPrice: "" };
    const minPrice = parseFloat(cropInputs.minPrice);

    if (!cropInputs.minPrice || isNaN(minPrice)) {
      showToast("Please enter a Min Price.", "error");
      return;
    }

    const maxPrice =
      cropInputs.maxPrice && !isNaN(parseFloat(cropInputs.maxPrice))
        ? parseFloat(cropInputs.maxPrice)
        : minPrice;

    setSaving((prev) => ({ ...prev, [cropId]: true }));
    try {
      await adminApi.savePrice({ cropId, minPrice, maxPrice });
      showToast(`Price saved for ${cropName}!`, "success");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { message?: string })?.message ??
          "Failed to save price.")
        : "Failed to save price. Try again.";
      showToast(message, "error");
    } finally {
      setSaving((prev) => ({ ...prev, [cropId]: false }));
      refresh();
    }
  };

  const handleSaveCrop = async (newCrop: {
    name: string;
    tamilName: string;
  }): Promise<void> => {
    if (!newCrop.name) {
      showToast("Please enter crop name.", "error");
      return;
    }
    if (!newCrop.tamilName) {
      showToast("Please enter crop's tamil name.", "error");
      return;
    }
    setSavingCrop(true);
    try {
      await adminApi.saveCrop(newCrop);
      showToast(`Crop ${newCrop.name} added successfully`, "success");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? ((err.response?.data as { message?: string })?.message ??
          "Failed to add crop.")
        : "Failed to add crop. Try again.";
      showToast(message, "error");
    } finally {
      setSavingCrop(false);
      refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-800">
          Admin — Enter Prices
        </h1>
        <p className="font-tamil text-earth-500 text-base mt-1">விலை உள்ளீடு</p>
      </div>

      {loading && <Spinner />}
      {error && <ErrorBanner message={error} />}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          {crops.map((crop) => {
            const cropInputs = inputs[crop.id] ?? {
              minPrice: "",
              maxPrice: "",
            };
            const isSaving = saving[crop.id] ?? false;
            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border border-earth-100 shadow-sm p-5">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-earth-800">
                    {crop.name}
                  </h2>
                  <p className="font-tamil text-earth-500 text-sm">
                    {crop.tamilName}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-earth-500 mb-1 uppercase tracking-wide">
                      Min Price (₹) <span className="text-chili-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 40"
                      value={
                        cropInputs.minPrice != "0" ? cropInputs.minPrice : ""
                      }
                      onChange={(e) =>
                        handleChange(crop.id, "minPrice", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 text-earth-800 text-lg font-semibold focus:outline-none focus:border-earth-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-earth-500 mb-1 uppercase tracking-wide">
                      Max Price (₹){" "}
                      <span className="text-earth-400 font-normal normal-case">
                        (optional — defaults to min)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 55"
                      value={
                        cropInputs.maxPrice != "0" ? cropInputs.maxPrice : ""
                      }
                      onChange={(e) =>
                        handleChange(crop.id, "maxPrice", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 text-earth-800 text-lg font-semibold focus:outline-none focus:border-earth-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={() => void handleSave(crop.id, crop.name)}
                  disabled={isSaving}
                  className="mt-4 w-full py-3 bg-earth-700 text-white rounded-xl font-bold text-base active:scale-95 transition-all hover:bg-earth-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {isSaving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
                      Saving...
                    </>
                  ) : (
                    "💾 Save Price"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
      <br></br>
      {!loading && !error && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 border-l-4 border-l-amber-500 shadow-sm p-5">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-amber-700">Add new Crop</h2>
            <p className="font-tamil text-earth-500 text-sm">
              புதிய பயிரைச் சேர்
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-earth-500 mb-1 uppercase tracking-wide">
                Name <span className="text-chili-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tomato"
                value={newCrop.name}
                onChange={(e) => {
                  setNewCrop((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
                className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 text-earth-800 text-lg font-semibold focus:outline-none focus:border-earth-500 focus:bg-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-earth-500 mb-1 uppercase tracking-wide">
                Tamil Name
                <span className="text-chili-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. தக்காளி"
                value={newCrop.tamilName}
                onChange={(e) => {
                  setNewCrop((prev) => {
                    return { ...prev, tamilName: e.target.value };
                  });
                }}
                className="w-full px-4 py-3 rounded-xl border border-earth-200 bg-earth-50 text-earth-800 text-lg font-semibold focus:outline-none focus:border-earth-500 focus:bg-white transition-colors"
              />
            </div>
          </div>
          <button
            onClick={() => void handleSaveCrop(newCrop)}
            disabled={savingCrop}
            className="mt-4 w-full py-3 bg-amber-700 text-white rounded-xl font-bold text-base active:scale-95 transition-all hover:bg-earth-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {savingCrop ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full spinner" />
                Saving...
              </>
            ) : (
              "💾 Save Crop"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
