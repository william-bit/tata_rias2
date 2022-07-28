import React from "react";
import { Controller, Path } from "react-hook-form";
import NumberFormat from "react-number-format";

export interface INumber {
  label?: string;
  disabled?: boolean;
  placeholder: string;
  name: string;
  prefix?: string;
  suffix?: string;
  error?: string[];
  control: any;
}

export const InputNumber = (props: INumber) => {
  return (
    <>
      {props.label ? (
        <label className="block mb-2 text-lg font-medium text-gray-900">
          {props.label}
        </label>
      ) : null}
      <Controller
        render={({ field }) => (
          <NumberFormat
            className="bg-gray-50 my-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            disabled={props.disabled}
            id={props.label}
            placeholder={props.placeholder}
            prefix={props.prefix}
            suffix={props.suffix}
            type="text"
            thousandSeparator="."
            decimalSeparator=","
            {...field}
          />
        )}
        name={props.name}
        control={props.control}
      />
      {props.error?.map((item: string, i: number) => (
        <div key={i} className="text-sm text-center text-red-600">
          {item}
        </div>
      ))}
    </>
  );
};
