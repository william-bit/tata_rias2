import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import Modal from "../../components/custom/Modal";
import { TableCustom } from "../../components/custom/table/Table";
import Admin from "../../components/layouts/Admin";
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
    { title: "Total", key: "price" },
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
    name: string;
  }
  interface ILaravelApiErrorReturn {
    message?: string;
    errors?: {
      [error: string]: string[];
    };
  }

  const { register, handleSubmit, reset } = useForm<IPic>();
  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});

  const handleApproval = (id: string, action: string) => {
    if (action == "3") {
      setModalState(true);
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
            formError={formError.errors}
            onAction={(action) => {
              console.log(action);
              if (action == "yes") {
                approvalPost.mutate({
                  type: modalData.action,
                  id: modalData.id,
                });
              }
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
