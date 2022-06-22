interface SelectionInterface {
  title: string;
}
const Selection = ({ title }: SelectionInterface) => {
  return (
    <div className="flex flex-col my-2">
      <label>{title}</label>

      <select name="location">
        <option value="banten">banten</option>
        <option value="jakarta">jakarta</option>
      </select>
    </div>
  );
};
const Location = () => {
  return (
    <div className="flex flex-col w-full p-2 border rounded-lg h-44">
      <Selection title="Provinsi"></Selection>
      <Selection title="Kota"></Selection>
    </div>
  );
};

export default Location;
