import { Link } from "../Links";

export const Header = () => {
  return (
    <div className="flex justify-between px-8 py-4 text-white bg-black">
      <Link href="/">
        <div className="text-2xl font-extrabold cursor-pointer ">
          Skripsi Kost
        </div>
      </Link>
      <div className="flex items-center space-x-8 text-lg font-semibold">
        <div>Add New Room</div>
        <Link href="register">Register</Link>
        <Link href="auth">Sign In</Link>
      </div>
    </div>
  );
};
