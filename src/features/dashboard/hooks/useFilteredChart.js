import { useDispatch, useSelector } from "react-redux";

import {
  addDateFilter,
  addFilteredChartData,
  getChart,
  getDateFilter,
} from "../context/chartSlice";

import moment from "moment";

import { Button } from "@chakra-ui/react";

export default function useFilteredChart() {
  const dispatch = useDispatch();

  const chart = useSelector(getChart);
  const dateFilter = useSelector(getDateFilter);

  const date = moment().format("YYYY-MM-DD");

  const prevDate = (value) => {
    return moment().subtract(value, "d").format("YYYY-MM-DD");
  };

  const monthToDate = moment().startOf("month").format("YYYY-MM-DD");
  const yearToDate = moment().startOf("year").format("YYYY-MM-DD");

  const isChartEmpty = chart.length === 0 || chart.length === 1 ? date : "";

  const dateRange = [
    { name: "24HRS", value: prevDate(1) },
    { name: "1W", value: prevDate(7) },
    { name: "1M", value: prevDate(31) },
    { name: "MTD", value: monthToDate },
    { name: "YTD", value: yearToDate },
    { name: "All", value: isChartEmpty },
  ];

  const handleFilterOnClick = (filter, startDate) => {
    const endDate = moment().format("YYYY-MM-DD");

    const filterChart = chart.filter((i) => {
      if (startDate === "") {
        return i;
      } else if (
        startDate !== "" &&
        (moment(i.item.date).isBetween(startDate, endDate) ||
          i.item.date === startDate ||
          i.item.date === endDate)
      ) {
        return i;
      }
    });

    const emptyChart = filterChart.length === 0 && [
      {
        id: "start",
        item: {
          date: startDate,
          profit: 0,
        },
      },
      {
        id: "end",
        item: {
          date: endDate,
          profit: 0,
        },
      },
    ];

    const invalidChart = filterChart.length === 1 && [
      {
        id: "start",
        item: {
          date: startDate === "" ? date : startDate,
          profit: 0,
        },
      },
      {
        id: "end",
        item: {
          date: filterChart[0].item.date,
          profit: filterChart[0].item.profit,
        },
      },
    ];

    let filteredChart;

    if (emptyChart) {
      filteredChart = emptyChart;
    } else if (invalidChart) {
      filteredChart = invalidChart;
    } else {
      filteredChart = filterChart;
    }

    dispatch(addDateFilter(filter));
    dispatch(addFilteredChartData(filteredChart));
  };

  const FilterOptions = ({ name, value }) => {
    return (
      <Button
        onClick={() => {
          handleFilterOnClick(name, value);
        }}
        bg={name === dateFilter && "#003eff"}
        border="1px"
        borderColor={name === dateFilter ? "#003eff" : "#eeeeee"}
        borderLeftRadius={name === "24HRS" ? 2 : 0}
        borderRightRadius={name === "All" ? 2 : 0}
        marginRight="-1px"
        px={{ base: 5, lg: 3 }}
        height={{ base: 12, lg: 9 }}
        _hover={
          name === dateFilter
            ? {
                borderColor: "#5388fe",
                backgroundColor: "#5388fe",
              }
            : {
                backgroundColor: "none",
                color: "#7a7a7a",
              }
        }
      >
        <span
          className={`${
            name === dateFilter && "text-white"
          } lg:text-xs text-sm font-semibold`}
        >
          {name}
        </span>
      </Button>
    );
  };

  const chartFilter = dateRange.map((i) => {
    return <FilterOptions name={i.name} value={i.value} />;
  });

  return { handleFilterOnClick, chartFilter };
}
