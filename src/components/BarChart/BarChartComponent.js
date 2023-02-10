import React from "react";
import "./BarChartComponent.css";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data, dataKey, nameKey }) {
  return (
    <ResponsiveContainer height={500} className="chartContainer">
      <BarChart data={data}>
        <YAxis />
        <XAxis dataKey={nameKey} />
        <Legend></Legend>
        <Bar dataKey={dataKey} fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}
