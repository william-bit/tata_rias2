import List from "../components/List/List";
import { Header } from "../components/Navbar/Header";
import background from "../../assets/images/BackgroundVendor.jpeg";

const Vendor = () => {
  return (
    <div
      className="flex flex-col "
      style={{
        background: `url('${background}')`,
        backgroundColor: "rgba(255,255,255,0.9)",
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
      }}
    >
      <Header></Header>
      <List></List>
    </div>
  );
};

export default Vendor;
