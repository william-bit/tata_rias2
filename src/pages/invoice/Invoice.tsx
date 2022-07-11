import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetailTransaction } from "../../utils/data";
import { formatNumber } from "../../utils/helper";

export const Invoice = () => {
  const { id } = useParams();

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    ["trans", id],
    () => getDetailTransaction(id),
    { keepPreviousData: true }
  );
  console.log(data);
  const tax = (data?.data.order_detail[0].price * 11) / 100;
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="py-20 bg-black">
          <div className="max-w-5xl py-16 mx-auto bg-white">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div className="space-y-6 text-slate-700">
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                      Yuksss Tata Rias ✨
                    </p>
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Detail:
                        </p>
                        <p> Yuksss Tata Rias ✨</p>
                        <p>Fake Street 123</p>
                        <p>San Javier</p>
                        <p>CA 1234</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Billed To
                        </p>
                        <p>{data?.data.customer.user.name}</p>
                        <p>{data?.data.customer.Address}</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Number
                        </p>
                        <p>000000</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Date of Issue
                        </p>
                        <p>{data?.data.created_at}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                          >
                            Appointment
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td
                            colSpan={2}
                            className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0"
                          >
                            <div className="font-medium text-slate-700">
                              {data?.data.order_detail[0].name}
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {data?.data.order_detail[0].appointment}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            Rp.{formatNumber(data?.data.order_detail[0].price)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Subtotal
                          </th>
                          <th
                            scope="row"
                            className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                          >
                            Subtotal
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            Rp.{formatNumber(data?.data.order_detail[0].price)}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                          >
                            Tax
                          </th>
                          <th
                            scope="row"
                            className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                          >
                            Tax
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            Rp.{formatNumber(tax)}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            colSpan={3}
                            className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                          >
                            Total
                          </th>
                          <th
                            scope="row"
                            className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                          >
                            Total
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            Rp.
                            {formatNumber(
                              data?.data.order_detail[0].price + tax
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="mt-48 p-9">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700">
                      <p>Thanks you for transaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};
