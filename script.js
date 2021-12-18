/**
 * Global variables
 */
let swapCardsBtn;
let savedCardsArray = [];
let userHand = [];

let betAmount = 0;

// combintaions met
let fiveOfAKind = 0;
let straightFlush = 0;
let fullHouse = 0;
let straights = 0;
let flush = 0;
let quads = 0;
let thriples = 0;
let doublePairs = 0;
let pairs = 0;

const userPoints = 100;
let deck = [];

// TODO
// clicks a button to deal cards
// user selects which card to keep
// --> cards get saved to savedCardsArray when clicked. Need to create a function that replaces the unclicked cards
// game replaces the unselected cards, calculateds the handscore, and update total points.
// game calculates the hand score upon dealt of first hand
// function that adds card in a loop and adds a click element to change cards.
// once deal cards is pressed, hide button until end of game

/** DOING
 * function that sums returns the sum of the playing hand
 * @param {array} cardHand the user's current playing hand
 * @returns {number} sum of scores from the user's playing hand
 */

//////////////////////////////////
// Calculate Handscore function //
//////////////////////////////////

const calcHandScore = (cardHand) => {
  // 1 pair DONE
  // 2 pair
  // 3 of a kind DONE
  // straight DONE
  // flush DONE
  // full house DONE
  // 4 of a kind DONE
  // straight flush DONE
  // 5 of a kind DONE

  checkForStraight(cardHand);
  checkForFlush(cardHand);
  quadsThriplesPairsFullHouse(cardHand);
  checkForFiveOfAKind(cardHand);
  checkForStraightFlush(cardHand);

  checkIfHitCombo();
};

const checkForFiveOfAKind = (cardHand) => {
  let counter = 0;
  // iterate through the userHand or savedCardArray
  for (const [i, { rank, suit }] of Object.entries(cardHand)) {
    let index = Number(i);
    // check for 5 of a kind
    if (rank === cardHand[0].rank) {
      counter += 1;
      if (counter === 5) {
        console.log(`5 of a kind!`);
        counter = 0;
        fiveOfAKind = 1;
      }
    }
  }
};

const checkForStraightFlush = (cardHand) => {
  // check if straight and flush are true;

  if (straights && flush === 1) {
    console.log('flush!');
  }
};

const checkForFlush = (cardHand) => {
  // check if all the suits are the same
  let suitTally = {};
  for (const [i, { suit }] of Object.entries(cardHand)) {
    // check if all the suits are the same
    if (suit in suitTally) {
      suitTally[suit] += 1;
    } else {
      suitTally[suit] = 1;
    }
  }
  if (Object.keys(suitTally).length === 1) {
    flush = 1;
    return true;
  }
};

const checkForStraight = (cardHand) => {
  // check if the cards are in running order DOING

  // sort the cards to be in descending order
  const sortedHand = [...cardHand].sort((a, b) => b.rank - a.rank);
  // console.log(sortedHand);

  // loop through the sortedHand to check if the difference between
  // each card is 1
  let counter = 0;
  for (let i = 0; i < sortedHand.length - 1; i += 1) {
    if (sortedHand[i].rank - sortedHand[i + 1].rank === 1) {
      counter += 1;
      if (counter === 4) {
        straights = 1;
      }
    }
  }
};

// TODO 2 pair (set a counter)
const quadsThriplesPairsFullHouse = (cardHand) => {
  let cardTally = {};
  for (const [i, { rank, suit }] of Object.entries(cardHand)) {
    if (rank in cardTally) {
      cardTally[rank] += 1;
    } else {
      cardTally[rank] = 1;
    }
  }
  // console.log(cardTally);

  let card4x = false;
  let card3x = false;
  let card2x = false;
  let card3x2x = false;

  for (const i of Object.keys(cardTally)) {
    for (const j of Object.values(cardTally)) {
      if (j === 4) {
        card4x = true;
      }
      if (j === 2) {
        card2x = true;
      }
      if (j === 3) {
        card3x = true;
      }
      if (card3x === true && card2x === true) {
        card3x2x = true;
      }
    }
  }
  if (card4x === true) {
    quads = 1;
  } else if (card3x2x === true) {
    fullHouse = 1;
  } else if (card3x === true) {
    thriples = 1;
  } else if (card2x === true) {
    pairs = 1;
  }
  // console.log(
  //   `card4x: ${card4x}, card3x: ${card3x}, card2x: ${card2x}, card3x2x: ${card3x2x}`
  // );
};

//////////////////////
// helper functions //
//////////////////////

/**
 * function that makes a standard deck of cards
 */
const makeDeck = () => {
  // 4 suits - diamond, clubs, heart, spades
  // 13 cards per suit
  // create a loop that generates 52 cards of 4 suits
  let newDeck = [];
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  for (let i = 0; i < suits.length; i += 1) {
    const suitSymbol = ['♦', '♣', '♥', '♠'];
    let currentSuitSymbol = suitSymbol[i];

    for (let j = 1; j < 14; j += 1) {
      let cardSuits = suits[i];
      let suitColor;
      let cardName = j;
      let currentDisplayName = j;

      if (j === 1) {
        cardName = 'ace';
        currentDisplayName = 'A';
      } else if (j === 11) {
        cardName = 'jack';
        currentDisplayName = 'J';
      } else if (j === 12) {
        cardName = 'queen';
        currentDisplayName = 'Q';
      } else if (j === 13) {
        cardName = 'king';
        currentDisplayName = 'K';
      }
      if (cardSuits === 'diamonds' || cardSuits === 'hearts') {
        suitColor = 'red';
      } else {
        suitColor = 'black';
      }
      let currentCard = {
        name: cardName,
        suit: cardSuits,
        rank: j,
        color: suitColor,
        suitSymbol: currentSuitSymbol,
        displayName: currentDisplayName,
      };
      newDeck.push(currentCard);
    }
  }
  return newDeck;
};

/**
 * Function that shuffles the deck
 * @param {array} deck array of deck
 */
const shuffleDeck = (cards) => {
  for (let i = 0; i < cards.length; i += 1) {
    let randomIndex = randomNumberGenerator(cards.length);
    let currentCard = cards[i];
    let randomCard = cards[randomIndex];
    cards[i] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

/**
 * function that gives a random number depending on deck size
 * @param {number} deckLength length of deck
 * @returns a random number from 0 - 51
 */
const randomNumberGenerator = (deckLength) => {
  return Math.floor(Math.random() * deckLength);
};

/**
 * function that takes a card object and returns a div to display card
 * adds a function that saves the card to an array when clicked
 * @param {object} cardInfo contains info of the attributes of 1 card
 * @returns a card div containing the attributes of the  card
 */
const makeCard = (cardInfo) => {
  const card = document.createElement('div');
  const cardName = document.createElement('div');
  const cardSuit = document.createElement('div');

  card.classList.add('card');
  cardName.classList.add('name', cardInfo.color);
  cardSuit.classList.add('suit', cardInfo.color);

  cardName.innerHTML = cardInfo.displayName;
  cardSuit.innerHTML = cardInfo.suitSymbol;

  card.appendChild(cardName);
  card.appendChild(cardSuit);

  return card;
};

/**
 * function to swap cards that are not under holdStatus true
 */
const swapCards = () => {
  swapCardsBtn.addEventListener('click', () => {
    // saves cards on 'hold' status to an array
    savedCardsArray = userHand.filter((x) => x.holdStatus === true);
    console.log(savedCardsArray);
    const amtOfCardsToFillHand = 5 - savedCardsArray.length;
    console.log(`amt of cards needed = ${amtOfCardsToFillHand}`);
    // add x amt of cards into saved hand array to make it 5
    for (let i = 0; i < amtOfCardsToFillHand; i += 1) {
      const newCard = deck.pop();
      savedCardsArray.push(newCard);
    }
    // makeCards this new array and deal
    gameContainer.innerText = '';
    for (let i = 0; i < savedCardsArray.length; i += 1) {
      const card = savedCardsArray[i];
      const cardEl = makeCard(card);
      gameContainer.appendChild(cardEl);
    }
    // calculate the score of this card
  });
  // empties savedCardsArray
  savedCardsArray = [];
};

/**
 * function to create a button to deal shuffled cards
 * also displays cards in gameContainer
 */
const dealCardBtn = () => {
  const btnEl = document.createElement('button');
  btnEl.innerText = 'Deal Cards';
  btnEl.classList.add('btn-deal-cards', 'btn');
  buttonsContainer.appendChild(btnEl);
  btnEl.addEventListener('click', () => {
    // empties user hand array
    userHand = [];

    gameContainer.innerText = '';
    for (let i = 0; i < 5; i += 1) {
      const card = deck.pop();
      card.holdStatus = false;
      userHand.push(card);

      console.log(`${userHand[i].name} of ${userHand[i].suit} dealt`);
      const cardEl = makeCard(userHand[i]);

      // adds the index of the card to saved card array on 1st click
      let clickedTimes = 0;
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('clicked');
        console.log(`cardname: ${card.name}`);

        if (clickedTimes % 2 === 0) {
          // console.log('clickedTimes = 0');
          card.holdStatus = true;
          // removes index of card from array on 2nd click
        } else if (clickedTimes % 2 === 1) {
          card.holdStatus = false;
          // console.log('clickedTimes = 1');
        }
        clickedTimes += 1;
      });
      gameContainer.appendChild(cardEl);
    }
  });
};

const checkIfHitCombo = () => {
  console.log(
    `fiveOfAKind: ${fiveOfAKind}, straightFlush: ${straightFlush}, fullHouse: ${fullHouse}, straights: ${straights}, flush: ${flush}, quads: ${quads}, thriples: ${thriples}, 2xPairs: ${doublePairs}, pairs: ${pairs}`
  );
};

/**
 * creates deck and shuffles deck
 */
deck = shuffleDeck(makeDeck());
