export const getUserInitial = (name: string) => name.charAt(0).toUpperCase();

// Remove any leading zeroes and limit
export function removeLeadingZeros(value: string) {
  const removeLeadingZeros = value.replace(/^0+/, "");
  return removeLeadingZeros === "" ? "0" : removeLeadingZeros;
}
