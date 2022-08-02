import { useState } from "react";
import { useQuery } from "react-query";
import { TableCustom } from "../../components/custom/table/Table";
import SuperAdmin from "../../components/layouts/SuperAdmin";
import { getListTransactionVendor } from "../../utils/data";
export const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    ["trans", currentPage],
    () => getListTransactionVendor(currentPage),
    { keepPreviousData: true }
  );
  const config: Array<{ title: string; key: string; type?: string }> = [
    { title: "Photo Product", key: "photo", type: "image" },
    { title: "Photo Payment", key: "photoPayment", type: "image" },
    { title: "Name Customer", key: "custName" },
    { title: "Total", key: "price" },
    { title: "Unit", key: "unit" },
    { title: "Status", key: "status", type: "status" },
  ];
  console.log(data);
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
