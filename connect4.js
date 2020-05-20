/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push(Array(WIDTH));
  }
}

function fillTopRow(){
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  return top
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.querySelector("#board");

  // TODO: create top row elements and append to 'board'
  
  htmlBoard.append(fillTopRow());

  // TODO: create html board matrix with nested loop and give each cell unique id
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  if (board[0][x] >= 0) return null;
  for (let i in board) {
    if (board[i][x] >= 0) return i - 1;
  }
  return HEIGHT - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let played = document.createElement("div");
  played.classList.add("piece", currPlayer);

  let here = document.getElementById(`${y}-${x}`);
  here.append(played);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(`${msg}`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;

  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} Wins!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if (!board[0].includes(undefined)) {
    // return endGame('This game is a tie')
    return endGame("this game is a tie");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = 1 - currPlayer;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //check to see if every cell fits within the board matrix and is the color of the current player
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //nested for loops to check each node in the board matrix
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //will evaluate 4 nodes vertically up from reference node
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //will evaluate 4 nodes horizontally to the right from reference node
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //will evaluate 4 nodes diagonally from reference node up and to the right
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //will evaluate 4 nodes diagonally from reference node up and to the left
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      //if any _win functions return positive. there is a winner
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
