import {useState} from "react";
import BingoGrid from "./BingoGrid";
import type {BingoBoard} from "./types";
import "./App.css";

const GRID_SIZE = 5;
const MAX_NUMBER = 25

const CELLS_NEEDED = GRID_SIZE * GRID_SIZE;
