import { AxiosError } from "axios";
import React, { useState } from "react";
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/Navbar/Header";
import { getDetailProduct } from "../utils/data";
import { formatNumber } from "../utils/helper";
import { ICheckoutParam, storeCheckout } from "../utils/postData";

const FileUpload = ({ register }: { register: UseFormRegisterReturn }) => {
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
                  {...register}
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

export const Selection = () => {
  return (
    <div className="flex justify-center w-24 ml-3 h-7">
      <select
        className="block w-full px-3 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
      >
        <option value="1" className="text-xs">
          Day
        </option>
      </select>
    </div>
  );
};

export const Checkout = () => {
  let { productId } = useParams();
  let navigate = useNavigate();
  let [destination, setDestination] = useState(0);

  let [day, setDuration] = useState(1);

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    "detailProduct",
    () => getDetailProduct(productId),
    { keepPreviousData: true, enabled: true }
  );
  const handleDayPricing = (value: number) => {
    if (value > 0) {
      setDuration(value);
    }
  };

  const { isLoading: isPosting, mutate: checkoutPost } = useMutation(
    (postData: ICheckoutParam) => {
      const formData = new FormData();
      formData.append("id", data?.data.id);
      formData.append("total", "1");
      formData.append("destination", destination.toString());
      for (const property in postData) {
        if (property == "image") {
          formData.append(
            "image",
            postData[property as keyof ICheckoutParam][0]
          );
        } else {
          formData.append(property, postData[property as keyof ICheckoutParam]);
        }
      }
      return storeCheckout(formData);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        navigate("/vendor");
        toast("Success Transaction ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      onError: (err: AxiosError) => {
        toast("Failed Transaction " + err.message, {
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

  const { register, handleSubmit, reset } = useForm<ICheckoutParam>();

  const onSubmit: SubmitHandler<ICheckoutParam> = (dataForm) => {
    checkoutPost(dataForm);

    console.log(dataForm);
  };

  console.log(data);
  return (
    <div>
      <Header></Header>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Checkout Page
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Payment Detail
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="justify-center w-full mx-auto"
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full">
                    <label className="block mb-3 text-sm font-semibold text-gray-500">
                      Payment Proof
                    </label>
                    <div className="mb-3">
                      Please transfer to BCA : 73123131
                    </div>
                    <div className="mb-3">
                      Please transfer to Mandari : 33123131
                    </div>
                    <FileUpload register={register("image")}></FileUpload>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label className="block mb-3 text-sm font-semibold text-gray-500">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows={4}
                    placeholder="Notes for delivery"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="pt-12 md:pt-0 2xl:ps-4">
              <h2 className="text-xl font-bold">Order</h2>
              <div className="mt-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-4">
                    <div>
                      <img
                        src={data?.data.photo}
                        alt="image"
                        className="w-60"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{data?.data.name}</h2>
                      <p className="text-sm">{data?.data.description}</p>
                      <span className="text-red-600">Price</span>
                      <div>
                        Rp.
                        {formatNumber(parseInt(data?.data.price))}
                      </div>
                      <div className="text-xs font-bold text-red-600">
                        Min 3 hour before appointment
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type={"datetime-local"}
                          min={
                            new Date().getFullYear() +
                            "-" +
                            (new Date().getMonth() + 1).toLocaleString(
                              "en-US",
                              { minimumIntegerDigits: 2, useGrouping: false }
                            ) +
                            "-" +
                            ("0" + new Date().getDate()).slice(-2) +
                            "T23:59:59"
                          }
                          className="border border-gray-500 rounded"
                          required
                          {...register("appointment")}
                        ></input>
                      </div>
                      <div className="flex items-center mt-2">
                        <select
                          onChange={(e) =>
                            setDestination(parseInt(e.target.value))
                          }
                          className="w-full border border-gray-500 rounded h-7"
                        >
                          <option value={0}>On Site</option>
                          <option value={1}>To Destination</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => navigate("/vendor")}
                        className="text-gray-500 focus:outline-none focus:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex p-4 mt-4">
                <h2 className="text-xl font-bold">ITEMS</h2>
              </div>
              <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                Total
                <span className="ml-2">
                  Rp.
                  {formatNumber(
                    day * data?.data.price + (destination ? 100000 : 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
