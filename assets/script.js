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

var guessWord = "javascript";
var guessedLetters = ['_','_','_','_','_','_','_','_','_','_'];

var isComplete = false;
var gameOver = false;

function keydownAction(event) {
    //wordBox.textContent = guessedLetters;
    // console.log(event);
    // console.log(typeof(guessedLetters));
    // console.log(typeof(guessWord));
    if (gameOver) {
        return;
    }
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        console.log(event.key);
        // return event.key;
        if (searchString(event.key, guessWord)) {
            var letterIndexs = searchString(event.key, guessWord);
            replaceAt(letterIndexs, event.key, guessedLetters);
            wordBox.textContent = guessedLetters.join(" ");
            checkGuess();
            if(isComplete) {
                alert('Congratulations');
            }
        }
        console.log(guessedLetters);
    }
    else {
        return;
    }
}

gameBody.addEventListener("keydown", keydownAction);
startButton.addEventListener("click", startGame);
function gameLoop() {
    //while the game is not finished loop through the game
    //if enetered letter is contained in the guessword, then 
    let letter = keydownAction()
    if (guessWord.indexOf(letter, 0)) {
        guessedLetters[guessWord.indexOf(letter, 0)] = letter;
        console.log(guessedLetters);
    }
}

// iterates through a string str, 
// at each index it checks to see if letter is the same the letter at the current index
// if it is, it adds the index to an array called indexs
// indexs is then returned.
function searchString(letter, str) {
    var indexs = [];
    for(var i = 0; i <= str.length; i++) {
        if(str[i] == letter) {
            indexs.push(i);
        }
    }
    return indexs;
}


// indexes is an array which contains the indjexes for the letters matching in guessword, and the key pressed

function replaceAt(indexes, letter, str) {
    //iterates through indexs replaces 
    for(var i = 0; i < indexes.length; i++) {
        str[indexes[i]] = letter;
        
    }
}

//gameLoop();

function countDown() {
    var timeLeft = 7;
    var timeInterval = setInterval(function (){
        if (timeLeft > 0) {
            gameTimer.textContent = timeLeft + " seconds left";
            timeLeft--;
            if(isComplete) {
                gameOver = true;
                gameTimer.textContent = 'Guessed correctly. Press button to start new game.'
            }
        } 
        else if (timeLeft === 0) {
            gameTimer.textContent = "No time remaining. Game over";
            gameOver = true;
        }
    }, 1000);
}

function startGame() {
    countDown();

}

//function to check for empty indexs
function checkGuess() {
    for(var i = 0; i < guessedLetters.length; i++) {
        if(guessedLetters[i] === '_') {
            isComplete = false;
        } else {
            if(!gameOver) {
                isComplete = true;
            }
        }
    }
}
