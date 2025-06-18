export const profitColor = (num) => {
  if (num > 0) {
    return "text-[#21b478]";
  } else if (num < 0) {
    return "text-[#ff6a3a]";
  } else {
    return "text-[#5f5f5f]";
  }
};
