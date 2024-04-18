export const statusBgColor = (value) => {
  if (value.toLowerCase() === "listed") {
    return "bg-blue-azureish-white";
  } else if (value.toLowerCase() === "sold") {
    return "bg-green-azureish-white";
  } else {
    return "bg-bright-gray";
  }
};
