import { Link } from "../Links";

function Menu({ label = "", href = "" }) {
  return (
    <Link href={href}>
      <div className="flex items-center px-1 py-2 text-sm font-medium tracking-wide text-white rounded-md cursor-pointer hover:text-gray-300 hover:bg-purple-600">
        <div className="px-2">{label}</div>
      </div>
    </Link>
  );
}
interface ISidebar {
  listMenu: Array<{ label: string; src?: string }>;
}

export default function Sidebar({ listMenu }: ISidebar) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-10 justify-items-center">
        <span className="text-white">Skripsi Kost</span>
      </div>
      {listMenu.map((item: object, i: number) => (
        <div key={i}>{Menu(item)}</div>
      ))}
    </div>
  );
}
