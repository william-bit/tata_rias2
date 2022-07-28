import axios from "axios";
import { Url } from "./constanst";

interface IFilter {
  city?: number;
  province?: number;
  rentDate?: {
    from: string;
    until: string;
  };
  ranting?: number;
  price?: {
    from: number;
    until: number;
  };
}
let filter: IFilter = {};
export const setFilterProduct = (filterParam: IFilter) => {
  filter = filterParam;
};

export const getDetailProduct = (id: string | undefined) => {
  return axios.get(Url.detailProduct + "/" + id);
};

export const getListShop = (search: string | undefined) => {
  return axios.get(Url.home + "?search=" + search);
};

export const getDetailTransaction = (id: string | undefined) => {
  return axios.get(Url.invoice + "/" + id);
};

export const getListTransaction = (currentPage: number) => {
  return axios.get(Url.transaction + "?page=" + currentPage); // credentials didn't match
};
export const getListTransactionVendor = (currentPage: number) => {
  return axios.get(Url.transactionVendor + "?page=" + currentPage); // credentials didn't match
};

export const getListProduct = (currentPage: number) => {
  return axios.get(Url.listProduct + "?page=" + currentPage); // credentials didn't match
};
export const getUserPicture = () => {
  return axios.get(Url.picture); // credentials didn't match
};
