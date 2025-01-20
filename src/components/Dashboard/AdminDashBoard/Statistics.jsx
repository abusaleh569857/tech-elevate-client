import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5000/site-statistics")
      .then((res) => setData(res.data))
      .catch((error) =>
        console.error("Error fetching site statistics:", error)
      );
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Site Statistics
      </h2>
      {data.length > 0 ? (
        <div className="flex justify-center">
          <PieChart width={500} height={500}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={(entry) => `${entry.name}: ${entry.value}`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading statistics...</p>
      )}
    </div>
  );
};

export default Statistics;
