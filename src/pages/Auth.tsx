import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "../components/Links";
import { Header } from "../components/Navbar/Header";
import { useStore } from "../store/store";
import { ILoginParam, login, setAuthToken } from "../utils/authenticate";
import background from "../../assets/images/BackgroundVendor.jpg";

export interface ILaravelApiErrorReturn {
  message?: string;
  errors?: {
    email?: Array<string>;
    password?: Array<string>;
  };
}
const Auth = () => {
  const setUserPicture = useStore((state) => state.setPictureProfile);
  setUserPicture("");
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
    <div
      className="w-screen h-screen"
      style={{
        background: `url('${background}')`,
        backgroundBlendMode: "darken",
        backgroundSize: "contain",
      }}
    >
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-5/12 space-y-8 bg-white rounded shadow shadow-gray-500 p-9">
          <div>
            <div className="w-auto h-12 mx-auto text-4xl font-extrabold text-center ">
              Yuksss Tata Rias ✨
            </div>
            <h2 className="text-xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => onSubmit(event)}
            method="POST"
          >
            <input type="hidden" name="remember" value="true" />
            <div className="flex flex-col space-y-2 rounded-md shadow-sm">
              <div>
                <label className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md group hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-white group-hover:text-gray-200"
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
    </div>
  );
};

export default Auth;
