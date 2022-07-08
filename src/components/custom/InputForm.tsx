import { AxiosError, AxiosResponse } from "axios";
import { Path, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IProductParam, storeProduct } from "../../utils/postData";

interface IInput {
  label?: string;
  placeholder: string;
  name: Path<IProductParam>;
  type?: string;
  register: UseFormRegister<IProductParam>;
}

const FileUpload = ({ label, placeholder, name, register }: IInput) => {
  let [fileData, setFile] = useState({} as File);
  return (
    <>
      <div className="mb-2">
        <div className="rounded-lg shadow-xl bg-gray-50">
          <div className="p-4">
            <label className="inline-block mb-2 text-gray-500">
              Upload Image(jpg,png,svg,jpeg)
            </label>
            <div className="relative flex items-center justify-center w-full">
              {fileData && fileData.name && (
                <img
                  src={URL.createObjectURL(fileData)}
                  className="absolute h-full mx-auto rounded-lg "
                  style={{
                    height: "100px",
                  }}
                ></img>
              )}
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    {fileData && fileData.name
                      ? fileData.name
                      : "Select a photo"}
                  </p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  required
                  {...register(name)}
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TextInput = ({ label, placeholder, name, register, type }: IInput) => {
  return (
    <>
      {label ? (
        <label className="block mb-2 text-lg font-medium text-gray-900">
          {label}
        </label>
      ) : null}
      <input
        type={type}
        id={label}
        className="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        {...register(name)}
      />
    </>
  );
};
const InputForm = ({
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
}) => {
  interface ILaravelApiErrorReturn {
    message?: string;
    errors?: {
      name: Array<string>;
      price: Array<string>;
      description: Array<string>;
    };
  }

  const { register, handleSubmit, reset } = useForm<IProductParam>();

  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});

  const navigate = useNavigate();
  const { isLoading: isPosting, mutate: productPost } = useMutation(
    (data: IProductParam) => {
      const formData = new FormData();
      for (const property in data) {
        if (property == "image") {
          formData.append("image", data[property as keyof IProductParam][0]);
        } else {
          formData.append(property, data[property as keyof IProductParam]);
        }
      }
      return storeProduct(formData);
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
  const onSubmit: SubmitHandler<IProductParam> = (data) => {
    productPost(data);

    console.log(data);
  };

  return (
    <div className="border-2 shadow-md ">
      <div className="w-full py-2 text-2xl font-bold text-center text-black">
        Add New Product
      </div>
      <div className="w-full ">
        <form className="px-5 py-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Tata Rias add product"
            name="name"
            type="text"
            placeholder="Product Name"
            register={register}
          ></TextInput>
          <TextInput
            name="price"
            placeholder="Price"
            type="number"
            register={register}
          ></TextInput>
          <TextInput
            name="location"
            placeholder="location"
            register={register}
          ></TextInput>
          <TextInput
            name="description"
            placeholder="Description"
            register={register}
          ></TextInput>
          <FileUpload
            name="image"
            placeholder="upload"
            register={register}
          ></FileUpload>
          <button className="w-full px-4 py-2 text-2xl font-bold text-white bg-black rounded-full">
            Add New Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
