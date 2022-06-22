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
  return <div className="ml-3 font-bold">{label}</div>;
}
