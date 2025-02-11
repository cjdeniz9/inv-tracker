export const searchFilter = (value, search, booleanProps, properties) => {
  value.filter((item) => {
    const props = booleanProps ? `${item}.${properties}` : item;
    return search.toLowerCase() === ""
      ? item
      : props.toLowerCase().includes(search);
  });
};
