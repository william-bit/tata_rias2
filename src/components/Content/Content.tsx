interface Card {
  title: string;
  description: string;
  detail: string;
}
const Card = ({ title, description, detail }: Card) => {
  return (
    <div className="flex w-5/12 p-2 mx-8 my-2 border-2 border-gray-300 rounded-md shrink-0 h-44">
      <div className="ml-3">
        <div>{title}</div>
        <div className="text-xs text-blue-500">{description}</div>
        <div className="text-xs">{detail}</div>
      </div>
    </div>
  );
};

export const Content = () => {
  return (
    <div className="flex flex-wrap justify-center w-screen p-3 mt-10">
      <Card
        title="Perkawinan"
        description="Paket kawin"
        detail="Paket yang di peruntukan"
      ></Card>
      <Card
        title="Ulang Tahun"
        description="Paket Ulang tahun"
        detail="Paket yang di peruntukan"
      ></Card>
      <Card
        title="Paket Reguler"
        description="Paket Reguler"
        detail="Paket yang di peruntukan"
      ></Card>
      <Card
        title="Paket premium full"
        description="Paket Premium"
        detail="Paket yang di peruntukan"
      ></Card>
    </div>
  );
};
