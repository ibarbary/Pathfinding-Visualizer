async function BreadthFirstSearch(
  grid,
  setGrid,
  startCell,
  endCell,
  gridRow,
  gridCol,
  speed
) {
  let delay;
  switch (speed) {
    case "Fast":
      delay = 10;
      break;
    case "Medium":
      delay = 200;
      break;
    case "Slow":
      delay = 400;
      break;
    default:
      delay = 10;
      break;
  }

  const visited = new Set();
  const queue = [[startCell.row, startCell.col]];
  const parentMap = new Map();
  visited.add(`${startCell.row},${startCell.col}`);

  let batchUpdates = [];
  const batchSize = 50;

  while (queue.length > 0) {
    let [currRow, currCol] = queue.shift();

    if (currRow === endCell.row && currCol === endCell.col) {
      if (batchUpdates.length > 0) {
        const newGrid = grid.slice();
        for (const [row, col] of batchUpdates) {
          newGrid[row][col].isVisited = true;
        }
        setGrid(newGrid);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const path = [];
      let current = `${currRow},${currCol}`;

      while (current !== `${startCell.row},${startCell.col}`) {
        const [prevRow, prevCol] = parentMap
          .get(current)
          .split(",")
          .map(Number);
        path.push([prevRow, prevCol]);
        current = `${prevRow},${prevCol}`;
      }

      path.pop();
      for (const [row, col] of path.reverse()) {
        const newGrid = grid.slice();
        newGrid[row][col].isPathToEnd = true;
        setGrid(newGrid);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }

      break;
    }

    if (
      currCol + 1 < gridCol &&
      !visited.has(`${currRow},${currCol + 1}`) &&
      !grid[currRow][currCol + 1].isWall
    ) {
      queue.push([currRow, currCol + 1]);
      visited.add(`${currRow},${currCol + 1}`);
      parentMap.set(`${currRow},${currCol + 1}`, `${currRow},${currCol}`);
    }

    if (
      currCol - 1 >= 0 &&
      !visited.has(`${currRow},${currCol - 1}`) &&
      !grid[currRow][currCol - 1].isWall
    ) {
      queue.push([currRow, currCol - 1]);
      visited.add(`${currRow},${currCol - 1}`);
      parentMap.set(`${currRow},${currCol - 1}`, `${currRow},${currCol}`);
    }

    if (
      currRow + 1 < gridRow &&
      !visited.has(`${currRow + 1},${currCol}`) &&
      !grid[currRow + 1][currCol].isWall
    ) {
      queue.push([currRow + 1, currCol]);
      visited.add(`${currRow + 1},${currCol}`);
      parentMap.set(`${currRow + 1},${currCol}`, `${currRow},${currCol}`);
    }

    if (
      currRow - 1 >= 0 &&
      !visited.has(`${currRow - 1},${currCol}`) &&
      !grid[currRow - 1][currCol].isWall
    ) {
      queue.push([currRow - 1, currCol]);
      visited.add(`${currRow - 1},${currCol}`);
      parentMap.set(`${currRow - 1},${currCol}`, `${currRow},${currCol}`);
    }

    batchUpdates.push([currRow, currCol]);

    if (batchUpdates.length >= batchSize) {
      const newGrid = grid.slice();
      for (const [row, col] of batchUpdates) {
        newGrid[row][col].isVisited = true;
      }
      setGrid(newGrid);
      batchUpdates = [];
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  if (batchUpdates.length > 0) {
        const newGrid = grid.slice();
        for (const [row, col] of batchUpdates) {
          newGrid[row][col].isVisited = true;
        }
        setGrid(newGrid);
        await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function DepthFirstSearch(
  grid,
  setGrid,
  startCell,
  endCell,
  currRow,
  currCol,
  gridRow,
  gridCol,
  speed,
  visited,
  parentMap,
  foundEnd,
  setFoundEnd
) {
  if (foundEnd) return;

  let delay;
  switch (speed) {
    case "Fast":
      delay = 10;
      break;
    case "Medium":
      delay = 50;
      break;
    case "Slow":
      delay = 100;
      break;
    default:
      delay = 10;
      break;
  }

  if (currRow === endCell.row && currCol === endCell.col) {
    const path = [];
    let current = `${currRow},${currCol}`;

    while (current !== `${startCell.row},${startCell.col}`) {
      const [prevRow, prevCol] = parentMap.get(current).split(",").map(Number);
      path.push([prevRow, prevCol]);
      current = `${prevRow},${prevCol}`;
    }

    path.pop();
    for (const [row, col] of path.reverse()) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      const newGrid = grid.slice();
      newGrid[row][col].isPathToEnd = true;
      setGrid(newGrid);
    }

    setFoundEnd(true);
    return;
  }

  visited.add(`${currRow},${currCol}`);

  const newGrid = grid.slice();
  newGrid[currRow][currCol].isVisited = true;
  setGrid(newGrid);

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );

  if (
    currCol + 1 < gridCol &&
    !visited.has(`${currRow},${currCol + 1}`) &&
    !grid[currRow][currCol + 1].isWall
  ) {
    parentMap.set(`${currRow},${currCol + 1}`, `${currRow},${currCol}`);
    await DepthFirstSearch(
      grid,
      setGrid,
      startCell,
      endCell,
      currRow,
      currCol + 1,
      gridRow,
      gridCol,
      speed,
      visited,
      parentMap
    );
  }

  if (
    currRow + 1 < gridRow &&
    !visited.has(`${currRow + 1},${currCol}`) &&
    !grid[currRow + 1][currCol].isWall
  ) {
    parentMap.set(`${currRow + 1},${currCol}`, `${currRow},${currCol}`);
    await DepthFirstSearch(
      grid,
      setGrid,
      startCell,
      endCell,
      currRow + 1,
      currCol,
      gridRow,
      gridCol,
      speed,
      visited,
      parentMap
    );
  }

  if (
    currCol - 1 >= 0 &&
    !visited.has(`${currRow},${currCol - 1}`) &&
    !grid[currRow][currCol - 1].isWall
  ) {
    parentMap.set(`${currRow},${currCol - 1}`, `${currRow},${currCol}`);
    await DepthFirstSearch(
      grid,
      setGrid,
      startCell,
      endCell,
      currRow,
      currCol - 1,
      gridRow,
      gridCol,
      speed,
      visited,
      parentMap
    );
  }

  if (
    currRow - 1 >= 0 &&
    !visited.has(`${currRow - 1},${currCol}`) &&
    !grid[currRow - 1][currCol].isWall
  ) {
    parentMap.set(`${currRow - 1},${currCol}`, `${currRow},${currCol}`);
    await DepthFirstSearch(
      grid,
      setGrid,
      startCell,
      endCell,
      currRow - 1,
      currCol,
      gridRow,
      gridCol,
      speed,
      visited,
      parentMap
    );
  }
}

async function Dijkstra(
  grid,
  setGrid,
  startCell,
  endCell,
  gridRow,
  gridCol,
  speed
) {
  let delay;
  switch (speed) {
    case "Fast":
      delay = 10;
      break;
    case "Medium":
      delay = 200;
      break;
    case "Slow":
      delay = 400;
      break;
    default:
      delay = 10;
      break;
  }

  const visited = new Set();
  const cellArray = [[startCell.row, startCell.col]];
  const cellCostToVisitFromStart = new Map();
  const parentMap = new Map();
  cellCostToVisitFromStart.set(`${startCell.row},${startCell.col}`, 0);

  let batchUpdates = [];
  const batchSize = 50;

  while (cellArray.length > 0) {
    let minIndex = 0;

      for (let i = 1; i < cellArray.length; i++) {
        if (
          cellCostToVisitFromStart.get(
            `${cellArray[i][0]},${cellArray[i][1]}`
          ) <
          cellCostToVisitFromStart.get(
            `${cellArray[minIndex][0]},${cellArray[minIndex][1]}`
          )
        ) {
          minIndex = i;
        }
      }
    

    const [currRow, currCol] = cellArray[minIndex];
    const currCellCost = cellCostToVisitFromStart.get(`${currRow},${currCol}`);
    cellArray.splice(minIndex, 1);

    visited.add(`${currRow},${currCol}`);
    batchUpdates.push([currRow, currCol]);

    if (`${currRow},${currCol}` === `${endCell.row},${endCell.col}`) {
      if (batchUpdates.length > 0) {
        const newGrid = grid.slice();
        for (const [row, col] of batchUpdates) {
          newGrid[row][col].isVisited = true;
        }
        setGrid(newGrid);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const path = [];
      let current = `${currRow},${currCol}`;

      while (current !== `${startCell.row},${startCell.col}`) {
        const [prevRow, prevCol] = parentMap
          .get(current)
          .split(",")
          .map(Number);
        path.push([prevRow, prevCol]);
        current = `${prevRow},${prevCol}`;
      }

      path.pop();
      for (const [row, col] of path.reverse()) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        const newGrid = grid.slice();
        newGrid[row][col].isPathToEnd = true;
        setGrid(newGrid);
      }

      return;
    }

    if (
      currCol + 1 < gridCol &&
      !visited.has(`${currRow},${currCol + 1}`) &&
      !grid[currRow][currCol + 1].isWall
    ) {
      const newCost = currCellCost + grid[currRow][currCol + 1].value;
      if (
        !cellCostToVisitFromStart.has(`${currRow},${currCol + 1}`) ||
        newCost < cellCostToVisitFromStart.get(`${currRow},${currCol + 1}`)
      ) {
        cellCostToVisitFromStart.set(`${currRow},${currCol + 1}`, newCost);
        parentMap.set(`${currRow},${currCol + 1}`, `${currRow},${currCol}`);
        cellArray.push([currRow, currCol + 1]);
      }
    }

    if (
      currCol - 1 >= 0 &&
      !visited.has(`${currRow},${currCol - 1}`) &&
      !grid[currRow][currCol - 1].isWall
    ) {
      const newCost = currCellCost + grid[currRow][currCol - 1].value;
      if (
        !cellCostToVisitFromStart.has(`${currRow},${currCol - 1}`) ||
        newCost < cellCostToVisitFromStart.get(`${currRow},${currCol - 1}`)
      ) {
        cellCostToVisitFromStart.set(`${currRow},${currCol - 1}`, newCost);
        parentMap.set(`${currRow},${currCol - 1}`, `${currRow},${currCol}`);
        cellArray.push([currRow, currCol - 1]);
      }
    }

    if (
      currRow + 1 < gridRow &&
      !visited.has(`${currRow + 1},${currCol}`) &&
      !grid[currRow + 1][currCol].isWall
    ) {
      const newCost = currCellCost + grid[currRow + 1][currCol].value;
      if (
        !cellCostToVisitFromStart.has(`${currRow + 1},${currCol}`) ||
        newCost < cellCostToVisitFromStart.get(`${currRow + 1},${currCol}`)
      ) {
        cellCostToVisitFromStart.set(`${currRow + 1},${currCol}`, newCost);
        parentMap.set(`${currRow + 1},${currCol}`, `${currRow},${currCol}`);
        cellArray.push([currRow + 1, currCol]);
      }
    }

    if (
      currRow - 1 >= 0 &&
      !visited.has(`${currRow - 1},${currCol}`) &&
      !grid[currRow - 1][currCol].isWall
    ) {
      const newCost = currCellCost + grid[currRow - 1][currCol].value;
      if (
        !cellCostToVisitFromStart.has(`${currRow - 1},${currCol}`) ||
        newCost < cellCostToVisitFromStart.get(`${currRow - 1},${currCol}`)
      ) {
        cellCostToVisitFromStart.set(`${currRow - 1},${currCol}`, newCost);
        parentMap.set(`${currRow - 1},${currCol}`, `${currRow},${currCol}`);
        cellArray.push([currRow - 1, currCol]);
      }
    }

    if (batchUpdates.length >= batchSize) {
      const newGrid = grid.slice();
      for (const [row, col] of batchUpdates) {
        newGrid[row][col].isVisited = true;
      }
      setGrid(newGrid);
      batchUpdates = [];
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  if (batchUpdates.length > 0) {
        const newGrid = grid.slice();
        for (const [row, col] of batchUpdates) {
          newGrid[row][col].isVisited = true;
        }
        setGrid(newGrid);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
}

export { BreadthFirstSearch, DepthFirstSearch, Dijkstra };
