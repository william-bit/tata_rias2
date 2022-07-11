export const formatNumber = (value: number) => {
  if (value) {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
};
