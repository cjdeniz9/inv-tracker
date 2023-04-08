import trackerLogo from "../img/trackerLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a href="#" className="flex items-center pl-2.5 mb-5 no-underline">
            <img
              src={trackerLogo}
              className="h-6 mr-3 sm:h-7"
              alt="Tracker Logo"
            />
            <span className="self-center text-xl text-black font-semibold whitespace-nowrap">
              Tracker
            </span>
          </a>

          <ul className="space-y-3">
            <li>
              <a
                href="/Dashboard"
                className="flex no-underline items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-american-silver"
              >
                <FontAwesomeIcon icon={faTable} style={{ color: "#181818" }} />
                <span className="ml-4 text-[#242424]">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/Inventory"
                className="flex no-underline items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-american-silver"
              >
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  style={{ color: "#181818" }}
                />
                <span className="ml-3 text-[#242424]">Inventory</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
