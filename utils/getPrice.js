let price = 5100

export function getPrice(min = 5000, max = 5200) {
  const change = (Math.random() < 0.5 ? -1 : 1)*(Math.floor(Math.random()*5)+1)
  price += change

  // Clamp the value within min and max
  price = Math.max(min, Math.min(max, price))

  return price
}