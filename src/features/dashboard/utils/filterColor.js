export const filterColor = (value) => {
  if (value === "Gains") {
    return "text-[#1C9E20]";
  } else if (value === "Losses") {
    return "text-[#D73A00]";
  } else {
    return "text-[#338FFF]";
  }
};
