'use strict';

//same thing two methods-- selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const winnerScore = 100;
let score, currentScore, activePlayer, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. disp dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //3. check for 1 if switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayers();
    }
  }
});

//hold button --
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active players score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check score for 100
    if (score[activePlayer] >= winnerScore) {
      //finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //switch player
    else {
      switchPlayers();
    }
  }
});

//Newgame
btnNew.addEventListener('click', init);
