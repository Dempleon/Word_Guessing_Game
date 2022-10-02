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
var gameTimer = document.querySelector("#game-timer");
var startButton = document.querySelector("button");
var wins = document.querySelector('#wins');
var loses = document.querySelector('#loses');

var gameOver = true;
var timeLeft = 7;
var timeInterval;
var localWinCount = localStorage.getItem('winCount');
var localLoseCount = localStorage.getItem('loseCount');

var words = [];
var guessWord = "javascript";
var guessedLetters = [];

// local storage
if(localWinCount !== null) {
    wins.textContent = "wins: " + localWinCount;
} else {
    localWinCount = 0;
    localStorage.setItem('winCount', localWinCount);
    wins.textContent = "wins: " + localWinCount;
}

if(localLoseCount !== null) {
    loses.textContent = "loses: " + localLoseCount;
} else {
    localLoseCount = 0;
    localStorage.setItem('loseCount', localLoseCount);
    loses.textContent = "loses: " + localLoseCount;
}

//event listener for keydownaction
function keydownAction(event) {
    // check to see if game is over
    if(gameOver) {
        console.log('game is over')
        return;
    }
    // if key pressed is a letter
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        console.log(event.key);

        // search guessWord if keypressed is part of it
        if (searchString(event.key, guessWord)) {
            var letterIndexs = searchString(event.key, guessWord);
            replaceAt(letterIndexs, event.key, guessedLetters);
            wordBox.textContent = guessedLetters.join(" ");
            console.log(guessedLetters.join(' '));
            if (checkWord()) {
                wordBox.textContent = guessedLetters.join(" ");
                gameOver = true;
                clearInterval(timeInterval);
                // alert('Congratulations');
                localWinCount++;
                updateStats();
            }
            
        }
        // console.log(guessedLetters);
    }
    else {
        return;
    }
}

gameBody.addEventListener("keydown", keydownAction);
startButton.addEventListener("click", game);


// iterates through a string str, 
// at each index it checks to see if letter is the same the letter at the current index
// if it is, it adds the index to an array called indexs
// indexs is then returned.
function searchString(letter, str) {
    var indexs = [];
    for (var i = 0; i <= str.length; i++) {
        if (str[i] == letter) {
            indexs.push(i);
        }
    }
    return indexs;
}


// indexes is an array which contains the indexes for the letters matching in guessword, and the key pressed
function replaceAt(indexes, letter, str) {
    //iterates through indexs replaces 
    for (var i = 0; i < indexes.length; i++) {
        str[indexes[i]] = letter;

    }
}


// function to start a countdown interval
// should only start when the button is pressed
// there should only be one countdown timer going on
function reset() {
    gameOver = false;
    timeLeft = 7;
    guessedLetters = [];
    clearInterval(timeInterval);
    for (var i = 0; i < guessWord.length; i++) {
        guessedLetters.push('_')
    }
    wordBox.textContent = guessedLetters.join(' ');
    updateStats();
    
}


function countDown() {
    if (!gameOver) {
        if (timeLeft > 0) {
            console.log('timeleft: ' + timeLeft);
            gameTimer.textContent = timeLeft + " seconds left";
            timeLeft--;
        } else {
            gameTimer.textContent = "No time remaining. Game over!";
            gameOver = true;
            localLoseCount++;
            updateStats();
        }
    }
}



//function to check for empty indexs
//checkes guessed letters
// if there is a '_' then 
function checkWord() {
    // iterate through the guessed letters
    for (var i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i] === '_') {
            
            console.log('is not complete: ');
            return false;
        }
    }
    gameOver = true;
    return true;
}

// when the game starts reset everything and start timer
// I want the game timer to decrement every second
// when I press a letter, I want the event to take place no matter where we are in the code
function game() {
    reset();
    console.log(guessedLetters.join(' '));
    gameTimer.textContent = timeLeft + " seconds left";

    timeInterval = setInterval(countDown, 1000);
}

// functions to update local storage stats and stats on screen
function updateStats() {
    localStorage.setItem('loseCount', localLoseCount);
    localStorage.setItem('winCount', localWinCount);
    wins.textContent = "wins: " + localWinCount;
    loses.textContent = "loses: " + localLoseCount;
}