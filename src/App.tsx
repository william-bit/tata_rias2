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
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route path="/register/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
