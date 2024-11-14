export const formatNumberWithCommas = (num: string) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatNumber = (number: number, decimals = 2) => {
  if (isNaN(number)) return "0";

  const hasDecimal = Number(number) % 1 !== 0;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: hasDecimal ? decimals : 0,
  }).format(number);
};
