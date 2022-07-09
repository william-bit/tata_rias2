import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Card from "../components/custom/Card";
import { Link } from "../components/Links";
import { Header } from "../components/Navbar/Header";
import { getDetailProduct, getListShop } from "../utils/data";
import { formatNumber } from "../utils/helper";

const Detail = () => {
  const { id } = useParams();
  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    "detailProduct",
    () => getDetailProduct(id),
    { keepPreviousData: true, enabled: true }
  );

  const { data: dataProduct } = useQuery(["product"], () => getListShop(""));

  return (
    <div className="h-screen">
      <Header></Header>
      <div className="flex flex-col w-full h-full px-10 mt-4">
        <div className="font-bold">Product Detail</div>
        <div className="flex justify-center py-8 h-1/2">
          <div className="w-4/12 h-full border">
            <img src={data?.data.photo} alt="image" className="w-full h-full" />
          </div>
          <div className="w-2/12 h-full px-3 py-5 border">
            <div className="text-xl bold">{data?.data.name}</div>
            <div>
              Rp.{data?.data.price ? formatNumber(data?.data.price) : 0}
            </div>
            <div>{data?.data.location}</div>
            <Link
              href={`/checkout/${id}`}
              className="flex items-center justify-center px-2 py-1 mt-10 mb-4 text-sm text-white bg-black border border-gray-700 cursor-pointer whitespace-nowrap hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
            >
              Make Appointment
            </Link>
          </div>
        </div>
        <div className="font-bold">Recommendation</div>
        <div className="grid w-full grid-cols-4 gap-4 justify-items-center">
          {dataProduct?.data.map((row: any, index: number) => (
            <Card
              id={row.id}
              src={row.photo}
              title={row.name}
              price={row.price}
              description={row.location}
              detail={row.description}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
