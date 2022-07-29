import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/custom/ModalProfile";
import { useStore } from "../store/store";
import { storeProfilePic } from "../utils/postData";

export const ProfileCard = () => {
  const userProfile = useStore((state) => state.userProfile);
  const userJoin = new Date(userProfile.join);
  const setProfilePicture = useStore((state) => state.setPictureProfile);
  interface IProfilePic {
    image: string;
  }
  const { register, handleSubmit, reset } = useForm<IProfilePic>();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  interface ILaravelApiErrorReturn {
    image?: string[];
  }
  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});
  const navigate = useNavigate();
  const { isLoading: isPosting, mutate: picturePost } = useMutation(
    (data: IProfilePic) => {
      const formData = new FormData();
      for (const property in data) {
        if (property == "image") {
          formData.append("image", data[property as keyof IProfilePic][0]);
        } else {
          formData.append(property, data[property as keyof IProfilePic]);
        }
      }
      return storeProfilePic(formData);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setFormError({});
        reset();
        setProfilePicture(res.data?.photo);
        console.log("testReset");
        toast("Success Post Picture", {
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
        const errors = err.response?.data as ILaravelApiErrorReturn;
        setFormError(errors);
        toast("Failed Picture Post " + err.message, {
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

  const onSubmit: SubmitHandler<IProfilePic> = (data) => {
    picturePost(data);

    console.log(data);
  };

  const userPicture = useStore((state) => state.pictureProfile);
  console.log(userProfile);
  return (
    <div className="p-3 bg-white border-t-4 border-blue-400 w-72">
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
      ></Modal>
      <div className="overflow-hidden image">
        <div
          className="flex items-center justify-center mx-auto border-2 rounded-full cursor-pointer w-28 h-28"
          onClick={openModal}
        >
          {userPicture ? (
            <img className="rounded-full w-28 h-28" src={userPicture}></img>
          ) : (
            <div className="pb-3 text-6xl font-bold">
              {userProfile.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <h1 className="my-1 text-xl font-bold leading-8 text-gray-900">
        {userProfile.name}
      </h1>
      <h3 className="leading-6 text-gray-600 font-lg text-semibold">
        Status as
        {userProfile.role == 0 ? <span>Customer</span> : <span>Vendor</span>}
      </h3>
      <p className="text-sm leading-6 text-gray-500 hover:text-gray-600"></p>
      <ul className="px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow">
        <li className="flex items-center py-3">
          <span>Status</span>
          <span className="ml-auto">
            <span className="px-2 py-1 text-sm text-white bg-green-500 rounded">
              Active
            </span>
          </span>
        </li>
        <li className="flex items-center py-3">
          <span>Login since</span>
          <span className="ml-auto">
            {userJoin.toLocaleDateString("us-EN", {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </span>
        </li>
      </ul>
    </div>
  );
};
