import React from 'react';
import './styles/Spot.css'

const Spot = (props) => {
    const { i, j } = props;
    function createStyles(i, j) {
        return {
            gridColumnStart: i + 1,
                gridRowStart: j + 1
              }
    }
    return ( 
        <div className="spot" style={createStyles(i,j)}>
            
        </div>
     );
}
 
export default Spot;