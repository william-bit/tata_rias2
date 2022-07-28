import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormReset,
  Controller,
} from "react-hook-form";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
  useQuery,
} from "react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputForm from "../../components/custom/input/InputForm";
import { TableCustom } from "../../components/custom/table/Table";
import Admin from "../../components/layouts/Admin";
import { getDetailProduct, getListProduct } from "../../utils/data";
import {
  IProductParam,
  storeProduct,
  updateProduct,
} from "../../utils/postData";

interface ILaravelApiErrorReturn {
  message?: string;
  errors?: {
    [error: string]: string[];
  };
}

const useProductUpdateAndSubmit = (
  reset: UseFormReset<any>,
  navigate: NavigateFunction,
  setFormError: React.Dispatch<React.SetStateAction<ILaravelApiErrorReturn>>,
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>
) => {
  return useMutation(
    (data: IProductParam) => {
      const formData = new FormData();
      for (const property in data) {
        if (property == "image") {
          formData.append("image", data[property as keyof IProductParam][0]);
        } else {
          formData.append(property, data[property as keyof IProductParam]);
        }
      }
      if (data.id) {
        formData.append("_method", "PUT");
        return updateProduct(formData);
      } else {
        return storeProduct(formData);
      }
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setFormError({});
        refetch();
        reset();
        navigate("/admin/product");
      },
      onError: (err: AxiosError) => {
        const errors = err.response?.data as ILaravelApiErrorReturn;
        setFormError(errors);
        toast("Failed login " + err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    }
  );
};

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
  const handleChange = (value: number) => {
    setCurrentPage(value);
  };

  const { register, handleSubmit, setValue, reset, control } =
    useForm<IProductParam>();
  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});
  const navigate = useNavigate();

  const { isLoading: isPosting, mutate: productPost } =
    useProductUpdateAndSubmit(reset, navigate, setFormError, refetch);
  const onSubmit: SubmitHandler<IProductParam> = (dataProductPost) => {
    productPost(dataProductPost);

    console.log(dataProductPost);
  };

  const onReset = () => {
    reset();
    setValue("id", "");
  };

  const handleEdit = (id: number) => {
    setValue("id", id.toString());
    const response = getDetailProduct(id.toString());
    response.then((response) => {
      setValue("location", response.data.location);
      setValue("name", response.data.name);
      setValue("price", response.data.price);
      setValue("description", response.data.description);
    });
    console.log(id);
  };

  return (
    <Admin>
      <InputForm
        formError={formError.errors}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        control={control}
        Controller={Controller}
        onReset={onReset}
      ></InputForm>
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
          handleEdit={handleEdit}
          subTitle="List Product"
          title="Tata Rias Product"
          handleChange={handleChange}
        ></TableCustom>
      </div>
    </Admin>
  );
};

export default Product;
