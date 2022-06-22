import { Content } from "../components/Content/Content";
import { Navbar } from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Navbar></Navbar>
      <Content></Content>
    </div>
  );
};

export default Home;
