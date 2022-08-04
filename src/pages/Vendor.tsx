import background from "../../assets/images/BackgroundVendor.jpg";
import List from "../components/List/List";
import { Header } from "../components/Navbar/Header";

const Vendor = () => {
  return (
    <div
      className="flex flex-col "
      style={{
        background: `url('${background}')`,
        backgroundBlendMode: "darken",
        backgroundSize: "contain",
      }}
    >
      <Header></Header>
      <List></List>
    </div>
  );
};

export default Vendor;
