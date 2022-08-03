import { ToastContainer, toast } from "react-toastify";
import Sidebar from "../../components/layouts/Sidebar";
import Header from "../../components/layouts/Header";
import { useStore } from "../../store/store";
import { listMenu } from "../../utils/admin";
import { useNavigate } from "react-router-dom";
import { usePictureProfile } from "../../hooks/usePictureProfile";
interface IAdmin {
  children: JSX.Element | JSX.Element[];
}
const Admin = (props: IAdmin) => {
  const loginToast = useStore((state) => state.loginToast);
  const toggleLoginToast = useStore((state) => state.toggleLoginToast);
  if (loginToast) {
    toast("Success login!!!");
    toggleLoginToast();
  }
  usePictureProfile();
  return (
    <>
      <ToastContainer />
      <div className="flex flex-row h-screen">
        <div className="bg-gray-700 w-50">
          <Sidebar listMenu={listMenu}></Sidebar>
        </div>
        <div className="flex flex-col w-full h-screen overflow-hidden">
          <div className="flex items-center flex-none h-14">
            <Header listMenu={listMenu}></Header>
          </div>
          <div className="flex flex-initial overflow-hidden">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
