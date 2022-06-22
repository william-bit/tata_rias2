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
export const getListProduct = (search: string) => {
  return axios.post(Url.register + "/" + search, filter);
};

export const getDetailProduct = (id: number) => {
  return axios.post(Url.register + "/" + id);
};
