export const formatCurrency = (value) => {
  const number = Number(value);
  if (number !== Math.floor(number)) {
    return "$" + number.toFixed(2);
  } else if (number >= 0) {
    return "$" + value;
  } else if (number < 0) {
    return "$" + Math.abs(value.toFixed(2));
  } else {
    return;
  }
};
