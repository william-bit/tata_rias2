import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { deleteProduct } from "../utils/postData";

export function usePostDeleteProduct(
  onHandleSuccess: (res: AxiosResponse) => void,
  onHandleError: (err: AxiosError) => void
) {
  const { isLoading, mutate } = useMutation(
    (data: { id: string }) => {
      return deleteProduct(data.id);
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
