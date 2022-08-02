import axios from "axios";
import { Url } from "./constanst";

export interface IProductParam {
  id: string;
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

export const updateProduct = (formData: FormData) => {
  return axios.post(Url.storeProduct + "/" + formData.get("id"), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface IProfilePicParam {
  name: string;
  price: string;
  image: string;
  description: string;
  location: string;
}
export const storeProfilePic = (formData: FormData) => {
  return axios.post(Url.storeProfilePic, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export interface ICheckoutParam {
  total: string;
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

export interface IRequestParam {
  name: string;
  price: string;
  description: string;
  image: string;
}

export const storeRequest = (formData: FormData, id: string | undefined) => {
  return axios.post(Url.storeRequest + `/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const storeApprovalRequest = (
  type: string | undefined,
  id: string | undefined
) => {
  return axios.post(
    Url.approvalRequest + `/${id}`,
    { type },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const storeApprovalOrder = (
  type: string | undefined,
  id: string | undefined
) => {
  return axios.post(
    Url.approvalOrder + `/${id}`,
    { type },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export interface IProfileParam {
  fullName: string;
}
export const storeProfile = (formData: FormData) => {
  return axios.post(Url.profile, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const rejectPhoto = (formData: FormData) => {
  return axios.post(Url.reject, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
