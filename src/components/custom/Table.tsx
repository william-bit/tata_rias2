import { AxiosResponse } from "axios";
import React from "react";

const TdCustom = ({
  type,
  value,
}: {
  type: string | undefined;
  value: any;
}) => {
  if (type == "image") {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10">
          <img className="w-full h-full rounded-full" src={value} alt="" />
        </div>
      </div>
    );
  }
  if (type == "status") {
    let color = "bg-green-200";
    let label = "Active";
    if (value == 0) {
      color = "bg-red-200";
      label = "Not Active";
    }
    return (
      <td className="px-5 py-5 text-sm bg-white border-gray-200">
        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
          <span
            aria-hidden
            className={`absolute inset-0 ${color} rounded-full opacity-50`}
          ></span>
          <span className="relative">{label}</span>
        </span>
      </td>
    );
  }
  return <p className="text-gray-900 whitespace-no-wrap">{value}</p>;
};
const TrCustom = ({
  row,
  config,
  isDelete,
  handleDelete,
}: {
  row: any;
  config: Array<{ title: string; key: string; type?: string }>;
  isDelete?: boolean;
  handleDelete?: (id: number) => void;
}) => {
  return (
    <tr key={row.id}>
      {config.map((valueConfig, indexConfig) => (
        <td
          key={indexConfig}
          className="px-5 py-5 text-sm bg-white border-b border-gray-200"
        >
          <TdCustom
            type={valueConfig.type}
            value={row[valueConfig.key]}
          ></TdCustom>
        </td>
      ))}
      {isDelete && handleDelete && (
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <svg
            onClick={() => handleDelete(row.id)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </td>
      )}
    </tr>
  );
};

const checkErrorRow = (error: Error | unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Unknown";
  }
};

interface ITableCustom {
  data: AxiosResponse<any, any> | undefined;
  title: string;
  subTitle: string;
  config: Array<{ title: string; key: string }>;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isDelete?: boolean;
  handleDelete?: (id: number) => void;
  error: Error | unknown;
  currentPage: number;
  handleChange: (value: number) => void;
}

export const TableCustom = (props: ITableCustom) => {
  console.log(props.data?.data.resource);
  return (
    <div className="w-full p-8 bg-white border-2 ">
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
      <div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {props.config.map((row, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                      {row.title}
                    </th>
                  ))}
                  {props.isDelete && props.handleDelete && (
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Delete
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {props.isLoading || props.isFetching ? (
                  <tr key={1}>
                    <td align="center" colSpan={6}>
                      Loading data
                    </td>
                  </tr>
                ) : null}
                {props.isError ? (
                  <tr key={1}>
                    <td align="center" colSpan={6}>
                      Error Failed fetch data
                      {checkErrorRow(props.error)}
                    </td>
                  </tr>
                ) : null}
                {!props.isLoading &&
                  !props.isFetching &&
                  !props.isError &&
                  !props.data?.data.resource.data && (
                    <tr key={1}>
                      <td align="center" colSpan={6}>
                        Data Empty
                      </td>
                    </tr>
                  )}
                {!props.isLoading &&
                !props.isFetching &&
                !props.isError &&
                props.data &&
                props.data.data.resource.data
                  ? props.data?.data.resource.data.map(
                      (row: any, index: number) => (
                        <TrCustom
                          row={row}
                          handleDelete={props.handleDelete}
                          isDelete={props.isDelete}
                          config={props.config}
                          key={index}
                        ></TrCustom>
                      )
                    )
                  : null}
              </tbody>
            </table>
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
          </div>
        </div>
      </div>
    </div>
  );
};
