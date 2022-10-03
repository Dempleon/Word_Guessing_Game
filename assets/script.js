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
var timeLeft = 10;
var timeInterval;
var localWinCount = localStorage.getItem('winCount');
var localLoseCount = localStorage.getItem('loseCount');

var words = ['javascript', 'style', 'selector', 'array', 'method', 'function'];
var guessWord = words[Math.floor(Math.random() * words.length)];
var guessedLetters = [];

// local storage
// check to see if the stats exist in local storage
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
// checks to see if the word has been guessed after each key press
// stop timer and updates stats when final letter is guessed
function keydownAction(event) {
    // check to see if game is over
    // when game is over, pressing a key will do nothing
    if(gameOver) {
        console.log('game is over')
        return;
    }

    // if key pressed is a letter, else just return from the function
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        console.log(event.key);

        // search guessWord if keypressed is part of it
        if (searchString(event.key, guessWord)) {
            // get indexes of letters matching the input
            var letterIndexs = searchString(event.key, guessWord);

            // replace the '_' with letter
            replaceAt(letterIndexs, event.key, guessedLetters);
            wordBox.textContent = guessedLetters.join(" ");
            
            // check to see if the word has been guessed correctly
            // if word has been correctly guessed, stop timer and increment wins, update stats
            if (checkWord()) {
                wordBox.textContent = guessedLetters.join(" ");
                gameOver = true;
                gameTimer.textContent = "You correctly guessed the word before the timer ran out";
                clearInterval(timeInterval);
                
                localWinCount++;
                updateStats();
            }
            
        }
    }
    else {
        return;
    }
}

// add event lister to button and
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

// function to reset game
// resets timeLeft, guessedLetters, clears timeInvertal
// random word is chosen and guessed letters filled with '_'
function reset() {
    gameOver = false;
    timeLeft = 10;
    guessedLetters = [];
    guessWord = words[Math.floor(Math.random() * words.length)];
    // console.log(guessWord)
    clearInterval(timeInterval);
    for (var i = 0; i < guessWord.length; i++) {
        guessedLetters.push('_')
    }
    wordBox.textContent = guessedLetters.join(' ');
    updateStats();
}

// function to countdown gets called at the end of each time interval 1000ms
// if timer > 0, decrement the timer
// if timer = 0, game over increment loses
function countDown() {
    if (!gameOver) {
        if (timeLeft > 0) {
            console.log('timeleft: ' + timeLeft);
            gameTimer.textContent = timeLeft + " seconds left";
            timeLeft--;
        } else {
            gameTimer.textContent = "No time remaining! You lost. Game over!";
            gameOver = true;
            localLoseCount++;
            updateStats();
        }
    }
}

//function to check for empty indexs
//checks guessed letters
// if there is a '_' then the word is incomplete return false
// if not a single '_" then return true, game over
function checkWord() {
    // iterate through the guessed letters
    for (var i = 0; i < guessedLetters.length; i++) {
        if (guessedLetters[i] === '_') {
            return false;
        }
    }
    gameOver = true;
    return true;
}

// when the game starts reset everything and start timer
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