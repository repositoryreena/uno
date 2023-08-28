const suits = [
  { name: '♠', color: 'blue' },
  { name: '♥', color: 'red' },
  { name: '♦', color: 'orange' },
  { name: '♣', color: 'green' }
];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let userHand = [];
let computerHand = [];
let deck = [];
let playedCard = null;

function createDeck() {
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
}

function dealInitialCards(playerHand) {
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    playerHand.push(card);
  }
}

function displayPlayedCard() {
  const playedCardContainer = document.querySelector('.played-card');
  playedCardContainer.innerHTML = '';

  if (playedCard) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `${playedCard.suit.name} ${playedCard.rank}`;
    cardElement.style.color = playedCard.suit.color;
    playedCardContainer.appendChild(cardElement);
  }
}

function displayUserHand() {
  const userHandContainer = document.querySelector('.user-hand');
  userHandContainer.innerHTML = '';

  for (let i = 0; i < userHand.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `${userHand[i].suit.name} ${userHand[i].rank}`;
    cardElement.style.color = userHand[i].suit.color;
    userHandContainer.appendChild(cardElement);

    cardElement.addEventListener('click', () => playUserCard(i));
  }
}

function canPlayCard(card) {
  if (!playedCard) {
    return true;
  }
  
  return card.suit.name === playedCard.suit.name || card.rank === playedCard.rank;
}

function playUserCard(index) {
  const selectedCard = userHand[index];
  if (canPlayCard(selectedCard)) {
    playedCard = selectedCard;
    userHand.splice(index, 1);

    displayUserHand();
    displayPlayedCard();

    // Computer's turn immediately after user's turn
    setTimeout(() => {
      computerTurn();
      displayPlayedCard();
    }, 0);
  }
}

function computerTurn() {
  const validComputerCards = computerHand.filter(card => canPlayCard(card));
  
  if (validComputerCards.length > 0) {
    const selectedCard = validComputerCards[Math.floor(Math.random() * validComputerCards.length)];
    playedCard = selectedCard;
    const cardIndex = computerHand.findIndex(card => card === selectedCard);
    computerHand.splice(cardIndex, 1);
  }
}

function drawUserCard() {
  if (deck.length > 0) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck.splice(randomIndex, 1)[0];
    
    userHand.push(drawnCard);
    displayUserHand();

    // Computer's turn immediately after user draws a card
    setTimeout(() => {
      computerTurn();
      displayPlayedCard();
    }, 0);
  } else {
    console.log("No cards left in the deck!");
  }
}

function initializeEventListeners() {
  const drawButton = document.querySelector('.draw-button');
  drawButton.addEventListener('click', drawUserCard);

  // Initial computer's turn
  computerTurn();
  displayUserHand();
  displayPlayedCard();
}

createDeck();
dealInitialCards(userHand);
dealInitialCards(computerHand);
initializeEventListeners();
