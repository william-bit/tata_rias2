import axios from "axios";
import { Url } from "./constanst";

const setToken = () => {
  return new Promise((resolve) => {
    axios.get(Url.token).then((response) => {
      window.localStorage.setItem(
        "Authorization",
        `Bearer ${response.data.content.access_token}`
      );
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("Authorization") as string;
      resolve(true);
    });
  });
};

export const checkGetToken = () => {
  return new Promise(async (resolve) => {
    if (!!axios.defaults.headers.common["Authorization"]) {
      if (window.localStorage.getItem("Authorization")) {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] =
          window.localStorage.getItem("Authorization") as string;
        resolve(true);
      } else {
        await setToken();
        resolve(true);
      }
    } else {
      resolve(true);
    }
  });
};

export interface IRegisterParam {
  name: string;
  email: string;
  address: string;
  password: string;
  password_confirmation: string;
  type?: number;
}

export const register = (param: IRegisterParam) => {
  console.log(param);
  return axios.post(Url.register, param);
};

export interface ILoginParam {
  email: string;
  password: string;
}
export const login = (param: ILoginParam) => {
  return axios.post(Url.login, param);
};
