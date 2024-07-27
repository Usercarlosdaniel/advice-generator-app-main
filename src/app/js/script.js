const quote = document.getElementById("quote");
const idNumber = document.querySelector(".advice-number");
const diceRoll = document.getElementById("dice");

diceRoll.addEventListener("click", () => {
  fetch(`https://api.adviceslip.com/advice`)
    .then((response) => response.json())
    .then((data) => {
      quote.innerHTML = data.slip.advice;
      idNumber.innerHTML = data.slip.id;
    });
});
