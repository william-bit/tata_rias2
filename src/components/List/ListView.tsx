import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { useStore } from "../../store/store";
import Card from "../custom/Card";
import { Link } from "../Links";

interface IListView {
  data: AxiosResponse<any, any> | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | unknown;
}

const ListView = (props: IListView) => {
  return (
    <div className="grid grid-cols-2 gap-1 p-3 mt-1">
      {props.data?.data.map((row: any, index: number) => (
        <Card
          id={row.id}
          src={row.photo}
          title={row.name}
          price={row.price}
          description={row.location}
          detail={row.description}
        ></Card>
      ))}
    </div>
  );
};

export default ListView;
