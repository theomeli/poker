import {
  deepFreeze,
  RandomCards,
  RankMapping,
  SuitMapping
} from "./cardsRating";

const getCards = (cards, n) => {
  var handCards = cards.slice(0, 3);
  handCards = deepFreeze(
    handCards.map(c => {
      return { rank: RankMapping[c.rank], suit: c.suit };
    })
  );
  const restOfTheCards = cards.slice(3);
  return [handCards, restOfTheCards];
};

const appendOneCard = (cards, allCards) => {
  const aCard = cards.slice(0, 1);
  aCard.map(c => {
    return { rank: RankMapping[c.rank], suit: c.suit };
  });
  cards.append(aCard);
  const restOfTheCards = allCards.slice(1);

  return [cards, restOfTheCards];
};

var [myHand, cards] = getCards(RandomCards, 3);
var [opponentHand, cards] = getCards(cards, 3);

///////////////////////////////////////
const store = Redux.createStore((state = { login: false }) => state);

const loginAction = () => {
  return {
    type: "LOGIN"
  };
};

// Dispatch the action here:
store.dispatch(loginAction());
/////////////////////////////////////////
/////////////////////////////////////////
const ADD = "ADD";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// global count variable:
let count = 0;

// change code below this line
const counter = () => ++count;
store.subscribe(counter);
// change code above this line

store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);
store.dispatch({ type: ADD });
console.log(count);
//////////////////////////////////////////

export { myHand, opponentHand, cards, appendOneCard };
