interface IListMenu {
  label: string;
  href?: string;
}
export const listMenu: Array<IListMenu> = [
  { label: "Product", href: "/admin/product" },
  { label: "Incoming Order", href: "/admin/report" },
];
