import React, { Component } from "react";
import Spot from "./Spot";
import './styles/Grid.css';
import { wallsCoords } from '../data'

class Grid extends Component {

  state = {
    grid: Array.from({ length: 10 }, _ => {
      return Array.from({ length: 10 }, _ => {
        return { f: Infinity, g: Infinity, isPath: false, isWall: false };
      });
    })
  }

  createNewGridFromState(grid) {
    return grid.map(col => {
      return col.map(spotProps => {
        return { ...spotProps };
      });
    })
  }

  componentDidMount = () => {
    this.setState(({ grid }) => {
      const newGrid = this.createNewGridFromState(grid);
      console.log(wallsCoords)
      for (let i = 0; i < wallsCoords.length; i += 2) {
        const x = wallsCoords[i];
        const y = wallsCoords[i + 1];
        newGrid[x][y].isWall = true;
      }
      return { grid: newGrid };
    })
  }

  render() {
    const { grid } = this.state;
    return (
      <div id="grid">
        {grid.map((col, i) => {
          return col.map((spotProps, j) => {
            return <Spot key={`${i}-${j}`} {...spotProps} i={i} j={j} />;
          });
        })}
      </div>
    );
  }

}

export default Grid;
