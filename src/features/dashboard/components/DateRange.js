import { useSelector } from "react-redux";

import { getChart } from "../context/chartSlice";

import moment from "moment";

import { Button } from "@chakra-ui/react";

export default function DateRange() {
  const chart = useSelector(getChart);

  const prevDate = (value) => {
    return moment().subtract(value, "d").format("YYYY-MM-DD");
  };

  const monthToDate = moment().startOf("month").format("YYYY-MM-DD");
  const yearToDate = moment().startOf("year").format("YYYY-MM-DD");

  const dateRange = [
    { name: "24HRS", value: prevDate(1) },
    { name: "1W", value: prevDate(7) },
    { name: "1M", value: prevDate(31) },
    { name: "MTD", value: monthToDate },
    { name: "YTD", value: yearToDate },
    { name: "All", value: "" },
  ];

  const handleFilterOnClick = (startDate) => {
    const filterRange = chart.filter((i) => {
      const endDate = moment().format("YYYY-MM-DD");

      if (startDate === "") {
        return i;
      } else if (
        startDate !== "" &&
        moment(i.item.date).isBetween(startDate, endDate)
      ) {
        return i;
      }
    });

    return filterRange;
  };

  const FilterOptions = ({ name, value }) => {
    return (
      <Button
        onClick={() => {
          handleFilterOnClick(value);
        }}
        className="grid place-items-center border-1"
      >
        <span className="text-[10px] p-2">{name}</span>
      </Button>
    );
  };

  const filteredChart = dateRange.map((i) => {
    return <FilterOptions name={i.name} value={i.value} />;
  });

  return filteredChart;
}
