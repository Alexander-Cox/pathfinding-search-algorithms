import React, { Component } from "react";
import Spot from "./Spot";
import './styles/Grid.css';
import { wallsCoords, goal, start } from '../data'
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

class Grid extends Component {

  state = {
    openSet: [],
    closedSet: [],
    grid: Array.from({ length: 10 }, (_, i) => {
      return Array.from({ length: 10 }, (_, j) => {
        return { f: undefined, g: undefined, isPath: false, isWall: false, i, j };
      });
    })
  }

  // createNewGridFromState(grid) {
  //   return grid.map(col => {
  //     return col.map(spotProps => {
  //       return { ...spotProps };
  //     });
  //   });
  // }

  assignNeighbours(grid) {
    return grid.map((col, i) => {
      return col.map((spotProps, j) => {
        const neighbours = [];
        if (i > 0) neighbours.push(grid[i - 1][j]);
        if (i < grid.length - 1) neighbours.push(grid[i + 1][j]);
        if (j > 0) neighbours.push(grid[i][j - 1]);
        if (j < col.length - 1) neighbours.push(grid[i][j + 1]);
        return { ...spotProps, neighbours };
      });
    });
  }

  componentDidMount = () => {
    //set up
    this.setState(({ grid }) => {
      const newGrid = cloneDeep(grid);
      // assign preset wall coords
      for (let i = 0; i < wallsCoords.length; i += 2) {
        const x = wallsCoords[i];
        const y = wallsCoords[i + 1];
        newGrid[x][y].isWall = true;
      }
      newGrid[start[0]][start[1]].isStart = true;
      newGrid[start[0]][start[1]].h = 0;
      newGrid[start[0]][start[1]].f = 0;
      newGrid[goal[0]][goal[1]].isGoal = true;
      const newerGrid = this.assignNeighbours(newGrid);
      const startNode = newerGrid[start[0]][start[1]];
      console.log(startNode)
      return { grid: newerGrid, openSet: [startNode] };
    })
  }

  dist_between(a, b) {
    const iDiff = Math.abs(a.i - b.i);
    const jDiff = Math.abs(a.j - b.j);
    return iDiff + jDiff;
  }

  iterateAStar = () => {
    const { openSet, closedSet, grid } = this.state;
    let clonedClosedSet = cloneDeep(closedSet);
    console.log('openSet', openSet)
    //normally a while loop
    if (openSet.length > 0) {
      console.log('openSet', openSet)
      console.log('iterating...')
      const clonedOpenSet = openSet//cloneDeep(openSet)
      console.log('clonedOpenSet', clonedOpenSet)
      const orderedOpenSet = clonedOpenSet.sort((nodeA, nodeB) => {
        return nodeA.f - nodeB.f
      });
      console.log('orderedOpenSet', orderedOpenSet)
      const current = orderedOpenSet[0];

      if (current.isGoal) {
        // if current is equal to goal WE'RE DONE

      } else {
        //remove current from openSet
        orderedOpenSet.shift()
        current.inOpenSet = false;
        clonedClosedSet.push(current);
        current.neighbours.forEach(neighbour => {
          for (let i = 0; i < clonedClosedSet; i++) {
            if (clonedClosedSet[i].i === neighbour.i && clonedClosedSet[i].j === neighbour.j) {
              //ignore any neighbours in closed set...
              return;
            }
          }
          const tentative_gScore = current.g + this.dist_between(current, neighbour);
          if (!neighbour.inOpenSet) {
            orderedOpenSet.push(neighbour);
          } else if (tentative_gScore >= neighbour.g) {
            neighbour.g = tentative_gScore;
            neighbour.cameFrom = current;
          }
          //set the state with the latest version of info
          //calculate current best available path
        })
      }
    } else {
      //It's not working
      console.log('No Solution Found!!!')
    }
  }

  reconstruct_path = () => {
    console.log('reconstructing path...')
  }

  render() {
    const { grid } = this.state;
    console.log(grid)
    return (
      <div>
        <div><input type="button" onClick={this.iterateAStar} value="Iterate A Star" /></div>
        <div id="grid">
          {grid.map((col, i) => {
            return col.map((spotProps, j) => {
              return <Spot key={`${i}-${j}`} {...spotProps} />;
            });
          })}
        </div>
      </div>

    );
  }

}

export default Grid;
