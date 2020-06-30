import React from 'react';
import './styles/Spot.css'

const Spot = (props) => {
    const { i, j, g, h, f, isWall, isPath, isStart, isGoal, inOpenSet, inClosedSet } = props;
    function createStyles() {
        const styles = {
            gridColumnStart: i + 1,
            gridRowStart: j + 1
        }
        if (isWall) styles.backgroundColor = "Black";
        if (isStart || isGoal) styles.backgroundColor = "Blue";
        if (inOpenSet) styles.backgroundColor = "Green";
        if (inClosedSet) styles.backgroundColor = "Red";
        if (isPath) styles.backgroundColor = "Pink";
        return styles;
    }

    return !isWall ? (
        <div className="spot" style={createStyles()}>
            <div className="hScore">{`H: ${!h ? "∞" : h}`}</div>
            <div className="gScore">{`G: ${!g ? "∞" : g}`}</div>
            <div className="fScore">{`F: ${!f ? "∞" : f}`}</div>
        </div>)
        : (
            <div className="spot" style={createStyles()}>
            </div>);


}

export default Spot;