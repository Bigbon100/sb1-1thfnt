export function calculateOrderTotals(items: Array<{ quantity: number; unit_price: number }>) {
  const netTotal = items.reduce((sum, item) => {
    return sum + (item.quantity * item.unit_price);
  }, 0);

  const vatAmount = Number((netTotal * 0.07).toFixed(2));
  const grossTotal = Number((netTotal + vatAmount).toFixed(2));

  return {
    netTotal,
    vatAmount,
    grossTotal
  };
}