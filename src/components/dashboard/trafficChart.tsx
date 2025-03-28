import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { environment } from "../../config/environment";
import axios from "../../lib/apiConfig";

export interface ChartData {
  name: string;
  value: number;
}

interface TrafficChartProps {
  layout?: "vertical" | "horizontal";
}

export const TrafficChart = ({ layout = "vertical" }: TrafficChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchBandwidth = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/1/bandwidth`
        );
        const bandwidthData = response?.data?.data?.result?.current_month;

        if (bandwidthData) {
          const BW_IN = parseFloat(bandwidthData.BW_IN) || 0.01;
          const BW_OUT = parseFloat(bandwidthData.BW_OUT) || 0.01;

          const formattedData: ChartData[] = [
            { name: "Inbound", value: BW_IN },
            { name: "Outbound", value: BW_OUT },
          ];

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching bandwidth data:", error);
      }
    };

    fetchBandwidth();
  }, []);

  return (
    <div className="flex py-6 px-0 text-xs mx-0">
      <ResponsiveContainer width="85%" height={200}>
        <BarChart
          layout={layout === "horizontal" ? "vertical" : "horizontal"}
          data={chartData}
        >
          <XAxis
            type={layout === "horizontal" ? "number" : "category"}
            domain={
              layout === "horizontal"
                ? [0, Math.max(...chartData.map((data) => data.value)) + 50]
                : undefined
            }
            dataKey={layout === "horizontal" ? undefined : "name"}
          />
          <YAxis
            type={layout === "horizontal" ? "category" : "number"}
            dataKey={layout === "horizontal" ? "name" : undefined}
          />
          <Tooltip cursor={false} />
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={40}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
