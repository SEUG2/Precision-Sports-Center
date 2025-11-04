// Small utility to format amounts as Ghana Cedi (GHS)
export function formatGHS(value) {
  const num =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, "")) // strip non-numeric
      : Number(value);
  if (Number.isNaN(num)) return "GHS 0.00";
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
  }).format(num);
}