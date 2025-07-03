import { useEffect } from "react";

import { useSelector } from "react-redux";

import useFilteredChart from "../hooks/useFilteredChart";

import { getFilteredChart } from "../context/chartSlice";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const { handleFilterOnClick } = useFilteredChart();

  const filteredChart = useSelector(getFilteredChart);

  useEffect(() => {
    handleFilterOnClick("All");
  }, []);

  // Clean chart data
  // Removes data that is equal to 0

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const cleaningChartData = chart.filter((i) => i.item.profit === 0);

  //   cleaningChartData.map((i) => dispatch(deleteItemFromFirestore(i.id)));
  // }, []);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Inventory Profit Chart",
      },
      tooltip: {
        displayColors: false,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgb(237, 237, 237)",
        padding: 12,
        titleFont: {
          weight: 400,
        },
        bodyFont: {
          size: 14,
          weight: 500,
        },
        titleColor: "#393939",
        bodyColor: "#A1A5A4",
        zIndex: 10,
        mode: "index",
        position: "nearest",
        intersect: false,
        xAlign: "center",
        callbacks: {
          label: (profit) => {
            return formatCurrency(profit.raw);
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const labels = filteredChart.map((i) => {
    return formatDate(i.item.date);
  });

  const data = {
    labels,
    datasets: [
      {
        data: filteredChart.map((i) => i.item.profit),
        borderColor: "rgb(33, 180, 120)",
        pointStyle: false,
      },
    ],
  };

  return (
    <Line
      options={options}
      plugins={[
        {
          beforeDraw: (chart) => {
            if (chart.tooltip?._active?.length) {
              let x = chart.tooltip._active[0].element.x;
              let yAxis = chart.scales.y;
              let ctx = chart.ctx;
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(x, yAxis.top);
              ctx.lineTo(x, yAxis.bottom);
              ctx.lineWidth = 1;
              var grad = ctx.createLinearGradient(0, 0, 0, 150);
              grad.addColorStop(0.4, "rgba(72, 187, 120, .3)");
              grad.addColorStop(0.6, "rgba(72, 187, 120, .5)");
              ctx.strokeStyle = grad;
              ctx.stroke();
              ctx.restore();
            }
          },
        },
      ]}
      data={data}
    />
  );
}
