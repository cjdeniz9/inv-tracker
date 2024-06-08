export const profitColor = (value) => {
  if (value < 0) {
    return "text-blood-red";
  } else if (value > 0) {
    return "text-salem-green";
  } else {
    return "text-granite-gray";
  }
};
