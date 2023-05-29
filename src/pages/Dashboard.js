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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import DashboardInventory from "../components/DashboardInventory";

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

  const date = moment().format("LL");

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

  const updateChartData = newDate.map((item) => {
    const updateProfit = inventoryData
      .filter((element) => {
        return element.soldDate.includes(item.current);
      })
      .reduce(function (prev, current) {
        return prev + +current.roi;
      }, 0);
    return {
      ...item,
      profit: updateProfit,
    };
  });

  if (newDate.length === 0) {
    setNewDate([defaultTableData]);
  }

  if (newDate.length !== 0 && newDate.slice(-1)[0].current !== date) {
    setNewDate([...newDate, currentDate]);
  }

  useEffect(() => {
    localStorage.setItem("newDate", JSON.stringify(newDate));
    localStorage.setItem("profitTotal", JSON.stringify(profitTotal));

    setNewDate(updateChartData);
  }, []);

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
        backgroundColor: "rgba(243, 243, 243, 0.5)",
        borderWidth: 1,
        borderColor: "rgb(237, 237, 237)",
        padding: 12,
        titleFont: {
          weight: 300,
        },
        titleColor: "#393939",
        bodyFont: {
          family: "'FontAwesome', sans-serif",
        },
        bodyColor: "#393939",
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
        label: "\uf81d",
        // <FontAwesomeIcon icon={faSackDollar} style={{ color: "#393939" }} />
        // "Tets",
        data: newDate.map((item) => item.profit),
        borderColor: "rgba(72, 187, 120, 1)",
        pointRadius: 3,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="tablet-screen:ml-64 flex">
        <div className="xl:w-7/12 w-full h-screen py-4 px-4">
          <DashboardHeader
            inventoryData={inventoryData}
            newDate={newDate}
            salesCount={salesCount}
            totalSpend={totalSpend}
            netProfit={netProfit}
          />
          <Line options={options} data={data} />
          <Reports
            salesIncome={salesIncome}
            totalSpend={totalSpend}
            netProfit={netProfit}
            itemPurchased={itemPurchased}
            salesCount={salesCount}
          />
        </div>
        <div className="xl:block hidden w-5/12">
          <DashboardInventory inventoryData={inventoryData} />
        </div>
      </div>
    </>
  );
}
