import {useState} from "react";
import BingoGrid from "./BingoGrid";
import type {BingoBoard} from "./types";
import "./App.css";

const GRID_SIZE = 3;
const MAX_NUMBER = 9;
const ALL_NUMBERS = Array.from({ length: MAX_NUMBER }, (_, i) => i + 1);
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;


function shuffleArray<T>(items: T[]): T[] {
  const shuffledItems = [...items];

  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = shuffledItems[i];
    shuffledItems[i] = shuffledItems[j];
    shuffledItems[j] = temp;
  }

  return shuffledItems;
}

function createBoard(): BingoBoard {
  const picked = shuffleArray(ALL_NUMBERS).slice(0, TOTAL_CELLS);
  const board: BingoBoard = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    board.push(
      picked.slice(row * GRID_SIZE, row * GRID_SIZE + GRID_SIZE).map((value) => ({
        value,
        marked: false,
      }))
    );
  }
  return board;
}

function createDeck(): number[] {
  return shuffleArray(ALL_NUMBERS);
}

function checkWin(board: BingoBoard): boolean {
  return board.every(row => row.every(cell => cell.marked));
}

function App() {
  const [board, setBoard] = useState<BingoBoard>(createBoard);
  const [deck, setDeck] = useState<number[]>(createDeck);
  const [drawnCard, setDrawnCard] = useState<number | null>(null);

  const hasWon = checkWin(board);

  function resetGame() {
    setBoard(createBoard());
    setDeck(createDeck());
    setDrawnCard(null);
  }

  function drawCard() {
    if (deck.length === 0 || hasWon) return;

    const [first, ...remaining] = deck;
    setDrawnCard(first);
    setDeck(remaining);
  }

  function handleCellClick(row: number, col: number) {
    const cell = board[row][col];

    if (cell.value !== drawnCard || cell.marked) return;

    const newBoard = board.map((rowArray, rowIndex) => {
      return rowArray.map((currentCell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...currentCell, marked: true };
        }
        return currentCell;
      });
    });

    setBoard(newBoard);
  }

  return (
    <div className="app">
      <h1>Bingo!</h1>

      {hasWon && <p className="win-message">You won!</p>}

      <div className="draw-area">
        <button onClick={drawCard} disabled={deck.length === 0 || hasWon}>
          Draw Card
        </button>
        <button onClick={resetGame}>New Game</button>
        {drawnCard !== null && (
          <span className="drawn-card">{drawnCard}</span>
        )}
        <p className="deck-count">{deck.length} cards remaining</p>
      </div>

      <BingoGrid board={board} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
