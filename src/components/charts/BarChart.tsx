import { useEffect, useRef } from "react";
import type { TrendPoint } from "../../types";

interface BarChartProps {
  data: TrendPoint[];
  cropName: string;
}

export default function BarChart({ data, cropName }: BarChartProps) {
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

      const gradient = ctx.createLinearGradient(0, 0, 0, 350);
      gradient.addColorStop(0, "rgba(201, 117, 32, 0.92)");
      gradient.addColorStop(1, "rgba(201, 117, 32, 0.3)");

      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              label: `${cropName} — Yearly Avg`,
              data: values,
              backgroundColor: values.map((v) =>
                v === maxVal ? "rgba(22, 163, 74, 0.88)" : gradient,
              ),
              borderColor: values.map((v) =>
                v === maxVal
                  ? "rgba(22, 163, 74, 1)"
                  : "rgba(133, 69, 22, 0.7)",
              ),
              borderWidth: 2,
              borderRadius: 12,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(66, 36, 24, 0.96)",
              titleColor: "#f1d0a0",
              bodyColor: "#e6b068",
              padding: 14,
              cornerRadius: 12,
              displayColors: false,
              callbacks: {
                title: (items) => items[0].label,
                label: (ctx) => `  Average Price: ₹${ctx.parsed.y}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#854516", font: { size: 14, weight: "bold" } },
              border: { display: false },
            },
            y: {
              grid: { color: "rgba(201, 117, 32, 0.12)" },
              ticks: {
                color: "#854516",
                font: { size: 12 },
                callback: (v) => `₹${v}`,
              },
              border: { display: false },
            },
          },
          animation: { duration: 900, easing: "easeOutQuart" },
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
  }, [data, cropName]);

  return (
    <div className="relative w-full" style={{ height: "300px" }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
