import { useContext } from "react";
import { GlobalContext } from "../Context";
import "./Grid.css";

function Grid() {
  const {
    grid,
    setGrid,
    gridRow,
    isMouseDown,
    setIsMouseDown,
    gridCol,
    startCell,
    endCell,
    searching,
  } = useContext(GlobalContext);

  const handleMouseDown = (rowIndex, colIndex) => {
    if (
      searching ||
      (rowIndex == startCell.row && colIndex == startCell.col) ||
      (rowIndex == endCell.row && colIndex == endCell.col)
    )
      return;

    const newGrid = grid.slice();
    newGrid[rowIndex][colIndex].isWall = !newGrid[rowIndex][colIndex].isWall;
    setGrid(newGrid);
    setIsMouseDown(true);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (
      (rowIndex == startCell.row && colIndex == startCell.col) ||
      (rowIndex == endCell.row && colIndex == endCell.col)
    )
      return;

    if (isMouseDown) {
      const newGrid = grid.slice();
      newGrid[rowIndex][colIndex].isWall = !newGrid[rowIndex][colIndex].isWall;
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="grid"
      onMouseUp={handleMouseUp}
      style={{
        gridTemplateRows: `repeat(${gridRow}, 1fr)`,
        gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <div
              className="cell"
              key={`${rowIndex},${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
              style={{
                background:
                  `${rowIndex},${colIndex}` ===
                  `${startCell.row},${startCell.col}`
                    ? "green"
                    : `${rowIndex},${colIndex}` ===
                      `${endCell.row},${endCell.col}`
                    ? "red"
                    : cell.isWall
                    ? "#022433"
                    : "",

                color:
                  `${rowIndex},${colIndex}` ===
                  `${startCell.row},${startCell.col}`
                    ? "green"
                    : `${rowIndex},${colIndex}` ===
                      `${endCell.row},${endCell.col}`
                    ? "red"
                    : cell.isWall
                    ? "#022433"
                    : "",

                animation: cell.isPathToEnd
                  ? "path-animation ease-out alternate forwards"
                  : cell.isVisited &&
                    !(
                      rowIndex === startCell.row && colIndex === startCell.col
                    ) &&
                    !(rowIndex === endCell.row && colIndex === endCell.col)
                  ? "cell-animation .5s ease-out alternate forwards"
                  : cell.isWall
                  ? "wall-animation ease-out alternate forwards"
                  : "",

                borderColor:
                  `${rowIndex},${colIndex}` ===
                  `${startCell.row},${startCell.col}`
                    ? "green"
                    : `${rowIndex},${colIndex}` ===
                      `${endCell.row},${endCell.col}`
                    ? "red"
                    : cell.isWall
                    ? "rgb(6, 19, 31)"
                    : "",
              }}
            >
              {cell.value}
            </div>
          );
        });
      })}
    </div>
  );
}
export default Grid;
