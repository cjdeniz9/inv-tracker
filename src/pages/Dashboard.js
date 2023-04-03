import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import Reports from "../components/Reports";

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
import moment from "moment";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(props) {
  const [inventoryData, setInventoryData] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const date = moment().format("MM/DD/YYYY");

  const [newDate, setNewDate] = useState(
    () => JSON.parse(localStorage.getItem("newDate")) || []
  );

  const [profitTotal, setProfitTotal] = useState(
    () => JSON.parse(localStorage.getItem("profitTotal")) || []
  );

  const netProfit = inventoryData.reduce(function (prev, current) {
    return prev + +current.roi;
  }, 0);

  const filterTableData = inventoryData
    .filter((item) => {
      return item.soldDate.includes(date);
    })
    .reduce(function (prev, current) {
      return prev + +current.roi;
    }, 0);

  const defaultTableData = {
    id: uuidv4(),
    current: date,
    profit: inventoryData.reduce(function (prev, current) {
      return prev + +current.roi;
    }, 0),
  };

  const [currentDate, setCurrentDate] = useState({
    id: uuidv4(),
    current: date,
    profit: filterTableData,
  });

  const salesIncome = inventoryData
    .filter((item) => {
      return item.status.toLowerCase().includes("sold");
    })
    .reduce(function (prev, current) {
      return prev + +current.price + +current.roi;
    }, 0);

  const totalSpend = inventoryData.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0);

  const itemPurchased = inventoryData.length;

  const salesCount = inventoryData.filter((item) => {
    return item.status.toLowerCase().includes("sold");
  }).length;

  useEffect(() => {
    localStorage.setItem("newDate", JSON.stringify(newDate));
    localStorage.setItem("profitTotal", JSON.stringify(profitTotal));

    if (newDate.length === 0) {
      setNewDate([defaultTableData]);
    }

    if (newDate.length !== 0 && newDate.slice(-1)[0].current !== date) {
      setNewDate([...newDate, currentDate]);
    }
  }, [date, newDate]);

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

  const labels = newDate.map((item) => {
    return item.current;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Profit",
        data: newDate.map((item) => item.profit),
        borderColor: "rgba(72, 187, 120, 1)",
        pointStyle: "false",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="p-4 sm:ml-64">
        <DashboardHeader />
        <Line options={options} data={data} />
        <Reports
          salesIncome={salesIncome}
          totalSpend={totalSpend}
          netProfit={netProfit}
          itemPurchased={itemPurchased}
          salesCount={salesCount}
        />
      </div>
    </>
  );
}
