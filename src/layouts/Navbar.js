import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { resetFilters } from "../context/filtersSlice";
import { clearCheckboxes } from "../features/inventory/components/filters/context/filterSlice";

import { Button } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTable,
  faBox,
  faBoxOpen,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";

import trackerLogo from "../img/trackerLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const path = location.pathname;

  const tabIcon = (tab) => {
    return path === tab ? "text-blue-ryb" : "text-granite-gray";
  };

  const tabText = (tab) => {
    return path === tab ? "text-blue-ryb" : "text-[#242424]";
  };

  const tabBackground = (tab) => {
    return path === tab ? "#e0e9ff" : "#ededed";
  };

  useEffect(() => {
    dispatch(resetFilters());
    dispatch(clearCheckboxes());
  }, []);

  const tabList = [
    {
      link: "/dashboard",
      icon: faTable,
      name: "Dashboard",
    },
    {
      link: "/",
      icon: faBoxOpen,
      name: "Inventory",
    },
    {
      link: "/sales",
      icon: faSackDollar,
      name: "Sales",
    },
    {
      link: "/packages",
      icon: faBox,
      name: "Packages",
    },
  ];

  const Tab = ({ link, icon, name }) => {
    return (
      <li>
        <Link
          to={link}
          className={`w-[90%] flex no-underline font-normal text-gray-900 rounded-lg`}
        >
          <Button
            w="full"
            bg="none"
            _hover={{
              bg: tabBackground(link),
            }}
          >
            <div className="w-full text-left">
              <FontAwesomeIcon icon={icon} className={tabIcon(link)} />
              <span className={`font-normal ml-4 ${tabText(link)}`}>
                {name}
              </span>
            </div>
          </Button>
        </Link>
      </li>
    );
  };

  const tabs = tabList.map((i) => {
    return <Tab link={i.link} icon={i.icon} name={i.name} />;
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg tablet-screen:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen
            ? "translate-x-0 absolute w-full h-full top-0 right-0 bg-raisin-black opacity-50 z-40"
            : ""
        }`}
      ></div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        } tablet-screen:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-screen py-4 overflow-y-auto bg-gray-50">
          <a href="#" className="flex items-center pl-8 mb-5 no-underline">
            <img
              src={trackerLogo}
              className="h-6 mr-3 sm:h-7"
              alt="Tracker Logo"
            />
            <span className="self-center text-xl text-black font-semibold whitespace-nowrap">
              Tracker
            </span>
          </a>
          <ul className="space-y-3 p-0 ml-5">{tabs}</ul>
        </div>
      </aside>
    </>
  );
}
