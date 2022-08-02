import { useState } from "react";
import { useQuery } from "react-query";
import { TableCustom } from "../../components/custom/table/Table";
import SuperAdmin from "../../components/layouts/SuperAdmin";
import { useGetListProfit } from "../../hooks/useGetListProfit";
import { getListTransactionVendor } from "../../utils/data";
export const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isError, isLoading, isFetching, refetch } =
    useGetListProfit();
  const config: Array<{ title: string; key: string; type?: string }> = [
    { title: "Sum Of Profit", key: "sum", type: "number" },
    { title: "Month", key: "month" },
  ];
  const handleChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <SuperAdmin>
      <div className="flex-initial w-full overflow-auto">
        <TableCustom
          data={data}
          config={config}
          currentPage={currentPage}
          error={error}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          subTitle="List Transaction"
          title="Transaction"
          handleChange={handleChange}
        ></TableCustom>
      </div>
    </SuperAdmin>
  );
};
