import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Register from "./pages/register/Index";
import Admin from "./pages/admin/Index";
import Product from "./pages/admin/Product";
import Vendor from "./pages/Vendor";
import { checkGetToken } from "./utils/authenticate";
import { ToastContainer } from "react-toastify";
import Customer from "./pages/register/Customer";
import VendorRegister from "./pages/register/Vendor";

function App() {
  checkGetToken();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route path="/register/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/product" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
