import moment from "moment";

export const formatToUniversalDate = (value) => {
  return moment(value).format("YYYY-MM-DD");
};
