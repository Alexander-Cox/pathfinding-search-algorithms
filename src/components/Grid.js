import React, { Component } from "react";
import Spot from "./Spot";
import './styles/Grid.css';

class Grid extends Component {
  state = {
    grid: Array.from({ length: 10 }, (_, i) => {
      return Array.from({ length: 10 }, (_, j) => {
        return {};
      });
    })
  };
  render() {
    const { grid } = this.state;
    return (
      <div id="grid">
        {grid.map((col, i) => {
          return col.map((row, j) => {
            return <Spot i={i} j={j} styles={{}} />;
          });
        })}
      </div>
    );
  }
}

export default Grid;
