import { Link } from "../Links";

export const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between w-full px-8 py-4 text-black bg-white border">
      <Link href="/">
        <div className="text-2xl font-extrabold cursor-pointer">Tata Rias</div>
      </Link>
      <div className="flex items-center space-x-8 text-lg font-semibold">
        <Link href="/">
          <div className="cursor-pointer">Home</div>
        </Link>
        <Link href="/vendor">
          <div className="cursor-pointer">Vendor</div>
        </Link>
        <div>Profile</div>
        <Link href="/register">
          <div className="flex items-center space-x-8 text-lg font-semibold cursor-pointer">
            Register
          </div>
        </Link>
        <Link href="/auth">
          <div className="px-4 py-1 text-sm text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-400">
            Sign In
          </div>
        </Link>
      </div>
    </div>
  );
};
