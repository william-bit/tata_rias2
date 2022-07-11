export const TdCustom = ({
  type,
  value,
}: {
  type: string | undefined;
  value: any;
}) => {
  if (type == "image") {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 w-32 h-32">
          <img className="w-full h-full" src={value} alt="" />
        </div>
      </div>
    );
  }
  if (type == "status") {
    let color = "bg-green-200";
    let label = "Active";
    if (value == 0) {
      color = "bg-red-200";
      label = "Not Active";
    }
    return (
      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
        <span
          aria-hidden
          className={`absolute inset-0 ${color} rounded-full opacity-50`}
        ></span>
        <span className="relative">{label}</span>
      </span>
    );
  }
  return <p className="text-gray-900 whitespace-no-wrap">{value}</p>;
};
