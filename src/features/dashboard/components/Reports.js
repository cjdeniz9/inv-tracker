import { v4 as uuidv4 } from "uuid";

export default function Reports(props) {
  const defaultPercentValue = 0;

  const netProfitPercent = ((props.netProfit / props.totalSpend) * 100).toFixed(
    2
  );

  const reportsGrid = [
    {
      title: "Sales Income",
      priceCount: `$${props.salesIncome}`,
      percentValue: `${defaultPercentValue}%`,
      value: props.salesIncome,
      topBorder: true,
      bottomBorder: true,
      leftBorder: true,
      rightBorder: true,
    },
    {
      title: "Total Spend",
      priceCount: `$${props.totalSpend}`,
      percentValue: `${defaultPercentValue}%`,
      value: props.totalSpend,
      topBorder: true,
      bottomBorder: true,
      leftBorder: false,
      rightBorder: false,
    },
    {
      title: "Net Profit",
      priceCount: `$${props.netProfit}`,
      percentValue: `${isNaN(netProfitPercent) ? 0 : netProfitPercent}%`,
      value: props.netProfit,
      topBorder: true,
      bottomBorder: true,
      leftBorder: true,
      rightBorder: true,
    },
    {
      title: "Item Spend",
      priceCount: 0,
      percentValue: `${defaultPercentValue}%`,
      value: 0,
      topBorder: false,
      bottomBorder: true,
      leftBorder: true,
      rightBorder: true,
    },
    {
      title: "Items Purchased",
      priceCount: props.itemPurchased,
      percentValue: `${defaultPercentValue}%`,
      value: props.itemPurchased,
      topBorder: false,
      bottomBorder: true,
      leftBorder: false,
      rightBorder: false,
    },
    {
      title: "Sales Count",
      priceCount: props.salesCount,
      percentValue: `${defaultPercentValue}%`,
      value: props.salesCount,
      topBorder: false,
      bottomBorder: true,
      leftBorder: true,
      rightBorder: true,
    },
  ];

  return (
    <div className="xl:pb-0 py-10">
      <div className="border rounded-lg border-[#E2E8F0]">
        <h6 className="pl-2 pt-3">Reports</h6>
        <div className="phone-sizing:grid-cols-2 tablet-screen:grid-cols-3 grid grid-cols-1 p-2">
          {reportsGrid.map((item, key) => {
            const reportTextColor =
              item.value >= 0 ? "text-[#1D8751]" : "text-[#e53e3e]";
            const percentTextColor =
              item.value >= 0 ? "text-[#1D8751]" : "text-[#e53e3e]";

            const topBordering = item.topBorder === true ? "border-t" : "";
            const bottomBordering = (item.bottomBorder = true
              ? "border-b"
              : "");
            const leftBordering = item.leftBorder === true ? "border-l" : "";
            const rightBordering = item.rightBorder === true ? "border-r" : "";

            return (
              <div key={uuidv4()} className={`border pl-4 pt-3 pb-3`}>
                <h6>{item.title}</h6>
                <div className="flex items-center">
                  <h5 className={reportTextColor}>{item.priceCount}</h5>
                  <span
                    className={`${percentTextColor} border rounded-[16px] px-2 ml-2 mb-1 text-xs font-medium`}
                  >
                    {item.percentValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
