interface IListMenu {
  label: string;
  href?: string;
}
export const listMenu: Array<IListMenu> = [
  { label: "Product", href: "/admin/product" },
  { label: "Incoming Order", href: "/admin/report" },
];

export const listMenuSuperAdmin: Array<IListMenu> = [
  { label: "Dashboard", href: "/super-admin" },
  { label: "Report Profit", href: "/super-admin/report" },
];
