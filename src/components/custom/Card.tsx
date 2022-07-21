import { ShoppingCartIcon } from "@heroicons/react/outline";
import { ReactNode } from "react";
import { useStore } from "../../store/store";
import { formatNumber } from "../../utils/helper";
import { Link } from "../Links";

interface ICard {
  title: string;
  description: string;
  detail: string;
  src: string;
  price: string;
  id: number;
}
const Guard = ({ children, id }: { children: ReactNode; id: number }) => {
  const userProfile = useStore((state) => state.userProfile);
  return !userProfile.name ? (
    <>
      <Link
        href="/auth"
        className="flex items-center justify-center w-10 h-10 p-2 mt-1 mb-4 text-white bg-black border border-gray-700 hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
      >
        {children}
      </Link>
    </>
  ) : (
    <Link
      href={`/detail/${id}`}
      className="flex items-center justify-center w-10 h-10 p-2 mt-1 mb-4 text-white bg-black border border-gray-700 hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
    >
      {children}
    </Link>
  );
};
const Card = ({ id, title, description, detail, src, price }: ICard) => {
  return (
    <div className="relative flex flex-row-reverse w-full p-2 my-2 overflow-hidden bg-white border-2 border-gray-300 rounded-md h-36 clip shrink-0">
      <img
        src={src}
        alt="Picture of the author"
        className="w-1/2 rounded-md h-2/3"
      />
      <div className="w-full mx-3 text-left">
        <div>{title}</div>
        <div className="text-xs text-blue-500">{description}</div>
        <div className="text-xs text-justify">{detail}</div>
        <div className="text-xs text-justify">
          Rp.{formatNumber(parseInt(price))}
        </div>
      </div>
      <div className="absolute flex items-end justify-end w-full h-full">
        <Guard id={id}>
          <ShoppingCartIcon className="h-5" />
        </Guard>
      </div>
    </div>
  );
};

export default Card;
