import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useGetBankAccount } from "../../hooks/useGetBankAccount";
import { usePostUpdateProfile } from "../../hooks/usePostUpdateProfile";
import { useStore } from "../../store/store";
import { IProfileParam } from "../../utils/postData";

export const ProfileForm = () => {
  const userProfile = useStore((state) => state.userProfile);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const { isLoading, mutate: postProfile } = usePostUpdateProfile(
    (res) => {
      setUserProfile({ ...userProfile, name: res.data?.name });
      toast("Success Change profile ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    (err) => {
      toast("Failed Change profile ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    }
  );

  const { setValue, register, handleSubmit, reset } = useForm<IProfileParam>();
  const dataAccount = useGetBankAccount();
  setValue("fullName", userProfile.name);
  setValue("account", dataAccount.data?.data);

  const onSubmit: SubmitHandler<IProfileParam> = (dataForm) => {
    postProfile(dataForm);

    console.log(dataForm);
  };
  return (
    <div className="flex-1 max-w-2xl mt-10">
      <div>Change profile</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 w-80">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            value={userProfile.email}
            onChange={() => {
              console.log("change");
            }}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Email address
          </label>
        </div>
        <div className="grid ">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              {...register("fullName")}
            />
            <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Full name
            </label>
          </div>
        </div>
        {userProfile.role == 1 && (
          <>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                {...register("account")}
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Bank Account
              </label>
            </div>
          </>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};
