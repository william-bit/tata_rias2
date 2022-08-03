import { useNavigate } from "react-router-dom";
import { IProfile, useStore } from "../../store/store";
import { Link } from "../Links";

function Menu({ label = "", href = "", color = "" }) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center px-1 py-2 text-sm font-medium tracking-wide text-white rounded-md cursor-pointer hover:text-gray-200 ${color}`}
      >
        <div className="px-2">{label}</div>
      </div>
    </Link>
  );
}
interface ISidebar {
  listMenu: Array<{ label: string; src?: string }>;
  color?:
    | "hover:bg-gray-600"
    | "hover:bg-blue-600"
    | "hover:bg-red-600"
    | "hover:bg-green:600";
}

export default function Sidebar({ listMenu, color }: ISidebar) {
  const setUserProfile = useStore((state) => state.setUserProfile);
  const userProfile = useStore((state) => state.userProfile);
  const navigate = useNavigate();
  const setUserPicture = useStore((state) => state.setPictureProfile);
  const handleLogout = () => {
    console.log("hai");
    setUserPicture("");
    setUserProfile({} as IProfile);
    navigate("/");
  };
  if (color == undefined) {
    color = "hover:bg-gray-600";
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center h-10 my-2 w-36 justify-items-center">
        <Link href="/">
          <div className="text-white">Yuksss Tata Rias ✨</div>
        </Link>
        <div className="text-white">Welcome {userProfile.name}</div>
      </div>
      {listMenu.map((item: object, i: number) => (
        <div key={i}>{Menu({ ...item, color })}</div>
      ))}
      <div>
        <div
          className={`flex items-center px-1 py-2 text-sm font-medium tracking-wide text-white rounded-md cursor-pointer hover:text-gray-200 ${color}`}
        >
          <div className="px-2" onClick={handleLogout}>
            LogOut
          </div>
        </div>
      </div>
    </div>
  );
}
