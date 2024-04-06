export const statusColor = (value) => {
  if (value.toLowerCase() === "listed") {
    return "text-tufts-blue";
  } else if (value.toLowerCase() === "sold") {
    return "text-salem-green";
  } else {
    return "text-granite-gray";
  }
};
