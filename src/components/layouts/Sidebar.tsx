import { useNavigate } from "react-router-dom";
import { IProfile, useStore } from "../../store/store";
import { Link } from "../Links";

function Menu({ label = "", href = "" }) {
  return (
    <Link href={href}>
      <div className="flex items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-400 rounded-md cursor-pointer hover:text-gray-300 hover:bg-gray-600">
        <div className="px-2">{label}</div>
      </div>
    </Link>
  );
}
interface ISidebar {
  listMenu: Array<{ label: string; src?: string }>;
}

export default function Sidebar({ listMenu }: ISidebar) {
  const setUserProfile = useStore((state) => state.setUserProfile);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("hai");
    setUserProfile({} as IProfile);
    navigate("/");
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-10 w-36 justify-items-center">
        <Link href="/">
          <span className="text-white">Yuksss Tata Rias ✨</span>
        </Link>
      </div>
      {listMenu.map((item: object, i: number) => (
        <div key={i}>{Menu(item)}</div>
      ))}
      <div>
        <div className="flex items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-400 rounded-md cursor-pointer hover:text-gray-300 hover:bg-gray-600">
          <div className="px-2" onClick={handleLogout}>
            LogOut
          </div>
        </div>
      </div>
    </div>
  );
}
