import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IProfileParam, storeProfile } from "../utils/postData";

export function usePostUpdateProfile(
  onHandleSuccess: (res: AxiosResponse) => void,
  onHandleError: (err: AxiosError) => void
) {
  const { isLoading, mutate } = useMutation(
    (data: IProfileParam) => {
      const formData = new FormData();
      formData.append("fullname", data.fullName);
      if (data.account) {
        formData.append("account", data.account);
      }
      return storeProfile(formData);
    },
    {
      onSuccess: (res: AxiosResponse) => {
        onHandleSuccess(res);
      },
      onError: (err: AxiosError) => {
        onHandleError(err);
      },
    }
  );
  return { isLoading, mutate };
}
