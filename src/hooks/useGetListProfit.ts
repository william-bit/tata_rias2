import { getProfitPerMonth } from "./../utils/data";
import { useQuery } from "react-query";

export function useGetListProfit() {
  const data = useQuery("profit", getProfitPerMonth);
  return data;
}
