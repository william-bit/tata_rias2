import { AxiosError } from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, IRegisterParam } from "../../utils/authenticate";

export interface ILaravelApiErrorReturn {
  message?: string;
  errors?: {
    name?: Array<string>;
    email?: Array<string>;
    address?: Array<string>;
    password?: Array<string>;
    password_confirmation?: Array<string>;
  };
}

const VendorRegister = () => {
  const [form, setForm] = useState<IRegisterParam>({
    name: "",
    address: "",
    password_confirmation: "",
    password: "",
    email: "",
    type: 0,
  });
  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});

  const handleChange = (
    label: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [label]: e.target.value });
  };

  const navigate = useNavigate();

  const { isLoading: isPosting, mutate: registerPost } = useMutation(
    async () => {
      return register(form);
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        setFormError({});
        navigate("/admin");
        console.log(res.data);
      },
      onError: (err: AxiosError) => {
        const errors = err.response?.data as ILaravelApiErrorReturn;
        setFormError(errors);
        toast("Failed Register " + err.message, {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerPost();
  };
  return (
    <div
      className="flex flex-col min-h-screen bg-grey-lighter"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='%23bbb9be' fill-opacity='0.58'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={(event) => onSubmit(event)}>
            <input
              type="text"
              className="block w-full p-3 border rounded border-grey-light"
              name="name"
              placeholder="Full Name"
              onChange={(event) => handleChange("name", event)}
            />
            {formError.errors?.name?.map((item: string, i: number) => (
              <div key={i} className="text-sm text-center text-red-600">
                {item}
              </div>
            ))}

            <input
              type="text"
              className="block w-full p-3 mt-4 border rounded border-grey-light"
              name="email"
              placeholder="Email"
              onChange={(event) => handleChange("email", event)}
            />
            {formError.errors?.email?.map((item: string, i: number) => (
              <div key={i} className="text-sm text-center text-red-600">
                {item}
              </div>
            ))}
            <input
              type="text"
              className="block w-full p-3 mt-4 border rounded border-grey-light"
              name="Address"
              placeholder="Address"
              onChange={(event) => handleChange("address", event)}
            />
            {formError.errors?.address?.map((item: string, i: number) => (
              <div key={i} className="text-sm text-center text-red-600">
                {item}
              </div>
            ))}

            <input
              type="password"
              className="block w-full p-3 mt-4 border rounded border-grey-light"
              name="password"
              placeholder="Password"
              onChange={(event) => handleChange("password", event)}
            />
            {formError.errors?.password?.map((item: string, i: number) => (
              <div key={i} className="text-sm text-center text-red-600">
                {item}
              </div>
            ))}
            <input
              type="password"
              className="block w-full p-3 mt-4 border rounded border-grey-light"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={(event) => handleChange("password_confirmation", event)}
            />

            <button
              type="submit"
              className="w-full py-3 my-1 mt-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Create Account
            </button>
            <div className="text-sm text-center text-red-600">
              {formError.message}
            </div>
          </form>

          <div className="mt-4 text-sm text-center text-grey-dark">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-6 text-grey-dark">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
