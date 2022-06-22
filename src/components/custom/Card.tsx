interface Card {
  title: string;
  description: string;
  detail: string;
}
const Card = ({ title, description, detail }: Card) => {
  return (
    <div className="flex flex-row-reverse w-full p-2 my-2 border-2 border-gray-300 rounded-md shrink-0 h-44">
      <img
        src={
          "https://static.photocdn.pt/images/articles/2019/02/20/How_to_Photograph_Bedrooms-1.jpg"
        }
        alt="Picture of the author"
        width="350px"
        height="300px"
      />
      <div className="mx-3 text-left">
        <div>{title}</div>
        <div className="text-xs text-blue-500">{description}</div>
        <div className="text-xs text-justify">{detail}</div>
      </div>
    </div>
  );
};

export default Card;
