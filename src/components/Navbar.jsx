import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context";
import {
  BreadthFirstSearch,
  DepthFirstSearch,
  Dijkstra,
} from "./searchAlgorithms";
import {
  RandomMaze,
  VerticalDivisionMaze,
  HorizontalDivisionMaze,
} from "./mazeAlgorithms";
import "./Navbar.css";

function Navbar() {
  const {
    grid,
    setGrid,
    setClear,
    startCell,
    endCell,
    gridRow,
    gridCol,
    speed,
    setSpeed,
    maze,
    setMaze,
    searchAlgorithm,
    setSearchAlgorithm,
    searching,
    setSearching,
    foundEnd,
    setFoundEnd,
    setClearMaze,
    buildNewMaze,
    setBuildNewMaze,
    setClearGrid,
    startSearch,
    setStartSearch,
    setIsMouseDown,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (buildNewMaze) {
      buildMaze();
      setBuildNewMaze(false);
    }
  }, [buildNewMaze]);

  useEffect(() => {
    if (startSearch) {
      search();
      setStartSearch(false);
    }
  }, [startSearch]);

  async function search() {
    setSearching(true);

    try {
      if (
        searchAlgorithm == "BreadthFirstSearch" ||
        searchAlgorithm == "null"
      ) {
        await BreadthFirstSearch(
          grid,
          setGrid,
          startCell,
          endCell,
          gridRow,
          gridCol,
          speed
        );
      } else if (searchAlgorithm == "DepthFirstSearch") {
        const visited = new Set();
        const parentMap = new Map();
        const currRow = startCell.row;
        const currCol = startCell.col;
        await DepthFirstSearch(
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
        );
      } else if (searchAlgorithm == "Dijkstra") {
        await Dijkstra(
          grid,
          setGrid,
          startCell,
          endCell,
          gridRow,
          gridCol,
          speed
        );
      }
    } finally {
      setSearching(false);
    }
  }

  function buildMaze() {
    if (maze == "RandomMaze" || maze == "null") {
      RandomMaze(grid, setGrid, startCell, endCell, gridRow, gridCol);
    } else if (maze == "VerticalDivisionMaze") {
      VerticalDivisionMaze(grid, setGrid, startCell, endCell, gridRow, gridCol);
    } else if (maze == "HorizontalDivisionMaze") {
      HorizontalDivisionMaze(
        grid,
        setGrid,
        startCell,
        endCell,
        gridRow,
        gridCol
      );
    }
  }

  return (
    <div
      className="navbar"
      onMouseUp={() => {
        setIsMouseDown(false);
      }}
    >
      <select
        name="searchAlgorithms"
        id="searchAlgorithms"
        value={searchAlgorithm}
        disabled={searching}
        onChange={(e) => {
          setSearchAlgorithm(e.target.value);
        }}
      >
        <option value={"null"} style={{ display: "none" }} disabled>
          Search Algorithm
        </option>
        <option value="BreadthFirstSearch">Breadth First Search</option>
        <option value="DepthFirstSearch">Depth First Search</option>
        <option value="Dijkstra">Dijkstra Algorithm</option>
      </select>

      <select
        name="maze"
        id="maze"
        value={maze}
        disabled={searching}
        onChange={(e) => {
          setMaze(e.target.value);
        }}
      >
        <option value={"null"} style={{ display: "none" }} disabled>
          Maze
        </option>
        <option value="RandomMaze">Random Maze</option>
        <option value="VerticalDivisionMaze">Vertical Division Maze</option>
        <option value="HorizontalDivisionMaze">Horizontal Division Maze</option>
      </select>

      <select
        name="speed"
        id="speed"
        value={speed}
        disabled={searching}
        onChange={(e) => {
          setSpeed(e.target.value);
        }}
      >
        <option value="null" style={{ display: "none" }} disabled>
          Speed
        </option>
        <option value="Fast">Fast</option>
        <option value="Medium">Medium</option>
        <option value="Slow">Slow</option>
      </select>

      <button
        className="search"
        disabled={searching}
        style={{ opacity: searching ? 0.5 : 1 }}
        onClick={() => {
          setClearGrid(true);
        }}
      >
        Search
      </button>

      <button
        className="buildMaze"
        disabled={searching}
        style={{ opacity: searching ? 0.5 : 1 }}
        onClick={() => {
          setClearMaze(true);
        }}
      >
        Build Maze
      </button>

      <button
        className="clear"
        disabled={searching}
        style={{ opacity: searching ? 0.5 : 1 }}
        onClick={() => {
          setClear(true);
        }}
      >
        Clear
      </button>
    </div>
  );
}
export default Navbar;
