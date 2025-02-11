import {
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    date: "Jun 1, 24",
    completed: 47,
    "in progress": 83,
    "on hold": 67,
  },
  {
    date: "Jun 2, 24",
    completed: 20,
    "in progress": 97,
    "on hold": 12,
  },
  {
    date: "Jun 3, 24",
    completed: 30,
    "in progress": 45,
    "on hold": 66,
  },
  {
    date: "Jun 4, 24",
    completed: 41,
    "in progress": 18,
    "on hold": 70,
  },
  {
    date: "Jun 5, 24",
    completed: 55,
    "in progress": 14,
    "on hold": 60,
  },
  {
    date: "Jun 6, 24",
    completed: 35,
    "in progress": 14,
    "on hold": 80,
  },
  {
    date: "Jun 7, 24",
    completed: 15,
    "in progress": 55,
    "on hold": 72,
  },
  {
    date: "Jun 8, 24",
    completed: 15,
    "in progress": 69,
    "on hold": 45,
  },
];

export const Chart = () => {
  return (
    <div className="flex py-6 px-0 text-xs mx-0">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ left: 0 }} className="-ml-4">
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="in progress" stroke="#82ca9d" />
          <Line type="monotone" dataKey="on hold" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
