import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getListShop } from "../../utils/data";
import { Search } from "../custom/Search";
import CheckInView from "./CheckInView";
import ListView from "./ListView";
import Location from "./Location";
import Sort from "./Sort";

const List = () => {
  let { searchHome } = useParams();
  console.log(searchHome);
  const [search, setSearch] = useState(searchHome ? searchHome : "");

  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    ["home", search],
    () => getListShop(search)
  );
  const searchHandle = (value: string) => {
    setSearch(value);
  };
  console.log(data);
  return (
    <div className="px-10 mt-4">
      <div className="font-bold">Searching Salon</div>
      <div className="flex justify-center mt-5">
        {/* <div className="w-3/12 pr-10">
          <Location></Location>
          <CheckInView></CheckInView>
        </div> */}
        <div className="flex w-7/12">
          <div className="flex flex-col w-full ml-10">
            <div className="flex justify-center">
              <div className="w-full px-2">
                <Search search={search} searchHandle={searchHandle}></Search>
              </div>
            </div>
            <div>
              <Sort></Sort>
              <ListView
                data={data}
                error={error}
                isLoading={isLoading}
                isError={isError}
                isFetching={isFetching}
              ></ListView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
