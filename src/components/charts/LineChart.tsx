import { useEffect, useRef } from "react";
import type { TrendPoint, TrendType } from "../../types";

interface LineChartProps {
  data: TrendPoint[];
  cropName: string;
  type: TrendType;
}

export default function LineChart({ data, cropName, type }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const ctx = canvasRef.current!.getContext("2d");
      if (!ctx) return;

      const values = data.map((d) => d.value);
      const maxVal = Math.max(...values);
      const minVal = Math.min(...values);

      // Lush green-to-amber fill gradient
      const fillGradient = ctx.createLinearGradient(0, 0, 0, 350);
      fillGradient.addColorStop(0, "rgba(22, 163, 74, 0.35)");
      fillGradient.addColorStop(0.6, "rgba(201, 117, 32, 0.12)");
      fillGradient.addColorStop(1, "rgba(201, 117, 32, 0.0)");

      // Format labels for LAST30
      const labels = data.map((d) => {
        if (type === "LAST30") {
          const parts = d.label.split("-");
          if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
        }
        return d.label;
      });

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: `${cropName} Price`,
              data: values,
              borderColor: "rgba(22, 163, 74, 1)",
              borderWidth: 3,
              backgroundColor: fillGradient,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: values.map((v) => {
                if (v === maxVal) return "#dc2626";
                if (v === minVal) return "#16a34a";
                return "#c97520";
              }),
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 9,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(26, 15, 0, 0.92)",
              titleColor: "#f1d0a0",
              bodyColor: "#e6b068",
              padding: 14,
              cornerRadius: 12,
              displayColors: false,
              callbacks: {
                title: (items) => items[0].label,
                label: (ctx) => {
                  const v = ctx.parsed.y;
                  const suffix =
                    v === maxVal ? " 🔺 Peak" : v === minVal ? " 🔻 Low" : "";
                  return `  ₹${v}${suffix}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#854516",
                font: { size: data.length > 15 ? 10 : 13 },
                maxRotation: data.length > 10 ? 45 : 0,
              },
              border: { display: false },
            },
            y: {
              grid: { color: "rgba(22, 163, 74, 0.1)" },
              ticks: {
                color: "#854516",
                font: { size: 12 },
                callback: (v) => `₹${v}`,
              },
              border: { display: false },
            },
          },
          animation: { duration: 1000, easing: "easeInOutCubic" },
        },
      });
    };

    void loadChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, cropName, type]);

  return (
    <div className="relative w-full" style={{ height: "300px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
