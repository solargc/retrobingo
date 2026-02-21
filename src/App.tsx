import {useState} from "react";
import BingoGrid from "./BingoGrid";
import type {BingoBoard} from "./types";
import "./App.css";

const GRID_SIZE = 5;
const MAX_NUMBER = 75
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
  return shuffle(ALL_NUMBERS);
}
