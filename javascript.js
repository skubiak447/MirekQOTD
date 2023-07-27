const quoteText = document.querySelector(".quote")
soundBtn = document.querySelector(".sound")
copyBtn = document.querySelector(".copy")
twitterBtn = document.querySelector(".twitter")

let previousQuoteIndex = -1 // Initialize with an invalid index

function getQuoteIndexForDay(date) {
  const day = date.getDate()
  return day % quotes.length
}

function getRandomQuoteIndex() {
  const newIndex = Math.floor(Math.random() * quotes.length)
  return newIndex !== previousQuoteIndex ? newIndex : getRandomQuoteIndex()
}

function displayQuoteForDay() {
  const today = new Date()
  const quoteIndex = getQuoteIndexForDay(today)

  // Get a new quote index if the current one is the same as the previous one
  if (quoteIndex === previousQuoteIndex) {
    previousQuoteIndex = getRandomQuoteIndex()
  } else {
    previousQuoteIndex = quoteIndex
  }

  quoteText.innerText = quotes[previousQuoteIndex]
}

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(quoteText.innerText)
  utterance.rate = 0.8
  speechSynthesis.speak(utterance)
})

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText)
})

twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    quoteText.innerText
  )}%0Ahttps://skubiak447.github.io/MirekQOTD/`
  window.open(tweetUrl, "_blank")
})

window.onload = displayQuoteForDay
