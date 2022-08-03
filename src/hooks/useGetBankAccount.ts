import { getVendorBankAccount } from "../utils/data";
import { useQuery } from "react-query";

export function useGetBankAccount(id?: string | undefined) {
  return useQuery("bank-account", () => getVendorBankAccount(id));
}
