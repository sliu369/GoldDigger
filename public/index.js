const eventSource = new EventSource('/price/live')
const priceDisplay = document.getElementById("price-display")
const outputs = document.querySelector(".outputs")
const investForm = document.querySelector("form")

//Update gold price every 2 seconds
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.currentPrice

  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.log('Connection failed...')
}

//Events when invest button is clicked
investForm.addEventListener("submit", function(e) {
  //prevent default behavior and get data from the form
  e.preventDefault()
  const formData = new FormData(investForm)
  const invest = formData.get("investment-amount")

  //show dialog
  outputs.showModal()

  //get the price by the time the button was clicked, convert it to number
  const currentPrice = Number(priceDisplay.textContent)

  console.log("The data type of the currentPrice is: " + typeof(currentPrice)+ currentPrice)
  console.log("The data type of the invest is: " + typeof(invest) + invest)

  const message = `You just bought about ${(invest/currentPrice).toFixed(2)} ounces (ozt) for £${invest}. \n You will receive documentation shortly.`
  document.getElementById("investment-summary").textContent = message

  document.querySelector(".outputs button").addEventListener("click", () => {
    outputs.close()
  })
})