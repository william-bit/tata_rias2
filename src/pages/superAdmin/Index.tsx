import SuperAdmin from "../../components/layouts/SuperAdmin";

import { AxiosResponse } from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetListProfit } from "../../hooks/useGetListProfit";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options: ChartOptions<"bar"> = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value, index, ticks) {
          return "Rp." + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
      },
    },
  },
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

const dataReform = (
  dataProfit: AxiosResponse | undefined
): ChartData<"bar", any[], any> => {
  let resource = dataProfit?.data?.resource?.data;
  console.log(resource);
  let data = monthName?.map((value, index: number) => {
    let dataMonth = resource.find((element: any) => {
      return element.month - 1 == index;
    });
    if (dataMonth) {
      return dataMonth?.sum;
    } else {
      return 0;
    }
  });
  let labels = monthName?.map((value: any) => value);
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
