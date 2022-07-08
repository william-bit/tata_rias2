import { useState } from "react";
import { useQuery } from "react-query";
import InputForm from "../../components/custom/InputForm";
import { TableCustom } from "../../components/custom/Table";
import Admin from "../../components/layouts/Admin";
import { getListProduct } from "../../utils/data";
const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    ["trans", currentPage],
    () => getListProduct(currentPage),
    { keepPreviousData: true }
  );
  const config: Array<{ title: string; key: string; type?: string }> = [
    { title: "Photo", key: "photo", type: "image" },
    { title: "Name", key: "name" },
    { title: "Date", key: "created_at" },
    { title: "Price", key: "price" },
    { title: "Unit", key: "unit" },
    { title: "Location", key: "location" },
    { title: "Description", key: "description" },
    { title: "Status", key: "status", type: "status" },
  ];
  console.log(data);
  const handleChange = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Admin>
      <InputForm refetch={refetch}></InputForm>
      <div className="flex-initial w-full overflow-auto">
        <TableCustom
          data={data}
          config={config}
          isDelete={true}
          handleDelete={(id) => console.log(id)}
          currentPage={currentPage}
          error={error}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          subTitle="List Product"
          title="Tata Rias Product"
          handleChange={handleChange}
        ></TableCustom>
      </div>
    </Admin>
  );
};

export default Product;
