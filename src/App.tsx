import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Admin from "./pages/admin/Index";
import Product from "./pages/admin/Product";
import Vendor from "./pages/Vendor";
import { checkGetToken, checkToken } from "./utils/authenticate";
import { ToastContainer } from "react-toastify";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import { useStore } from "./store/store";
import axios from "axios";
import Report from "./pages/admin/Report";
import { Transaction } from "./pages/Transaction";
import { AdminProfile } from "./pages/admin/Profile";
import { NotFound } from "./pages/NotFound";
import { Invoice } from "./pages/invoice/Invoice";
import Register from "./pages/register/Register";
import { Index as SuperAdmin } from "./pages/superAdmin/Index";
import { SuperAdminProfile } from "./pages/superAdmin/Profile";
import { Report as SuperReport } from "./pages/superAdmin/Report";

function App() {
  checkGetToken();
  const setUserEmpty = useStore((state) => state.setUserProfile);
  const userProfile = useStore((state) => state.userProfile);
  if (
    Object.keys(userProfile).length !== 0 &&
    axios.defaults.headers.common["Authorization"]
  ) {
    checkToken(setUserEmpty);
  }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/requests" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/vendor/:searchHome" element={<Vendor />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        {userProfile.role == 1 ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/report" element={<Report />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </>
        ) : (
          <Route path="/admin/*" element={<NotFound />} />
        )}
        {userProfile.role == 2 ? (
          <>
            <Route path="/super-admin" element={<SuperAdmin />} />
            <Route path="/super-admin/report" element={<SuperReport />} />
            <Route path="/admin/profile" element={<SuperAdminProfile />} />
          </>
        ) : (
          <Route path="/super-admin/*" element={<NotFound />} />
        )}
      </Routes>
    </>
  );
}

export default App;
