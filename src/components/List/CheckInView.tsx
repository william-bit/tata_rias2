import React, { useState } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CalendarIcon } from "@heroicons/react/outline";

const CheckInView = () => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const items = [];
  for (let index = 1; index <= 5; index++) {
    items.push(
      <div>
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label className="ml-1">{index} Star</label>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-2 border rounded-lg">
      <label className="mb-4">Tanggal Visit</label>
      <div className="w-full">
        <button
          type="button"
          className="flex items-center justify-center w-full border border-gray-400 rounded-lg"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <CalendarIcon className="w-5 h-5 text-gray-600"></CalendarIcon>
          Date Visit
        </button>

        <div className={`${showCalendar ? "" : "hidden"} absolute w-full mt-2`}>
          <DateRange
            editableDateInputs={true}
            months={2}
            direction={"horizontal"}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      </div>
      <label className="mt-2 mb-0">Minimum Ranting</label>
      <div className="ml-1">{items}</div>
      <label className="mt-2 mb-0">Price Range</label>
      <div className="ml-1">
        <div className="flex">
          <label className="w-16 mr-1 whitespace-nowrap">From :</label>

          <input type="number" className="w-full border"></input>
        </div>
        <div className="flex mt-1">
          <label className="w-16 mr-1 whitespace-nowrap">Until :</label>
          <input type="number" className="w-full border"></input>
        </div>
      </div>
    </div>
  );
};

export default CheckInView;
