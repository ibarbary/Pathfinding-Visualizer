async function RandomMaze(grid, setGrid, startCell, endCell, gridRow, gridCol) {
  let gridSize = (gridRow * gridCol) / 3;

  const newGrid = grid.slice();
  for (let i = 0; i < gridSize; ++i) {
    const randomRow = Math.floor(Math.random() * gridRow);
    const randomCol = Math.floor(Math.random() * gridCol);

    newGrid[randomRow][randomCol].isWall = true;
    newGrid[randomRow][randomCol].value = null;
  }

  newGrid[startCell.row][startCell.col].isWall = false;
  newGrid[endCell.row][endCell.col].isWall = false;

  setGrid(newGrid);
}

function VerticalDivisionMaze(
  grid,
  setGrid,
  startCell,
  endCell,
  gridRow,
  gridCol
) {
  const newGrid = grid.slice();

  for (let col = Math.floor(Math.random() * 2); col < gridCol; col = col + 2) {
    const openCell = Math.floor(Math.random() * gridRow);

    for (let row = 0; row < gridRow; ++row) {
      if (row != openCell) {
        newGrid[row][col].isWall = true;
        newGrid[row][col].value = null;
      }
    }
  }

  newGrid[startCell.row][startCell.col].isWall = false;
  newGrid[endCell.row][endCell.col].isWall = false;

  setGrid(newGrid);
}

function HorizontalDivisionMaze(
  grid,
  setGrid,
  startCell,
  endCell,
  gridRow,
  gridCol
) {
  const newGrid = grid.slice();

  for (let row = Math.floor(Math.random() * 2); row < gridRow; row = row + 2) {
    const openCell = Math.floor(Math.random() * gridCol);

    for (let col = 0; col < gridCol; ++col) {
      if (col != openCell) {
        newGrid[row][col].isWall = true;
        newGrid[row][col].value = null;
      }
    }
  }

  newGrid[startCell.row][startCell.col].isWall = false;
  newGrid[endCell.row][endCell.col].isWall = false;

  setGrid(newGrid);
}

export { RandomMaze, VerticalDivisionMaze, HorizontalDivisionMaze };
