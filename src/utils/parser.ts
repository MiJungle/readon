export function addCommas(value: string) {
  const numbersOnly = value.replace(/,/g, "");
  const cleanNumbers = numbersOnly.replace(/[^\d]/g, "");
  const withoutLeadingZeros = cleanNumbers.replace(/^0+/, "") || "0";
  return withoutLeadingZeros.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
