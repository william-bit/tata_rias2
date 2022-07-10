import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Register from "./pages/register/Index";
import Admin from "./pages/admin/Index";
import Product from "./pages/admin/Product";
import Vendor from "./pages/Vendor";
import { checkGetToken, checkToken } from "./utils/authenticate";
import { ToastContainer } from "react-toastify";
import Customer from "./pages/register/Customer";
import VendorRegister from "./pages/register/Vendor";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import { useStore } from "./store/store";
import axios from "axios";
import Report from "./pages/admin/Report";
import { Transaction } from "./pages/Transaction";
import { AdminProfile } from "./pages/admin/Profile";
import Index from "./pages/admin/Index";
import { NotFound } from "./pages/NotFound";

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
        <Route path="/register" element={<Register />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route path="/register/customer" element={<Customer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        {userProfile.role == 1 ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/report" element={<Report />} />
            <Route path="/admin/product" element={<Product />} />
          </>
        ) : (
          <Route path="/admin/*" element={<NotFound />} />
        )}
      </Routes>
    </>
  );
}

export default App;
