export const formatNumber = (number: number, decimals = 2) => {
  if (isNaN(number)) return "0";

  const hasDecimal = Number(number) % 1 !== 0;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: hasDecimal ? decimals : 0,
  }).format(number);
};
