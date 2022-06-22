const Selection = () => {
  return (
    <div className="flex flex-col my-2">
      <select name="sorting">
        <option value="price">Price</option>
        <option value="ranting">Ranting</option>
        <option value="view">View</option>
      </select>
    </div>
  );
};

const Sort = () => {
  return (
    <div className="flex items-center mt-2 font-bold">
      <div>Sort by :</div>
      <Selection></Selection>
    </div>
  );
};

export default Sort;
