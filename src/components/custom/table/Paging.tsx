import React from "react";
import { ITableCustom } from "./Table";

export const Paging = (props: ITableCustom) => {
  return (
    <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between ">
      <span className="text-xs text-gray-900 xs:text-sm">
        Showing 1 to 1 of{" "}
        {!props.isLoading && !props.isError && props.data != undefined
          ? props.data.data.total
          : 0}{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        {props.currentPage == 1 ? (
          <button className="px-4 py-2 mx-1 text-sm font-semibold transition duration-150 bg-gray-400 rounded-l text-indigo-50 hover:bg-gray-500">
            Prev
          </button>
        ) : (
          <button
            onClick={() => props.handleChange(props.currentPage - 1)}
            className="px-4 py-2 mx-1 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-l text-indigo-50 hover:bg-indigo-500"
          >
            Prev
          </button>
        )}
        {props.data != undefined &&
        props.currentPage < props.data?.data.resource.last_page ? (
          <button
            onClick={() => props.handleChange(props.currentPage + 1)}
            className="px-4 py-2 mx-1 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-r text-indigo-50 hover:bg-indigo-500"
          >
            Next
          </button>
        ) : (
          <button className="px-4 py-2 mx-1 text-sm font-semibold transition duration-150 bg-gray-400 rounded-r text-indigo-50 hover:bg-gray-500">
            Next
          </button>
        )}
      </div>
    </div>
  );
};
