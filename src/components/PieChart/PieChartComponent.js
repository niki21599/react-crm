import React from "react";
import "./PieChartComponent.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function PieChartComponent({ data, dataKey, nameKey }) {
  let COLORS = ["#e0e002", "#f54242", "#256617", "#8884d8", "#0519f7"];
  return (
    <ResponsiveContainer height={400} className="chartContainer">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="100%"
        >
          {data.map((entry, index) => (
            <Cell key={entry} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend></Legend>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
