import { Path, UseFormRegister } from "react-hook-form";
import { TextInput } from "./TextInput";
import { FileUpload } from "./FileUpload";
import { InputNumber } from "./InputNumber";

export interface IInput {
  label?: string;
  disabled?: boolean;
  placeholder: string;
  name: Path<any>;
  type?: string;
  error?: string[];
  register: UseFormRegister<any>;
}

const InputForm = ({
  control,
  register,
  onReset,
  handleSubmit,
  formError,
}: {
  control: any;
  register: UseFormRegister<any>;
  formError?: {
    [error: string]: string[];
  };
  handleSubmit: any;
  onReset: () => void;
}) => {
  return (
    <div className="border-2 shadow-md ">
      <div className="w-full py-2 text-2xl font-bold text-center text-black">
        Add / Edit New Product
      </div>
      <div className="w-full ">
        <form className="px-5 py-3" onSubmit={handleSubmit}>
          <TextInput
            label="Tata Rias add /edit product"
            name="id"
            type="text"
            disabled={true}
            error={formError?.id}
            placeholder="Id Product (auto generate)"
            register={register}
          ></TextInput>
          <TextInput
            name="name"
            type="text"
            placeholder="Product Name"
            error={formError?.name}
            register={register}
          ></TextInput>
          <InputNumber
            name="price"
            placeholder="Price"
            error={formError?.price}
            control={control}
            prefix="Rp."
            suffix=",00"
          ></InputNumber>
          <TextInput
            name="location"
            placeholder="location"
            error={formError?.location}
            register={register}
          ></TextInput>
          <TextInput
            name="description"
            placeholder="Description"
            error={formError?.description}
            register={register}
          ></TextInput>
          <FileUpload
            name="image"
            placeholder="upload"
            register={register}
            error={formError?.image}
          ></FileUpload>
          <div className="flex space-x-1">
            <button className="w-1/2 px-2 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-700 text-md">
              Submit
            </button>
            <button
              type="button"
              onClick={onReset}
              className="w-1/2 px-2 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-700 text-md"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
