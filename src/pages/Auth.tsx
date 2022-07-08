import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "../components/Links";
import { useStore } from "../store/store";
import { ILoginParam, login, setAuthToken } from "../utils/authenticate";

export interface ILaravelApiErrorReturn {
  message?: string;
  errors?: {
    email?: Array<string>;
    password?: Array<string>;
  };
}
const Auth = () => {
  const [form, setForm] = useState<ILoginParam>({
    email: "",
    password: "",
  });
  const handleChange = (
    label: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [label]: e.target.value });
  };

  const [formError, setFormError] = useState<ILaravelApiErrorReturn>({});

  const setUserProfile = useStore((state) => state.setUserProfile);

  const navigate = useNavigate();
  const { isLoading: isPosting, mutate: loginPost } = useMutation(
    async () => {
      return login(form);
    },
    {
      onSuccess: (res: AxiosResponse) => {
        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        setUserProfile({
          email: res.data.content.user_email,
          name: res.data.content.user_name,
          role: res.data.content.role,
          join: new Date(res.data.content.user_join),
        });
        setAuthToken(res.data.content.access_token);
        setFormError({});
        if (res.data.content.role == 1) {
          navigate("/admin/product");
        } else {
          navigate("/");
        }
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginPost();
  };
  return (
    <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="w-auto h-12 mx-auto text-5xl font-extrabold text-center ">
            Yuksss Tata Rias
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(event) => onSubmit(event)}
          method="POST"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(event) => handleChange("email", event)}
              />
              {formError.errors?.email?.map((item: string, i: number) => (
                <div key={i} className="text-sm text-center text-red-600">
                  {item}
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(event) => handleChange("password", event)}
              />
              {formError.errors?.email?.map((item: string, i: number) => (
                <div key={i} className="text-sm text-center text-red-600">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
            <div className="mt-2 text-sm text-center">
              <span className="mr-2"> Don't have a account?</span>
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create new account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
