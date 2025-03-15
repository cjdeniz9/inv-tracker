import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toggleModalCreate } from "../../inventory/createItem/context/showSlice";
import { getInventory } from "../../../context/inventorySlice";
import { addSearch, getSearch } from "../../../context/filtersSlice";

import BoxedImg from "../../../components/ui/BoxedImg";
import SearchBar from "../../../components/inputs/SearchBar";

import trackerLogo from "../../../assets/trackerLogo-alt.png";

import { profitColor } from "../utils/profitColor";
import { profitIcon } from "../utils/profitIcon";

import { FaChartLine } from "react-icons/fa";

export default function InventoryTab() {
  const dispatch = useDispatch();

  const inventory = useSelector(getInventory);
  const search = useSelector(getSearch);

  return (
    <div className="h-screen bg-gray-50">
      <div className="max-h-full overflow-auto p-4">
        <p className="text-2xl font-semibold mb-8">Your Inventory</p>
        <div className="mb-3">
          <SearchBar
            title="Search"
            onChange={addSearch}
            bg="#fff"
            border="2px"
            borderColor="#ededed"
            color="#cfcfcf"
            focusBorder=".5px"
            fontWeight="500"
            fontSize="sm"
            px={2}
            w="full"
            disabled={!inventory.length && true}
          />
        </div>
        {inventory.length ? (
          inventory
            .filter((i) => {
              return search.toLowerCase() === ""
                ? i
                : i.item.name.toLowerCase().includes(search);
            })
            .map((i) => {
              const salePrice =
                i.item.salePrice !== undefined ? i.item.salePrice : 0;

              return (
                <div key={i.id} className="mb-2.5">
                  <div className="w-full h-full bg-white flex p-4 rounded-sm drop-shadow-sm">
                    <div className="w-2/12">
                      {i.item.img === "" ? (
                        <BoxedImg
                          w={16}
                          img={trackerLogo}
                          title="tracker-logo-alt"
                          p={3}
                        />
                      ) : (
                        <BoxedImg w={16} img={i.item.img} title="item-img" />
                      )}
                    </div>
                    <div className="w-10/12 flex justify-between ml-6">
                      <div className="w-9/12">
                        <div className="flex place-content-between mb-2.5">
                          <span className="w-4/5 text-sm text-raisin-black truncate">
                            {i.item.name}
                          </span>
                          <div className="flex items-center justify-center text-ultramarine-blue text-xs font-light">
                            <div className="mr-1.5">
                              <FaChartLine />
                            </div>
                            <div>
                              <Link
                                to={
                                  i.item.status === "Sold"
                                    ? `/sales/${i.id}`
                                    : `/${i.id}`
                                }
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`${profitColor(salePrice)} font-medium`}
                        >
                          {profitIcon(salePrice)} ${salePrice}
                        </span>
                      </div>
                      <div className="w-2/12 grid place-items-center">
                        <span className="text-american-silver text-lg font-medium">
                          {i.item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="w-full h-full bg-white flex py-4 px-3 rounded-sm drop-shadow-sm">
            <span className="text-sm">
              You don't have anything in your inventory right now. Add your
              items in from{" "}
              {
                <Link
                  to={"/"}
                  onClick={() => dispatch(toggleModalCreate(true))}
                >
                  <span className="text-ultramarine-blue">your inventory</span>
                </Link>
              }
              .
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
