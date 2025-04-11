export const profitColor = (value) => {
  const num = value.toString().replace(/[^0-9]/g, "");

  if (num < 0) {
    return "#D73A00";
  } else {
    return "#1C9E20";
  }
};
