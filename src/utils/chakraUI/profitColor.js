export const profitColor = (value) => {
  const num = value.toString().replace(/[^0-9]/g, "");

  if (num < 0) {
    return "#ff6a3a";
  } else {
    return "#21b478";
  }
};
