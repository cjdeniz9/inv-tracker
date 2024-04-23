export const payoutTotal = (value) => {
  const total =
    Number(value.salePrice) -
    (Number(value.salePlatformFees) + Number(value.saleShipping));
  return "$" + total;
};
