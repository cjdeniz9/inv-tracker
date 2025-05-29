export const filterColor = (value) => {
  if (value === "Gains") {
    return "text-[#48bb78]";
  } else if (value === "Losses") {
    return "text-[#ff6a3a]";
  } else {
    return "text-[#3a9df8]";
  }
};
