export const profitColor = (value) => {
  const num = value.toString().replace(/[^0-9]/g, "");

  if (num < 0) {
    return "#E53E3E";
  } else {
    return "#1D8751";
  }
};
