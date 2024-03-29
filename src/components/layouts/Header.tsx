import { useEffect } from "react";
import { usePictureProfile } from "../../hooks/usePictureProfile";
import { useStore } from "../../store/store";
import { Link } from "../Links";

interface ISidebar {
  listMenu: Array<{ label: string; src?: string }>;
}

export default function Header({ listMenu }: ISidebar) {
  let label = "Dashboard";
  if (location) {
    let current = location.pathname.split("/");
    for (const key in listMenu) {
      if ("src" in listMenu[key] && listMenu[key].src == current[2]) {
        label = listMenu[key].label;
      }
    }
  }
  const userProfile = useStore((state) => state.userProfile);
  const userPicture = useStore((state) => state.pictureProfile);
  return (
    <div className="flex items-center justify-between flex-1 ml-3 font-bold">
      {label}
      <Link href="/admin/profile">
        <div className="mx-5 overflow-hidden image">
          <div className="flex items-center justify-center w-10 h-10 mx-auto bg-white border-2 rounded-full">
            {userPicture ? (
              <img className="w-10 h-10 rounded-full" src={userPicture}></img>
            ) : (
              <div className="text-xl font-bold capitalize text-black-500">
                {userProfile.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
