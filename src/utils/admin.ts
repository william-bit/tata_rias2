interface IListMenu {
  label: string;
  href?: string;
}
export const listMenu: Array<IListMenu> = [
  { label: "Product", href: "/admin/product" },
  { label: "Report", href: "/admin/report" },
];
