

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
investForm.addEventListener("submit", async function(e) {
  //prevent default behavior and get data from the form
  e.preventDefault()
  const formData = new FormData(investForm)
  const invest = formData.get("investment-amount")

  //show dialog
  outputs.showModal()

  //get the price by the time the button was clicked, convert it to number
  const currentPrice = Number(priceDisplay.textContent)
  //calculate goldSold
  const goldSold = (invest/currentPrice).toFixed(2)

  //Post log to server
  const data = await logPurchase(invest, currentPrice, goldSold)
  console.log(data)

  document.getElementById("investment-summary").textContent =
      `You just bought about ${goldSold} ounces (ozt) for $${invest}. You will receive documentation shortly.`


  //close the dialog
  document.querySelector(".outputs button").addEventListener("click", () => {
    outputs.close()
  })
})

async function logPurchase(amountPaid, currentPrice, goldSold){
  
  try{
    const res = await fetch("/purchased", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        time: toLocalISOString(new Date()),
        paid: amountPaid,
        price: currentPrice,
        sold: goldSold
      })
    })
    if (res.ok){
      const data = await res.json()
      console.log("Purchase log has been sent to server")
      return data
    }
    else{
      console.error("Server error: "+res.statusText)
    }
  }
  catch(e){
    console.log("Error: " + e)
  }
}

//helper function to create iso time string in local time zone
function toLocalISOString(date){
  const tzOffset = date.getTimezoneOffset() * 60000; // offset in ms
  const localDate = new Date(date - tzOffset);
  return localDate.toISOString().slice(0, -1);
}