import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toggleModalCreate } from "../../inventory/createItem/context/showSlice";
import { getInventory } from "../../../context/inventorySlice";
import {
  addSearch,
  getStatus,
  addStatus,
  getSearch,
  clearSearch,
} from "../../../context/filtersSlice";

import BoxedImg from "../../../components/ui/BoxedImg";
import DropdownMenu from "../../../components/input/DropdownMenu";
import SearchBar from "../../../components/input/SearchBar";

import { Container } from "../../../components/container/Container";

import { filterColor } from "../utils/filterColor";
import { filterIcon } from "../utils/filterIcon";
import { formatCurrency } from "../../../utils/formatCurrency";

import trackerLogo from "../../../assets/trackerLogo-alt.png";

import { FaChartLine } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbChartCandle } from "react-icons/tb";

export default function InventoryTab() {
  const dispatch = useDispatch();

  const inventory = useSelector(getInventory);
  const filter = useSelector(getStatus);
  const search = useSelector(getSearch);

  const filterOptions = [
    { title: "Inventory", value: "Inventory" },
    { title: "Gains", value: "Gains" },
    { title: "Losses", value: "Losses" },
    { title: "Unrealized Profit", value: "Unrealized Profit" },
  ];

  const EmptyContainer = () => {
    return (
      <span className="text-sm">
        You don't have anything in your inventory right now. Add your items in
        from{" "}
        {
          <Link to={"/"} onClick={() => dispatch(toggleModalCreate(true))}>
            <span className="text-ultramarine-blue">your inventory</span>
          </Link>
        }
        .
      </span>
    );
  };

  const EmptyFilterContainer = ({ filter }) => {
    let content;
    if (filter === "Gains") {
      content =
        "You don't have any items in your inventory selling for a profit.";
    } else if (filter === "Losses") {
      content =
        "You don't have any items in your inventory selling for a loss.";
    } else if (filter === "Unrealized Profit") {
      content =
        "We weren't able to find any items in your inventory selling on the market.";
    }

    return (
      <div>
        <h5 className="text-lg mb-0">No items found</h5>
        <span className="text-sm text-quick-silver">{content}</span>
      </div>
    );
  };

  const ItemContainer = ({ id, img, name, status, filter, value, size }) => {
    return (
      <div className="w-full flex justify-between">
        <div className="w-1/6">
          {img === "" ? (
            <BoxedImg w={16} img={trackerLogo} title="tracker-logo-alt" p={3} />
          ) : (
            <BoxedImg w="full" img={img} title="item-img" />
          )}
        </div>
        <div className="w-4/5 flex justify-between px-1">
          <div className="w-5/6">
            <div className="flex mb-2.5">
              <span className="text-sm text-raisin-black truncate mr-2.5">
                {name}
              </span>
              <div className="flex items-center justify-center text-ultramarine-blue text-xs font-light">
                <div className="mr-1.5">
                  <FaChartLine />
                </div>
                <div>
                  <Link to={status === "Sold" ? `/sales/${id}` : `/${id}`}>
                    View
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`${filterColor(filter)} flex items-center font-medium`}
            >
              <div className="mr-1.5">{filterIcon(filter)}</div>
              <div>
                <span>{formatCurrency(value)}</span>
              </div>
            </div>
          </div>
          <div className="w-1/12 grid place-items-center">
            <span className="text-american-silver text-lg font-medium">
              {size}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const InventoryContainer = ({ img, name, value, itemCount }) => {
    return (
      <div className="w-full flex justify-between">
        <div className="w-1/6">
          {img === "" ? (
            <BoxedImg w={16} img={trackerLogo} title="tracker-logo-alt" p={3} />
          ) : (
            <BoxedImg w="full" img={img} title="item-img" />
          )}
        </div>
        <div className="w-4/5 flex justify-between px-1">
          <div className="w-5/6">
            <div className="flex place-content-between mb-2.5">
              <span className="text-sm text-raisin-black truncate">{name}</span>
            </div>
            <div className="flex items-center text-[#1A7FFF] font-medium">
              <div className="mr-1.5">{<FaArrowTrendUp />}</div>
              <div>
                <span>${value}</span>
              </div>
            </div>
          </div>
          <div className="w-1/8 flex items-center">
            <span className="text-american-silver text-xs font-medium">
              {itemCount} items
            </span>
          </div>
        </div>
      </div>
    );
  };

  const marketValue = (value) => {
    const marketPrice =
      Object.values(value).reduce((acc, curr) => acc + curr, 0) /
      Object.keys(value).length;

    return !isNaN(parseFloat(marketPrice)) ? marketPrice : 0;
  };

  const itemContainer = inventory.map((i) => {
    const itemCost = i.item.price + i.item.shippingPrice + i.item.tax;

    const salePrice = i.item.salePrice - itemCost;

    const unrealizedProfit = marketValue(i.item.resellPrices) - itemCost;

    const container = (i, value) => {
      const content = (
        <ItemContainer
          id={i.id}
          img={i.item.img}
          name={i.item.name}
          status={i.item.status}
          filter={filter}
          value={value}
          size={i.item.size}
        />
      );

      return (
        <div key={i.id} className="mb-2.5">
          <Container data={content} />
        </div>
      );
    };

    if (filter === "Gains" && i.item.status === "Sold" && salePrice > 0) {
      return container(i, salePrice);
    } else if (
      filter === "Losses" &&
      i.item.status === "Sold" &&
      salePrice < 0
    ) {
      return container(i, salePrice);
    } else if (
      filter === "Unrealized Profit" &&
      i.item.status !== "Sold" &&
      !isNaN(parseFloat(unrealizedProfit))
    ) {
      return container(i, unrealizedProfit);
    } else {
      return null;
    }
  });

  // Function to count occurrences of each id, and add name to the result
  const itemCount = inventory.reduce((acc, i) => {
    // Check if the id is already in the accumulator
    if (!acc[i.item.sku]) {
      acc[i.item.sku] = {
        total: 0,
        sku: i.item.sku,
        name: i.item.name, // Store the first name encountered for each id
        img: i.item.img,
        marketPrice: marketValue(i.item.resellPrices),
      };
    }
    // Increment the total count
    acc[i.item.sku].total += 1;
    return acc;
  }, {});

  const itemTotal = Object.keys(itemCount).map((id) => ({
    sku: itemCount[id].sku, // Convert id back to number
    name: itemCount[id].name, // Assign name associated with the id
    img: itemCount[id].img,
    marketPrice: itemCount[id].marketPrice,
    total: itemCount[id].total, // Total count for that id
  }));

  const itemsContainer = itemTotal.map((i) => {
    const content = (
      <InventoryContainer
        img={i.img}
        name={i.name}
        value={i.marketPrice}
        itemCount={i.total}
      />
    );

    return (
      <div key={i.id} className="mb-2.5">
        <Container data={content} />
      </div>
    );
  });

  const isEmptyFilteredContainers = (
    <Container data={<EmptyFilterContainer filter={filter} />} />
  );

  const filteredTypeContainer =
    filter === "Inventory" ? itemsContainer : itemContainer;

  const filteredContainers = filteredTypeContainer.filter((i) => i !== null);

  const handleContainers = () => {
    const handleSearch = (arr) => {
      return arr.filter((i) => {
        return search.toLowerCase() === ""
          ? i
          : i.props.children.props.data.props.name
              .toLowerCase()
              .includes(search.toLowerCase());
      });
    };

    if (inventory.length && filter === "") {
      return handleSearch(itemsContainer);
    } else if (inventory.length && filteredContainers.length && filter !== "") {
      return handleSearch(filteredContainers);
    } else if (
      inventory.length &&
      !filteredContainers.length &&
      filter !== ""
    ) {
      return isEmptyFilteredContainers;
    } else {
      return <Container data={<EmptyContainer />} />;
    }
  };

  function handleDropdownOnClick(value) {
    dispatch(addStatus(value));
    dispatch(clearSearch());
  }

  return (
    <div className="h-screen bg-gray-50">
      <div className="max-h-full overflow-auto p-4">
        <p className="text-2xl font-semibold mb-8">Your Inventory</p>
        <div className="flex justify-between mb-3">
          <div className="w-[66%]">
            <SearchBar
              title="Search"
              value={search}
              onChange={addSearch}
              bg="#fff"
              border="1px"
              borderColor="#ededed"
              borderRadius="4px"
              color="#cfcfcf"
              focusBorder=".5px"
              fontWeight="500"
              fontSize="sm"
              px={2}
              disabled={!inventory.length && true}
            />
          </div>
          <div className="w-[33.25%]">
            <DropdownMenu
              getState={getStatus}
              disabled={!inventory.length && true}
              pl={2.5}
              iconColor="#7a7a7a"
              iconFontSize="16px"
              w="full"
              labelFontSize="text-base"
              labelColor="text-quick-silver"
              label={<TbChartCandle />}
              title="Inventory"
              options={filterOptions}
              handleClick={handleDropdownOnClick}
            />
          </div>
        </div>
        {handleContainers()}
      </div>
    </div>
  );
}
