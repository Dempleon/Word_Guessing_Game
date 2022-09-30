//Start the game by clicking on start game button
//Guess a word by filling in a number of blanks that match the number of letters in that word
//Game to be timed
//Game won when guess all the letters in the word
//Game lost when the timer runs out before guessing all the letters
//Total wins and losses displayed on the screen

//Presses a letter key, captured as a key event
//Correctly guesses a letter, the corresponding blank is replaced by the letter
//When the game is won message appears and timer stops
//or when timer runs out then message appears
//clicking start button resets the timer and change the word being guessed
//win and loss count stored on local storage
var gameBody = document.querySelector("body");
var wordBox = document.querySelector("#word-box");
var gameScore = document.querySelector("#game-score");
var gameTimer = document.querySelector("#game-timer")

var guessWord = "javascript";

function keydownAction(event){
    wordBox.textContent = event.key;
    console.log(event);
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        console.log(event.key);
        wordBox.textContent = event.key
    }
    else {
        return;
    }
}

gameBody.addEventListener("keydown",keydownAction);