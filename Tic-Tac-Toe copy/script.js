//Create a 2D array 2x9 (2 rows by 9 columns)
//First row stores 'X' or 'O'
//Second row stores the ID's
var elements2D = new Array(9);
var winCombo = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var current = 'X';
var moveCounter = 0;
var answerDiv = document.querySelector("#winner");
var gameOn = true;
var restartButton = document.createElement('button');
restartButton.innerHTML = "Restart";
restartButton.addEventListener("click",clear);


//resets everything
function clear() {
    console.log("Clicked");
    var temp;
    moveCounter = 0;
    current = 'X';
    gameOn = true;
    answerDiv.innerHTML = "";
    for (var i = 0; i < elements2D.length; i++) {
        if (elements2D[i] != undefined) {
            temp = document.querySelector(convertNumberToWord(i));
            temp.innerHTML = "";
            elements2D[i] = undefined;
        }
    }
    console.log(elements2D,moveCounter,gameOn);

} //end of clear

function render(ele) {

    var recievedElementId = ele.id;
    var index = convertWordToNumber(recievedElementId);
    //    Checks if the button has not been clicked yet
    if (elements2D[index] == undefined && gameOn) {
        moveCounter++;
        //    Assign the array the value
        elements2D[index] = current;
        //    Add a '#' in order to properly use querySelectior
        recievedElementId = '#' + recievedElementId;
        //        Update the display
        var recievedElementText = document.querySelector(recievedElementId);
        recievedElementText.innerHTML = current;
        if (current == 'X')
            current = 'O';
        else
            current = 'X';

        checkForWinner();
        if (moveCounter < 9 && gameOn) {
            computerMove();
        }
    }

} // end of render()

function checkForWinner() {
    var j = 0;
    for (var i = 0; i < 9; i += 3, j++) {
        if (
            // Checks for horizontal win
            (elements2D[i] == 'X' &&
                elements2D[i + 1] == 'X' &&
                elements2D[i + 2] == 'X') ||
            // Checks for vertical win
            (elements2D[j] == 'X' &&
                elements2D[j + 3] == 'X' &&
                elements2D[j + 6] == 'X')) {
            answerDiv.innerHTML = "X's WON!";
            answerDiv.appendChild(restartButton);
            gameOn = false;

        } else if (
            // Checks for horizontal win
            (elements2D[i] == 'O' &&
                elements2D[i + 1] == 'O' &&
                elements2D[i + 2] == 'O') ||
            // Checks for vertical win
            (elements2D[j] == 'O' &&
                elements2D[j + 3] == 'O' &&
                elements2D[j + 6] == 'O')) {
            answerDiv.innerHTML = "O's WON!";
            answerDiv.appendChild(restartButton);
            gameOn = false;
        }
    }

    if ((elements2D[0] == 'X' &&
            elements2D[4] == 'X' &&
            elements2D[8] == 'X') ||
        (elements2D[2] == 'X' &&
            elements2D[4] == 'X' &&
            elements2D[6] == 'X')) {
        answerDiv.innerHTML = "X's WON!";
        answerDiv.appendChild(restartButton);
        gameOn = false;

    } else if ((elements2D[0] == 'O' &&
            elements2D[4] == 'O' &&
            elements2D[8] == 'O') ||
        (elements2D[2] == 'O' &&
            elements2D[4] == 'O' &&
            elements2D[6] == 'O')) {
        answerDiv.innerHTML = "O's WON!";
        answerDiv.appendChild(restartButton);
        gameOn = false;
    } else if (moveCounter == 9) {
        answerDiv.innerHTML = "It was a tie!";
        answerDiv.appendChild(restartButton);
        gameOn = false;
    }


} //end of checkForWinner()

function computerMove() {
    moveCounter++;
    var randomLocation = 4;

    if (preventLosing() != undefined && !willWin()) {
        randomLocation = preventLosing();
    } else if (moveCounter > 2 && tryWin() != undefined) {
        randomLocation = tryWin();
    } else {
        while (elements2D[randomLocation] != undefined) {
            randomLocation = Math.floor(Math.random() * 9);
            console.log(randomLocation);
        }
    }
    //        Assign the array the value
    elements2D[randomLocation] = current;
    console.log(randomLocation);
    //        Update the display
    var randomElement = document.querySelector(convertNumberToWord(randomLocation));
    randomElement.innerHTML = current;
    if (current == 'X')
        current = 'O';
    else
        current = 'X';

    checkForWinner();
}

function convertNumberToWord(num) {
    var tempArr = ['#zero', '#one', '#two', '#three', '#four', '#five', '#six', '#seven', '#eight'];
    return tempArr[num];
}

function convertWordToNumber(word) {
    var tempArr = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    return tempArr.indexOf(word);
}

function preventLosing() {
    var possibleCombination = [0, 0, 0, 0, 0, 0, 0, 0];
    var mustMove;
    for (i = 0; i < elements2D.length; i++) {
        if (elements2D[i] == "X") {
            for (var j = 0; j < winCombo.length; j++) {
                if (winCombo[j].indexOf(i) != -1) {
                    possibleCombination[j]++;
                }
                if (possibleCombination[j] == 2) {
                    for (var x = 0; x < 3; x++) {
                        if (elements2D[winCombo[j][x]] == undefined) {
                            return winCombo[j][x];
                        }
                    }
                }


            } // end of inner loop
        } // end of first if

    } // end of outer loop
}

function tryWin() {
    var possibleCombination = [0, 0, 0, 0, 0, 0, 0, 0];
    var mustMove;
    for (i = 0; i < elements2D.length; i++) {
        if (elements2D[i] == "O") {
            for (var j = 0; j < winCombo.length; j++) {
                if (winCombo[j].indexOf(i) != -1) {
                    possibleCombination[j]++;
                }
                if (possibleCombination[j] == 2) {
                    for (var z = 0; z < 3; z++) {
                        if (elements2D[winCombo[j][z]] == undefined) {
                            return winCombo[j][z];
                        }
                    }
                } else if (possibleCombination[j] == 1) {
                    for (var x = 0; x < 3; x++) {
                        if (elements2D[winCombo[j][x]] == "X") {
                            break;

                        }
                        if (elements2D[winCombo[j][x]] == undefined) {
                            mustMove = winCombo[j][x];
                        }
                    }
                }

            } // end of inner loop
        } // end of first if

    } // end of outer loop
    return mustMove;
}

function willWin() {
    var possibleCombination = [0, 0, 0, 0, 0, 0, 0, 0];
    var mustMove;
    for (i = 0; i < elements2D.length; i++) {
        if (elements2D[i] == "O") {
            for (var j = 0; j < winCombo.length; j++) {
                if (winCombo[j].indexOf(i) != -1) {
                    possibleCombination[j]++;
                }
                if (possibleCombination[j] == 2) {
                    for (var x = 0; x < 3; x++) {
                        if (elements2D[winCombo[j][x]] == undefined) {
                            return true;
                        }
                    }
                }

            } // end of inner loop
        } // end of first if
    }
    return false;
}
