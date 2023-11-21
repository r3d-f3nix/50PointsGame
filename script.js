'use strict';

//Element selection
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const activePlayer0El = document.querySelector('.player--0');
const activePlayer1El = document.querySelector('.player--1');
const winnerPlayer0El = document.querySelector('.player--0');
const winnerPlayer1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//Starting conditions
let playing = Boolean(true); // SYSTEM CONDITION  State VARIABLE PLAYING?
let timeOut = Boolean(false)
let timeOutHold = Boolean(false)
let globalScore0 = Number(0);
let globalScore1 = Number(0);
let currentScore = Number(0);
let activePlayer = Number(0); // 0 player number one // 1 player number two
score0El.textContent = globalScore0;
score1El.textContent = globalScore1;
diceEl.classList.add('hidden');


// FXs
const fxScoreChartTo0 = function (globalScore) {
  document.getElementById(`score--${activePlayer}`).textContent = globalScore;
  currentScore = 0 ;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
};


const fxSwitchPlayer = function (){
    activePlayer0El.classList.toggle(`player--active`);
    activePlayer1El.classList.toggle(`player--active`);
};

const fxExecWinner = function (){
  diceEl.classList.add('hidden');
  playing = Boolean(false);
  if (activePlayer === 1){
    activePlayer0El.classList.remove(`player--active`);
    winnerPlayer0El.classList.add(`player--winner`);
    activePlayer = null;
  } else if (activePlayer === 0) {
    activePlayer1El.classList.remove(`player--active`);
    winnerPlayer1El.classList.add(`player--winner`);
    activePlayer = null;
  };
};

const fxTimeOut = function (){
  timeOut =false;
}

const fxTimeOutHold = function (){
  timeOutHold =false;
}

const fxRestart = function () {
  globalScore0 = Number(0);
  globalScore1 = Number(0);
  currentScore = Number(0);
  activePlayer = Number(0);
  playing = Boolean(true); 
  score0El.textContent = globalScore0;
  score1El.textContent = globalScore1;
  diceEl.classList.add('hidden');
  winnerPlayer0El.classList.remove(`player--winner`);
  winnerPlayer1El.classList.remove(`player--winner`);
  activePlayer0El.classList.remove(`player--active`);
  activePlayer1El.classList.remove(`player--active`);
  activePlayer0El.classList.add(`player--active`);
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
 }

// ------- USER ROLLS DICE
if (!timeOut)
btnRoll.addEventListener('click', function () {
    
  if(playing && !timeOut){
    const dice = Number(Math.trunc(Math.random() * 6 ) + 1 ); //generate a random dice roll
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `.//assets/images/dice-${dice}.png`;
    console.log(dice);
    
    // check: result 1 switch player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice; //current = currentScore + dice;
        //current0El.textContent = currentScore; // just for player 0
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      }else {
        currentScore = Number(0); //current = currentScore + dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        if (activePlayer === 0){
          activePlayer = Number (1);
        }else{
          activePlayer = Number (0);
        }
        fxSwitchPlayer();
      }
      timeOut =true;
      setTimeout(fxTimeOut, 500);
    }   
  });
  

// USER CLICK HOLD 
btnHold.addEventListener('click', function() {
  let tempGlobalScore = Number(0);
  if (playing && !timeOutHold && currentScore !== 0){
    if (activePlayer === 0 ) {
      tempGlobalScore = globalScore0;
      globalScore0 = tempGlobalScore + currentScore;
      fxScoreChartTo0(globalScore0);
      console.log(globalScore0);
      activePlayer = Number(1);
      fxSwitchPlayer();
        if (globalScore0 >= 50 ) {
          fxExecWinner(); 
        }
    } else if (activePlayer === 1) {
      tempGlobalScore = globalScore1;
      globalScore1 = tempGlobalScore + currentScore;
      fxScoreChartTo0(globalScore1);
      console.log(globalScore1);
      activePlayer = Number(0);
      fxSwitchPlayer();
      if ( globalScore1 >= 50 ) {
        fxExecWinner(); 
      }
    }  
    timeOutHold =true;
    setTimeout(fxTimeOutHold, 1300);    
  }
});
  
  
// RESTART USER CLICK
btnNew.addEventListener('click', function (){  
  fxRestart(); 
});

// ANIMATIONEN
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});