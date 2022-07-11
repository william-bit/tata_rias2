import { PencilIcon } from "@heroicons/react/outline";
import { TdCustom } from "./TdCustom";

export const TrCustom = ({
  row,
  config,
  isDelete,
  customAction,
  handleDelete,
  handleEdit,
  handleCustomAction,
}: {
  row: any;
  config: Array<{ title: string; key: string; type?: string }>;
  isDelete?: boolean;
  customAction?: Array<{ label: string; action: string; color: string }>;
  handleCustomAction?: (id: string, action: string) => void;
  handleDelete?: (id: number) => void;
  handleEdit?: (id: number) => void;
}) => {
  return (
    <tr key={row.id}>
      {config.map((valueConfig, indexConfig) => (
        <td
          key={indexConfig}
          className="px-5 py-5 text-sm bg-white border-b border-gray-200"
        >
          <TdCustom
            type={valueConfig.type}
            value={row[valueConfig.key]}
          ></TdCustom>
        </td>
      ))}
      {isDelete && handleDelete && (
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <div className="flex justify-center">
            <svg
              onClick={() => handleDelete(row.id)}
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-red-400 cursor-pointer hover:text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </td>
      )}
      {handleEdit && (
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          <PencilIcon
            onClick={() => handleEdit(row.id)}
            className="w-4 h-4 text-green-600"
          ></PencilIcon>
        </td>
      )}
      {customAction && handleCustomAction && (
        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
          {customAction.map((_value, index) => {
            let bgColor = "";
            let hoverBgColor = "";
            switch (_value.color) {
              case "red":
                bgColor = "bg-red-500";
                hoverBgColor = "hover:bg-red-400";
                break;
              case "blue":
                bgColor = "bg-blue-500";
                hoverBgColor = "hover:bg-blue-400";
                break;
              case "green":
                bgColor = "bg-green-500";
                hoverBgColor = "hover:bg-green-400";
                break;
              default:
                break;
            }
            return (
              <button
                key={index}
                className={`block w-full px-4 ${bgColor} ${hoverBgColor} py-1 my-1 cursor-pointer text-sm font-semibold text-center transition duration-150  rounded text-indigo-50 `}
                onClick={() => handleCustomAction(row.id, _value.action)}
              >
                {_value.label}
              </button>
            );
          })}
        </td>
      )}
    </tr>
  );
};
