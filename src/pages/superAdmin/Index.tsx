import React from "react";
import SuperAdmin from "../../components/layouts/SuperAdmin";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Total Transaction",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Order Count",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export const Index = () => {
  return (
    <SuperAdmin>
      <div className="flex flex-col w-full h-full">
        <div className="h-80 mt-11">
          <Bar options={options} data={data} />
        </div>
      </div>
    </SuperAdmin>
  );
};
