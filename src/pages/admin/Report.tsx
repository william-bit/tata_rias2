import { useState } from "react";
import { useQuery } from "react-query";
import InputForm from "../../components/custom/InputForm";
import { TableCustom } from "../../components/custom/Table";
import Admin from "../../components/layouts/Admin";
import { getListProduct } from "../../utils/data";
const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    ["trans", currentPage],
    () => getListProduct(currentPage),
    { keepPreviousData: true }
  );
  const config: Array<{ title: string; key: string; type?: string }> = [
    { title: "Photo", key: "photo", type: "image" },
    { title: "Name Customer", key: "name" },
    { title: "Total", key: "price" },
    { title: "Unit", key: "unit" },
    { title: "Status", key: "status", type: "status" },
  ];
  console.log(data);
  const handleChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Admin>
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
          title="Trans"
          handleChange={handleChange}
        ></TableCustom>
      </div>
    </Admin>
  );
};

export default Report;
