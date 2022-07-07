import axios from "axios";
import { Url } from "./constanst";

export interface IProductParam {
  name: string;
  price: string;
  image: string;
  description: string;
  location: string;
}
export const storeProduct = (formData: FormData) => {
  return axios.post(Url.storeProduct, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface ICheckoutParam {
  product: string;
  appointment: string;
  image: string;
}

export const storeCheckout = (formData: FormData) => {
  return axios.post(Url.storeCheckout, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
