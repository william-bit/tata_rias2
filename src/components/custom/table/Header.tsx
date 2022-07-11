import React from "react";

export const Header = (props: { title: string; subTitle: string }) => {
  return (
    <div className="flex items-center justify-between pb-6 ">
      <div>
        <h2 className="font-semibold text-gray-600">{props.title}</h2>
        <span className="text-xs">{props.subTitle}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center p-2 rounded-md bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="block ml-1 outline-none bg-gray-50 "
            type="text"
            name=""
            id=""
            placeholder="search..."
          />
        </div>
        <div className="ml-10 space-x-8 lg:ml-40"></div>
      </div>
    </div>
  );
};
