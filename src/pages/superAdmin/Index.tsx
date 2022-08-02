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
import { useGetListProfit } from "../../hooks/useGetListProfit";
import { AxiosResponse } from "axios";

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

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Augustus",
  "September",
  "October",
  "November",
  "December",
];

const dataReform = (dataProfit: AxiosResponse | undefined) => {
  let resource = dataProfit?.data?.resource?.data;
  let data = resource?.map((value: any) => value.sum);
  let labels = resource?.map((value: any) => value.month);
  return {
    labels,
    datasets: [
      {
        label: "Profit Report",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
};
export const Index = () => {
  const dataPost = useGetListProfit();
  return (
    <SuperAdmin>
      <div className="flex flex-col w-full h-full">
        <div className="h-80 mt-11">
          <Bar options={options} data={dataReform(dataPost.data)} />
        </div>
      </div>
    </SuperAdmin>
  );
};
