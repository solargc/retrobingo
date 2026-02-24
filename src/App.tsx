import {useState} from "react";
import BingoGrid from "./BingoGrid";
import Confetti from "./Confetti";
import type {BingoBoard} from "./types";
import "./App.css";

const iconModules = import.meta.glob<{ default: string }>(
  "./assets/collection/*.jpg",
  { eager: true }
);

const ALL_ICONS: string[] = Object.values(iconModules).map((m) => m.default);

const GRID_SIZE = 3;
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
  const picked = shuffleArray(ALL_ICONS).slice(0, TOTAL_CELLS);
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

function createDeck(): string[] {
  return shuffleArray(ALL_ICONS);
}

function createGameState(): { board: BingoBoard; deck: string[] } {
  const board = createBoard();
  const deck = createDeck();
  return { board, deck };
}

function checkWin(board: BingoBoard): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    if (board[row].every((cell) => cell.marked)) return true;
  }

  for (let col = 0; col < GRID_SIZE; col++) {
    if (board.every((row) => row[col].marked)) return true;
  }

  if (board.every((row, i) => row[i].marked)) return true;
  if (board.every((row, i) => row[GRID_SIZE - 1 - i].marked)) return true;

  return false;
}

const INITIAL_STATE = createGameState();

function App() {

  const [board, setBoard] = useState<BingoBoard>(INITIAL_STATE.board);
  const [deck, setDeck] = useState<string[]>(INITIAL_STATE.deck);
  const [drawnCard, setDrawnCard] = useState<string | null>(null);

  const hasWon = checkWin(board);

  function resetGame() {
    const state = createGameState();
    setBoard(state.board);
    setDeck(state.deck);
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
      <h1 className={hasWon ? "won" : ""}>{hasWon ? "You won!" : "RetroBingo!"}</h1>

      {hasWon && <Confetti />}

      <div className="draw-area">
        <div className="buttons">
          <button onClick={drawCard} disabled={deck.length === 0 || hasWon}>
            Draw Card
          </button>
          <button onClick={resetGame}>New Game</button>
        </div>
        {drawnCard !== null && (
          <div className={`drawn-card${board.flat().some((c) => c.value === drawnCard && c.marked) ? " found" : ""}`}>
            <img src={drawnCard} alt="drawn icon" />
          </div>
        )}
        <p className="deck-count">{deck.length} cards remaining</p>
      </div>

      <BingoGrid board={board} onCellClick={handleCellClick} />

    </div>
  );
}

export default App;
