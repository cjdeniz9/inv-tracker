import {
  setItemsPurchased,
  setNetProfit,
  setSalesCount,
  setSalesIncome,
  setTotalSpend,
} from "../context/dashboardSlice";

const handleOperations = function (dispatch, inventory) {
  dispatch(setItemsPurchased(inventory.length));
  dispatch(
    setNetProfit(
      inventory
        .filter((inv) => {
          return inv.item.status.includes("Sold");
        })
        .reduce(function (prev, current) {
          return prev + +current.item.salePrice;
        }, 0)
    )
  );
  dispatch(
    setSalesCount(
      inventory.filter((inv) => {
        return inv.item.status.includes("Sold");
      }).length
    )
  );
  dispatch(
    setSalesIncome(
      inventory
        .filter((inv) => {
          return inv.item.status.includes("Sold");
        })
        .reduce(function (prev, current) {
          return prev + +current.item.price + +current.item.salePrice;
        }, 0)
    )
  );
  dispatch(
    setTotalSpend(
      inventory.reduce(function (prev, current) {
        return prev + +current.item.price;
      }, 0)
    )
  );
};

export default handleOperations;
