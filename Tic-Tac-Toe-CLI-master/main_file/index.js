#!/usr/bin/env node

// Required modules
var prompt = require('prompt');
var colors = require('colors');

// Initialize the game board
var board = {
   1: ' ',
   2: ' ',
   3: ' ',
   4: ' ',
   5: ' ',
   6: ' ',
   7: ' ',
   8: ' ',
   9: ' '
};

// Function to update the board with a player's move
function makeBoard(position, mark) {
  board[position] = mark.toUpperCase();
}

// Function to print the current state of the board to the console
function printBoard() {
  console.log(colors.green.bold(
    '\n' +
    '                             ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
    '                             ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
    '                             ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n'
  ));
}

// Function to check if a value is an integer
function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

// Function to validate a player's move
function validate(position) {
  return (isInt(position) && board[position] === ' ');
}

// Win combinations on the board
var winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

// Function to check if a player has won
function checkwin(player) {
  for (var i = 0; i < winCombinations.length; i++) {
    var mark = 0, count = 0;
    for (var j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        mark++;
      }
      if (mark === 3) {
        count++;
        if (count === 0) {
          console.log(colors.green.bold('Game Tie'));
          return;
        }
        return true;
      }
    }
  }
  return false;
}

// Function to handle a player's turn
function playerTurn(player) {
  console.log('Your turn player: ', player);
  prompt.start();
  prompt.get(['position'], function (err, res) {
    if (validate(res.position) === true) {
      makeBoard(res.position, player);
      printBoard();
      if (checkwin(player) === true) {
        console.log(colors.green.bold('Winner Winner!!'));
        return;
      }
      // Switch to the other player's turn
      if (player === 'X') {
        playerTurn('O');
      } else {
        playerTurn('X');
      }
    } else {
      console.log(colors.green.bold('Incorrect input, please try again.'));
      playerTurn(player);
    }
  });
}

// Start the game
console.log(colors.green.bold('Game started : \n' +
  '                              1 | 2 | 3 \n' +
  '                              4 | 5 | 6 \n' +
  '                              7 | 8 | 9 \n'));
playerTurn('X');
