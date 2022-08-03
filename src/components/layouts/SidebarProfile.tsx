import { useNavigate } from "react-router-dom";
import { IProfile, useStore } from "../../store/store";
import { Link } from "../Links";

function Menu({ label = "", href = "" }) {
  return (
    <Link href={href}>
      <div className="flex items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-800 rounded-md cursor-pointer hover:bg-gray-100">
        <div className="px-2">{label}</div>
      </div>
    </Link>
  );
}
interface ISidebar {
  listMenu: Array<{ label: string; href?: string }>;
}

export default function SidebarProfile({ listMenu }: ISidebar) {
  const setUserProfile = useStore((state) => state.setUserProfile);
  const navigate = useNavigate();
  const setUserPicture = useStore((state) => state.setPictureProfile);
  const handleLogout = () => {
    console.log("hai");
    setUserPicture("");
    setUserProfile({} as IProfile);
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-10 justify-items-center">
        <span className="text-white">Tata Rias</span>
      </div>
      {listMenu.map((item: object, i: number) => (
        <div key={i}>{Menu(item)}</div>
      ))}
      <div
        onClick={handleLogout}
        className="flex items-center px-1 py-2 text-sm font-medium tracking-wide text-gray-800 rounded-md cursor-pointer hover:bg-gray-100"
      >
        <div className="px-2">LogOut</div>
      </div>
    </div>
  );
}
