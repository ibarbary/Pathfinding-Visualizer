import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

function Context({ children }) {
  const [searchAlgorithm, setSearchAlgorithm] = useState("null");
  const [maze, setMaze] = useState("null");
  const [clearMaze, setClearMaze] = useState(false);
  const [buildNewMaze, setBuildNewMaze] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [searching, setSearching] = useState(false);
  const [speed, setSpeed] = useState("null");
  const [clear, setClear] = useState(false);
  const [clearGrid, setClearGrid] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [foundEnd, setFoundEnd] = useState(false);
  const gridRow = 40;
  const gridCol = 50;
  const [grid, setGrid] = useState(createGrid(gridRow, gridCol));

  useEffect(() => {
    if (clear) {
      setGrid(createGrid(gridRow, gridCol));
      setSearchAlgorithm("null");
      setMaze("null");
      setSpeed("null");
      setSearching(false);
      setFoundEnd(false);
      setClear(false);
    }
  }, [clear]);

  useEffect(() => {
    if (clearMaze) {
      setGrid(createGrid(gridRow, gridCol));
      setFoundEnd(false);
      setClearMaze(false);
      setBuildNewMaze(true);
    }
  }, [clearMaze]);

  useEffect(() => {
    if (searchAlgorithm === "Dijkstra")
      setGrid(
        grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: false,
            isPathToEnd: false,
            value: Math.floor(Math.random() * 9) + 1,
          }))
        )
      );
    else
      setGrid(
        grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            isVisited: false,
            isPathToEnd: false,
            value: null,
          }))
        )
      );
    setFoundEnd(false);
  }, [searchAlgorithm]);

  useEffect(() => {
    if (clearGrid) {
      setGrid(
        grid.map((row) =>
          row.map((cell) => ({ ...cell, isVisited: false, isPathToEnd: false }))
        )
      );
      setClearGrid(false);
      setStartSearch(true);
    }
  }, [clearGrid]);

  function createGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          row,
          col,
          isVisited: false,
          isPathToEnd: false,
          isWall: false,
          value:
            searchAlgorithm === "Dijkstra"
              ? Math.floor(Math.random() * 9) + 1
              : null,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  const startCell = {
    row: 10,
    col: 5,
  };
  const endCell = {
    row: 30,
    col: 45,
  };

  return (
    <GlobalContext.Provider
      value={{
        searchAlgorithm,
        setSearchAlgorithm,
        maze,
        setMaze,
        isMouseDown,
        setIsMouseDown,
        searching,
        setSearching,
        speed,
        setSpeed,
        clear,
        setClear,
        grid,
        setGrid,
        gridRow,
        gridCol,
        startCell,
        endCell,
        foundEnd,
        setFoundEnd,
        clearMaze,
        setClearMaze,
        buildNewMaze,
        setBuildNewMaze,
        clearGrid,
        setClearGrid,
        startSearch,
        setStartSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
export default Context;
