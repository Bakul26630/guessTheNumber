console.log("JS runs..");
const secondpage = `
<section id="mainGameArea">
    <div id="gameAreaDiv">
        <button id="newGameButton" onClick="show()">New Game</button>
        <p id="para"></p>
        <h2 id='result'>Your Guess</h2>
        <input
            type="number"
            name="guessNumber"
            id="guess"
            min="1"
            max="100"
            placeholder="Enter Your Guess"
            />
        <div id="stats">
        <div id="div1">
            <p id="p1">Number of previous attempts</p><p id="attempt">0</p>
        </div>
        <div id="div2">
            <p id="p2">Numbers that are guessed</p><p id="guesses"></p>
        </div>
        </div>
    </div>
</section>`;


const audio = new Audio('music/mixkit-retro-arcade-casino-notification-211.wav');
const math = Math;
let userGuess;
let computerGuess;
let previousGuesses = [];
let low = "Your Guess is too Low 😌";
let high = "Your Guess is too High 😮";
let winner = "You Guess the correct number 😃";
let looser;
let count = 0;

const show = ()=>{
  audio.play();
  window.location.reload();
}

document.getElementById("easy").addEventListener("click", () => {
  audio.play();
  document.getElementById("main").innerHTML = secondpage;
  Easy_mode();
});

document.getElementById("hard").addEventListener("click", () => {
  audio.play();
  document.getElementById("main").innerHTML = secondpage;
  Hard_mode();
});

function numberGenerator() {
  let num = Math.floor(Math.random() * 100);

  if (num == 0) {
    num = 1;
  }

  return num;
}

function Easy_mode() {
  // Generating number generator
  computerGuess = numberGenerator();

  let maxMoves = 10;

  // Accessing user guessed number
  document.getElementById("guess").addEventListener("change", () => {
    Game(maxMoves,computerGuess);
    });
}

function Hard_mode()
{
  // Generating number generator
  computerGuess = numberGenerator();

  let maxMoves = 5;

  document.getElementById("guess").addEventListener("change", () => {
    Game(maxMoves,computerGuess);
    });
}

function Game(maxMoves , computerGuess){
  audio.play();
  if(count<maxMoves)
{
  count++;
  userGuess = Number(document.getElementById("guess").value);
  previousGuesses.push(userGuess);
  document.getElementById("attempt").innerHTML = String(count);
  document.getElementById("guesses").innerHTML = previousGuesses;
  console.log(userGuess);
  if (userGuess == computerGuess) {
    document.getElementById('guess').disabled=true;
    document.getElementById("result").innerHTML = winner;
    document.getElementById("newGameButton").style.display = "block";
    document.getElementById("para").style.display = "none";
    return;
  } else if (userGuess < computerGuess) {
    document.getElementById("result").innerHTML = low;
  } else {
    document.getElementById("result").innerHTML = high;
  }
}

if (count == maxMoves) {
  looser = `You loose the Game..Correct Answer is ${computerGuess}`;
  document.getElementById("result").innerHTML = looser;
  document.getElementById('guess').disabled=true;
  document.getElementById("newGameButton").style.display = "block";
  document.getElementById("para").style.display = "none";
  return;
}
}