'use strict';
//  SELECTING ELEMENTS
let playing = true;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// STARTING CONDITIONS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. GENERATING A RANDOM DICE
    const dice = Math.trunc(Math.random() * 6) + 1;
    //  2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `./Images/dice-${dice}.png`;

    //  3. CHECK FOR ROLLED 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //  2. CHECK IF PLAYER'S SCORE IS >= 100
    //  FINISH GAME
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // SWITCH PLAYER
      switchPlayer();
    }
  }
});
//  NEW GAME
document.querySelector('.btn--new').addEventListener('click', function () {
  playing = true;
  currentScore = 0;
  for (let i = 0; i < 2; i++) {
    document.querySelector(`#score--${i}`).textContent = currentScore;
    document.querySelector(`#current--${i}`).textContent = currentScore;
    scores[i] = 0;
    if (
      document
        .querySelector(`.player--${i}`)
        .classList.contains('player--winner')
    ) {
      document
        .querySelector(`.player--${i}`)
        .classList.remove('player--winner');
      document.querySelector(`.player--${i}`).classList.add('player--active');
    }
  }
});
