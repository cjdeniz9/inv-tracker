import { useSelector } from "react-redux";

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

import { getChart } from "../context/chartSlice";

import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";
import useFillInDates from "../hooks/useFillInDates";
import useFetchChart from "../../../hooks/useFetchChart";

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
  const chart = useSelector(getChart);

  const {} = useFillInDates();

  // Tooltip.positioners.cursor = function (chartElements, coordinates) {
  //   return coordinates;
  // };

  const options = {
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

  const labels = chart.map((data) => {
    return formatDate(data.item.date);
  });

  const data = {
    labels,
    datasets: [
      {
        data: chart.map((data) => data.item.profit),
        borderColor: "rgba(72, 187, 120, 1)",
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
