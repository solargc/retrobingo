import type { BingoBoard } from "./types";

type BingoGridProps = {
  board: BingoBoard;
  onCellClick: (row: number, col: number) => void;
};

function BingoGrid({ board, onCellClick }: BingoGridProps) {
  return (
    <table className="bingo-grid">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                className={cell.marked ? "marked" : ""}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                <img src={cell.value} alt="bingo icon" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BingoGrid;
