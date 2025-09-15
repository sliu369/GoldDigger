const eventSource = new EventSource('/price/live')
const priceDisplay = document.getElementById("price-display")
const outputs = document.querySelector(".outputs")

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.currentPrice

  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.log('Connection failed...')
}

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault()
})