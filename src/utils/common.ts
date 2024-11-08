export const getUserInitial = (name: string) => name.charAt(0).toUpperCase();

export function removeLeadingZeros(value: string) {
  const removeLeadingZeros = value.replace(/^0+/, "");
  return removeLeadingZeros === "" ? "0" : removeLeadingZeros;
}

export const roundNumber = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(2);
};
