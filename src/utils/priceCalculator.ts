export interface PriceCalculation {
  netTotal: number;
  vatAmount: number;
  grossTotal: number;
  itemCount: number;
}

export const calculateTotalPrice = (items: Array<{ price: string; quantity?: number }>): PriceCalculation => {
  const netTotal = items.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);

  const vatAmount = Number((netTotal * 0.07).toFixed(2));
  const grossTotal = Number((netTotal + vatAmount).toFixed(2));

  return {
    netTotal: Number(netTotal.toFixed(2)),
    vatAmount,
    grossTotal,
    itemCount: items.length
  };
};