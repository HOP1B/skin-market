export const getRandomDiscount = (price: number) => {
  // Generate a random percentage discount between 5% and 30%
  const discountPercentage = Math.round(Math.random() * (30 - 5) + 5);

  // Calculate the discount amount
  const discountAmount = (discountPercentage / 100) * price;

  // Return the discounted price
  const highPrice = price + discountAmount;
  return { discountPercentage, highPrice };
};
