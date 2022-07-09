import { useStore } from "../../store/store";
import { Link } from "../Links";

export const Header = () => {
  const userProfile = useStore((state) => state.userProfile);
  return (
    <div className="sticky top-0 flex justify-between w-full px-8 py-4 text-black bg-white border">
      <Link href="/">
        <div className="text-2xl font-extrabold cursor-pointer">
          Yuksss Tata Rias ✨
        </div>
      </Link>
      <div className="flex items-center space-x-8 text-lg font-semibold">
        <Link href="/">
          <div className="cursor-pointer">Home</div>
        </Link>
        {userProfile.role === 0 && (
          <>
            <Link href="/vendor">
              <div className="cursor-pointer">Vendor</div>
            </Link>
            <Link href="/profile">
              <div>{userProfile.name}</div>
            </Link>
          </>
        )}
        {userProfile.role === 1 && (
          <>
            <Link href="/admin">
              <div className="cursor-pointer">Vendor panel</div>
            </Link>
          </>
        )}
        {!userProfile.name && (
          <Link href="/auth">
            <div className="px-4 py-1 text-sm text-white bg-green-500 rounded-md cursor-pointer hover:bg-green-400">
              Sign In
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
