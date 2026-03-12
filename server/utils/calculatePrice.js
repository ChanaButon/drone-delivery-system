export const calculatePrice = (weightRange, deliveryType) => {
  let price = 20

  if (weightRange === "5-10") price += 10
  if (weightRange === "10-20") price += 20
  if (deliveryType === "FAST") price += 15

  return price
}