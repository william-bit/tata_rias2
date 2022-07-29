import React from "react";
import { ProfileForm } from "../components/custom/ProfileForm";
import SidebarProfile from "../components/layouts/SidebarProfile";
import { Header } from "../components/Navbar/Header";
import { ProfileCard } from "./ProfileCard";

let listMenu = [
  { label: "Personal Info", href: "/profile" },
  { label: "History Transaction", href: "/transaction" },
];

export const Profile = () => {
  return (
    <div>
      <Header></Header>
      <div className="flex">
        <SidebarProfile listMenu={listMenu}></SidebarProfile>
        <div className="flex mx-auto">
          <div className="mr-3 ">
            <ProfileCard></ProfileCard>
          </div>
          <ProfileForm></ProfileForm>
        </div>
      </div>
    </div>
  );
};
