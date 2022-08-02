import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FileUpload } from "../../components/custom/input/FileUpload";

export const ApprovalModalContent = ({
  onAction,
  register,
  formError,
  handleSubmit,
}: {
  onAction: (type: string) => void;
  handleSubmit: any;
  register: UseFormRegister<any>;
  formError?: {
    [error: string]: string[];
  };
}) => {
  return (
    <>
      <div className="mt-3">Are your sure ? </div>
      <form onSubmit={handleSubmit}>
        <FileUpload
          name="image"
          placeholder="upload"
          register={register}
          error={formError?.image}
        ></FileUpload>
        <div className="flex mt-10 space-x-5">
          <button
            type="submit"
            className="w-1/2 px-2 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-gray-700 text-md"
          >
            Yes
          </button>
          <button
            onClick={() => onAction("no")}
            className="w-1/2 px-2 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-gray-700 text-md"
          >
            No
          </button>
        </div>
      </form>
    </>
  );
};
