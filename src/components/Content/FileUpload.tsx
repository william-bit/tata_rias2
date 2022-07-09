import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface IInput {
  label?: string;
  placeholder: string;
  name: Path<any>;
  type?: string;
  register: UseFormRegister<any>;
}

export const FileUpload = ({ label, placeholder, name, register }: IInput) => {
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
