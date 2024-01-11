import { useEffect, useState } from "react";

import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

import Inventory from "../components/Dashboard/Inventory";
import Header from "../components/Dashboard/Header";
import Navbar from "../components/Navbar";
import Reports from "../components/Dashboard/Reports";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

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
  const date = moment().format("LL");

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "dashboard"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chartArr = [];
      querySnapshot.forEach((item) => {
        chartArr.push({ ...item.data(), id: item.id });
      });
      setChartData(chartArr);
      setLoading(true);
    });
    return () => unsubscribe;
  }, []);

  const netProfit = props.inventory.reduce(function (prev, current) {
    return prev + +current.salePrice;
  }, 0);

  const filterTableData = props.inventory
    .filter((item) => {
      const formattedDate = moment(item.saleDate).format("l");
      return formattedDate.includes(moment().format("l"));
    })
    .reduce(function (prev, current) {
      return prev + +current.salePrice;
    }, 0);

  const salesIncome = props.inventory
    .filter((item) => {
      return item.status.toLowerCase().includes("sold");
    })
    .reduce(function (prev, current) {
      return prev + +current.price + +current.salePrice;
    }, 0);

  const totalSpend = props.inventory.reduce(function (prev, current) {
    return prev + +current.price;
  }, 0);

  const itemPurchased = props.inventory.length;

  const salesCount = props.inventory.filter((item) => {
    return item.status.toLowerCase().includes("sold");
  }).length;

  // Set first doc for chart
  if (loading && !chartData.length) {
    addDoc(collection(db, "dashboard"), {
      date: date,
      profit: filterTableData,
      timestamp: serverTimestamp(),
    });
  }

  // Checks if current day exist, if not creates new doc for chart
  if (loading && chartData.length && chartData.slice(-1)[0].date !== date) {
    addDoc(collection(db, "dashboard"), {
      date: date,
      profit: filterTableData,
      timestamp: serverTimestamp(),
    });
  }

  // Checks for updated profit for current day
  if (loading && chartData.length && chartData.slice(-1)[0].date === date) {
    const id = chartData.slice(-1)[0].id;
    updateDoc(doc(db, "dashboard", id), {
      profit: filterTableData,
    });
  }

  function formatLabel(val) {
    return `$${val}`;
  }

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
        backgroundColor: "#FAFAFA",
        borderWidth: 1,
        borderColor: "rgb(237, 237, 237)",
        padding: 12,
        titleFont: {
          weight: 300,
        },
        titleColor: "#393939",
        bodyColor: "#393939",
        callbacks: {
          // title: (xDatapoint) => {return formatXValue(xDatapoint.raw)},
          label: (profit) => {
            return formatLabel(profit.raw);
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

  const labels = chartData.map((item) => {
    return item.date;
  });

  const data = {
    labels,
    datasets: [
      {
        data: chartData.map((item) => item.profit),
        borderColor: "rgba(72, 187, 120, 1)",
        pointStyle: false,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="tablet-screen:ml-52 flex">
        <div className="xl:w-7/12 2xl:w-[57%] w-full h-screen py-4 px-4 overflow-auto">
          <Header
            inventory={props.inventory}
            chartData={chartData}
            salesCount={salesCount}
            totalSpend={totalSpend}
            netProfit={netProfit}
            date={date}
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
        <div className="xl:block 2xl:w-[43%] hidden w-5/12">
          <Inventory inventory={props.inventory} />
        </div>
      </div>
    </>
  );
}
