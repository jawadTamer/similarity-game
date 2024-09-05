let cards = [
  { id: 1, symbol: "🐵" },
  { id: 2, symbol: "🐯" },
  { id: 3, symbol: "🦁" },
  { id: 4, symbol: "🐶" },
  { id: 5, symbol: "🐼" },
  { id: 6, symbol: "🐺" },
  { id: 7, symbol: "🐵" },
  { id: 8, symbol: "🐯" },
  { id: 9, symbol: "🦁" },
  { id: 10, symbol: "🐶" },
  { id: 11, symbol: "🐼" },
  { id: 12, symbol: "🐺" },
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;

function shuffleCards() {
  cards.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  shuffleCards();
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
  showAllCards();
}

function showAllCards() {
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((card, index) => {
    card.classList.add("flipped");
    card.textContent = cards[index].symbol;
  });
  setTimeout(() => {
    cardElements.forEach((card) => {
      card.classList.remove("flipped");
      card.textContent = "";
    });
  }, 2000);
}

function flipCard() {
  if (lockBoard) return;
  const card = this;
  if (card === firstCard) return;
  card.classList.add("flipped");
  card.textContent = cards[card.dataset.index].symbol;
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

function checkMatch() {
  const isMatch = firstCard.dataset.id === secondCard.dataset.id;
  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => {
        alert(`تهانينا! لقد انتهيت من اللعبة مع ${attempts} محاولة خاطئة.`);
      }, 500);
    }
  } else {
    attempts++;
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();
