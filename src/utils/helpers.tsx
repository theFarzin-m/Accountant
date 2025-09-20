export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fa", { style: "currency", currency: "IRR" }).format(
    value
  );
