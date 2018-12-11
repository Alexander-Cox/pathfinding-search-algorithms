import React from 'react';
import './styles/Spot.css'

const Spot = (props) => {
    const { i, j, isWall, isPath } = props;
    function createStyles(i, j) {
        const styles = {
            gridColumnStart: i + 1,
            gridRowStart: j + 1
        }
        if (isWall) styles.backgroundColor = "Black";
        return styles;
    }
    return (
        <div className="spot" style={createStyles(i, j)}>

        </div>
    );
}

export default Spot;