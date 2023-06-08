import { Link, useLocation } from "react-router-dom";

export default function InventoryHeader() {
  let location = useLocation();

  const headingContent = [
    {
      heading: "Inventory",
      subheading: "Manage your inventory of shoes, clothes, and collectibles.",
    },
    {
      heading: "Sales",
      subheading: "View all your shoe, clothing, and collectible sales.",
    },
  ];

  return (
    <>
      <h2>
        {location.pathname === "/"
          ? headingContent[0].heading
          : headingContent[1].heading}
      </h2>
      <p className="pt-2">
        {location.pathname === "/"
          ? headingContent[0].subheading
          : headingContent[1].subheading}
      </p>
    </>
  );
}
