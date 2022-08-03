import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useStore } from "../store/store";
import { getUserPicture } from "../utils/data";

export function usePictureProfile() {
  const userPicture = useStore((state) => state.pictureProfile);
  const setUserPicture = useStore((state) => state.setPictureProfile);
  const data = useQuery("userPicture", getUserPicture);
  useEffect(() => {
    if (userPicture !== data.data?.data) {
      setUserPicture(data.data?.data);
    }
  }, []);
  return userPicture;
}
