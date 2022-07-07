import { IProfile, useStore } from "./../store/store";
import axios from "axios";
import { Url } from "./constanst";

export const setAuthToken = (token: string) => {
  window.localStorage.setItem("Authorization", `Bearer ${token}`);
  axios.defaults.headers.common["Authorization"] = window.localStorage.getItem(
    "Authorization"
  ) as string;
};
export const checkGetToken = () => {
  console.log("check user");
  return new Promise(async (resolve) => {
    if (!axios.defaults.headers.common["Authorization"]) {
      if (window.localStorage.getItem("Authorization")) {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] =
          window.localStorage.getItem("Authorization") as string;
        resolve(true);
      } else {
        resolve(true);
      }
    } else {
      resolve(true);
    }
  });
};

let checkUser: number;
export const checkToken = (setUserEmpty: (profile: IProfile) => void) => {
  clearInterval(checkUser);
  checkUser = setInterval(function () {
    axios.get(Url.user).catch(() => {
      clearInterval(checkUser);
      setUserEmpty({} as IProfile);
    });
  }, 5 * 1000);
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
