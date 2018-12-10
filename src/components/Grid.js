import React, { Component } from "react";
import Spot from "./Spot";
import './styles/Grid.css';

class Grid extends Component {
  state = {
    grid: Array.from({ length: 10 }, (_, i) => {
      return Array.from({ length: 10 }, (_, j) => {
        return { f: Infinity, g: Infinity };
      });
    })
  };
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
