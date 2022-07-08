import { Link } from "../../components/Links";

interface ICard {
  title: string;
  link: string;
}
const Card = ({ title, link }: ICard) => {
  return (
    <Link
      className="flex flex-col items-center justify-center w-5/12 text-4xl font-semibold border rounded-lg cursor-pointer hover:bg-gray-100"
      href={link}
    >
      <div className="mt-2">{title}</div>
    </Link>
  );
};
const Index = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='88' height='24' viewBox='0 0 88 24'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='autumn' fill='%23bbb9be' fill-opacity='0.58'%3E%3Cpath d='M10 0l30 15 2 1V2.18A10 10 0 0 0 41.76 0H39.7a8 8 0 0 1 .3 2.18v10.58L14.47 0H10zm31.76 24a10 10 0 0 0-5.29-6.76L4 1 2 0v13.82a10 10 0 0 0 5.53 8.94L10 24h4.47l-6.05-3.02A8 8 0 0 1 4 13.82V3.24l31.58 15.78A8 8 0 0 1 39.7 24h2.06zM78 24l2.47-1.24A10 10 0 0 0 86 13.82V0l-2 1-32.47 16.24A10 10 0 0 0 46.24 24h2.06a8 8 0 0 1 4.12-4.98L84 3.24v10.58a8 8 0 0 1-4.42 7.16L73.53 24H78zm0-24L48 15l-2 1V2.18A10 10 0 0 1 46.24 0h2.06a8 8 0 0 0-.3 2.18v10.58L73.53 0H78z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="w-1/2 p-10 space-y-8 bg-white ">
        <div>
          <div className="w-auto h-12 mx-auto text-5xl font-extrabold text-center ">
            Register As
          </div>
        </div>
        <div className="flex justify-center space-x-10 h-52">
          <Card title="Tata Rias" link="/register/vendor"></Card>
          <Card title="Customer" link="/register/customer"></Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
