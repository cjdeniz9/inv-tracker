import { useLocation } from "react-router-dom";

export default function Header() {
  let heading, subheading;
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
    {
      heading: "Packages",
      subheading:
        "Add your packages and stay updated on your items in transit.",
    },
  ];

  if (location.pathname === "/sales") {
    heading = headingContent[1].heading;
    subheading = headingContent[1].subheading;
  } else if (location.pathname === "/packages") {
    heading = headingContent[2].heading;
    subheading = headingContent[2].subheading;
  } else {
    heading = headingContent[0].heading;
    subheading = headingContent[0].subheading;
  }

  return (
    <>
      <h2>{heading}</h2>
      <p className="pt-2">{subheading}</p>
    </>
  );
}
