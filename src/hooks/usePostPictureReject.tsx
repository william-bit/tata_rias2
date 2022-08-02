import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { rejectPhoto } from "../utils/postData";

export function usePostPictureReject(
  onHandleSuccess: (res: AxiosResponse) => void,
  onHandleError: (err: AxiosError) => void
) {
  const { isLoading, mutate } = useMutation(
    (data: { image: string; id: string }) => {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("id", data.id);
      return rejectPhoto(formData);
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
