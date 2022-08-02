import { AxiosResponse } from "axios";
import React from "react";
import { Header } from "./Header";
import { Paging } from "./Paging";
import { TrCustom } from "./TrCustom";

const checkErrorRow = (error: Error | unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return "Unknown";
  }
};

export interface ITableCustom {
  data: AxiosResponse<any, any> | undefined;
  title: string;
  subTitle: string;
  config: Array<{ title: string; key: string }>;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isDelete?: boolean;
  handleDelete?: (id: number) => void;
  handleCustom?: (id: string, action: string) => void;
  error: Error | unknown;
  currentPage: number;
  handleChange: (value: number) => void;
  handleEdit?: (id: number) => void;
}

export const TableCustom = (props: ITableCustom) => {
  return (
    <div className="w-full p-8 bg-white border-2 ">
      <Header subTitle={props.subTitle} title={props.title}></Header>
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
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-center text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Deactivate
                    </th>
                  )}
                  {props.handleEdit && (
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Edit
                    </th>
                  )}
                  {props.handleCustom &&
                    props.data?.data?.table?.customAction && (
                      <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                        Custom Action
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
                  !props.data?.data?.resource?.data && (
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
                          setting={props.data?.data?.table?.rowSetting}
                          handleDelete={props.handleDelete}
                          handleEdit={props.handleEdit}
                          isDelete={props.isDelete}
                          config={props.config}
                          customAction={
                            props.handleCustom &&
                            props.data?.data?.table?.customAction
                          }
                          handleCustomAction={props.handleCustom}
                          key={index}
                        ></TrCustom>
                      )
                    )
                  : null}
              </tbody>
            </table>
            <Paging {...props}></Paging>
          </div>
        </div>
      </div>
    </div>
  );
};
