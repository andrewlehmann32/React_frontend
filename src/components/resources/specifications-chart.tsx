import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface SpecificationsChartProps {
  layout?: "vertical" | "horizontal";
  chartData: ChartData[];
}

export const SpecificationsChart = ({
  layout = "vertical",
  chartData = [],
}: SpecificationsChartProps) => {
  return (
    <div className="flex py-6 px-0 text-xs mx-0">
      <ResponsiveContainer width="100%" height={200}>
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
