'use strict';
/* NOTES:
- Player no. 0 = player 1
- player no. 1 = player 2

- "let currentScore" will be placed outside the argument function (btnRoll.addEventListener("click", function()) because each time we click the event listener, the score will reset
*/

// Selecting elements
const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add("hidden");
    player1El.classList.remove("player--winner");
    player2El.classList.remove("player--winner");
    player1El.classList.add("player--active");
    player2El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle("player--active");
    player2El.classList.toggle("player--active");
}

const resetScore = function () {

}

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating a random dice roll number from 1 to 6
        const dice = Math.trunc(Math.random() * 6) + 1

        // 2. Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`; // The ${dice} variable is on (line 17) - generate 1-6

        // 3. Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice // same as => currentScore = currentScore + dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore; // TODO CHANGE LATER
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore; // same as scores[1] = scores[1] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

newGame.addEventListener("click", init)