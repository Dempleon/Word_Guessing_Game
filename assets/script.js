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
var guessedLetters = ['_','_','_','_','_','_','_','_','_','_'];

// ['_','_','_','_','_','_','_','_','_','_']



function keydownAction(event) {
    wordBox.textContent = event.key;
    // console.log(event);
    // console.log(typeof(guessedLetters));
    // console.log(typeof(guessWord));
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        console.log(event.key);
        wordBox.textContent = event.key;
        // return event.key;
        if (searchString(event.key, guessWord)) {
            // guessedLetters[guessWord.indexOf(event.key, 0)] = event.key;
            console.log("keydownAction(): line 37. " + guessedLetters);
            var letterIndexs = searchString(event.key, guessWord);
            console.log("keydownAction(): line 39: letterIndexs: " + letterIndexs);
            replaceAt(letterIndexs, event.key, guessedLetters);
        }
    }
    else {
        return;
    }
}

gameBody.addEventListener("keydown", keydownAction);

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
    console.log('line: 69' + str[0]);
    for(var i = 0; i <= str.length; i++) {
        if(str[i] == letter) {
            console.log("line: 71 searchString(): str[" + i + '] == ' + letter);
            indexs.push(i);
        }
    }
    console.log('searchString(): found letter: ' + letter + " at: " + indexs);

    return indexs;
}


// indexes is an array which contains the indjexes for the letters matching in guessword, and the key pressed

//
function replaceAt(indexes, letter, str) {
    console.log(str);
    console.log("replaceAt(): " + indexes);


    console.log("replateAt() our guessed letters: " + guessedLetters);

    //iterates through indexs replaces 
    for(var i = 0; i < indexes.length; i++) {

        console.log('line 95: replaceAt(): indexes[i] = ' + indexes[i] + ' letter = ' + letter);
        str[indexes[i]] = letter;

        console.log("line 98: " + str)
        
    }
    console.log("replateAt() our guessed letters: " + guessedLetters);
}

// console.log('test:' + searchString('a', 'javascript'));
// gameLoop();


// 
// function searchStringtest(letter, str) {
//     var indexs = [];
//     for(var i = 0; i < str.length; i++) {
//         if(str[i] === letter) {
//             indexs.push(i);
//         }
//     }
//     console.log('test: ' + indexs);

//     return indexs;
// }

// searchStringtest('a', 'javascript');