import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Modal from "../../components/custom/Modal";
import { TableCustom } from "../../components/custom/table/Table";
import Admin from "../../components/layouts/Admin";
import { usePostPictureReject } from "../../hooks/usePostPictureReject";
import { getListTransactionVendor } from "../../utils/data";
import { IProfilePicParam, storeApprovalOrder } from "../../utils/postData";
import { ApprovalModalContent } from "./ApprovalModalContent";
const Order = () => {
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
    { title: "Customer Phone", key: "phone_number" },
    { title: "Customer Address", key: "address" },
    { title: "Price", key: "price", type: "number" },
    { title: "Total", key: "total", type: "number" },
    { title: "Destination", key: "destination" },
    { title: "Unit", key: "unit" },
  ];
  console.log(data);
  const handleChange = (value: number) => {
    setCurrentPage(value);
  };

  const approvalPost = useMutation(
    (dataPost: { type: string; id: string }) => {
      return storeApprovalOrder(dataPost.type, dataPost.id);
    },
    {
      onSuccess: (res) => {
        refetch();
        toast("Success Submit ", {
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
        toast("Failed Submit " + err.message, {
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
  const [modalState, setModalState] = useState(false);
  const [modalData, setModalData] = useState({
    action: "",
    id: "",
  });

  interface IPic {
    image: string;
    id: string;
  }
  interface ILaravelApiErrorReturn {
    message?: string;
    errors?: {
      [error: string]: string[];
    };
  }

  const { register, handleSubmit, reset, setValue } = useForm<IPic>();
  register("id", { value: "" });
  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});

  const { mutate: postPicture } = usePostPictureReject(
    () => {
      setModalState(false);
      toast("Success Reject ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    () => {
      toast("Failed Reject ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  );

  const onSubmit: SubmitHandler<IPic> = (dataProductPost) => {
    postPicture(dataProductPost);
  };

  const handleApproval = (id: string, action: string) => {
    if (action == "3") {
      setModalState(true);
      setValue("id", id);
      setModalData({ id, action });
    } else {
      approvalPost.mutate({ type: action, id });
    }
  };

  return (
    <Admin>
      <Modal
        title="Approval reject"
        widthAndHeight={{
          width: "40%",
          height: "60%",
        }}
        content={
          <ApprovalModalContent
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            formError={formError.errors}
            onAction={(action) => {
              setModalState(false);
            }}
          />
        }
        closeModal={() => setModalState(false)}
        isOpen={modalState}
      />
      <div className="flex-initial w-full overflow-auto">
        <TableCustom
          data={data}
          config={config}
          currentPage={currentPage}
          error={error}
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          subTitle="List Order"
          title="Order"
          handleChange={handleChange}
          handleCustom={(id: string, action: string) =>
            handleApproval(id, action)
          }
        ></TableCustom>
      </div>
    </Admin>
  );
};

export default Order;
