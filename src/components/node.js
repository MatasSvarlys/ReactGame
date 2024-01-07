// import React, { useState } from 'react';
import '../css/node.css';

export default function Node({ type, name, position, setActiveTooltip, activeTooltip, id, currentPos, setPos, isConnected}) {
  if (!position) {
    console.error("one of the coordinates is undefined in node " + name);
    return;
  }

  const handleNodeClick = () => {
    if(activeTooltip === id){
      setActiveTooltip(null);
    }else{
      setActiveTooltip(id);
    }
  }

  const handleTravel = () => {
    setPos(id);
    console.log(currentPos);
  }

  const topValue = parseInt(position.top); // Convert to a number
  const styles = {
    node: {
      position: "absolute",
      top: topValue + "px",
      left: position.left,
    },
    tooltip: {
      position: "absolute",
      top: (topValue - 40) + "px",
      left: position.left,
    },
  };

  return (
    <>
      <div
        className={`node ${type.toLowerCase()}`}
        style={styles.node}
        onClick={handleNodeClick}
        id={id}
      >
        {currentPos === id && (
          <div className='selectedNode'></div>
        )}
      </div>

      {activeTooltip === id && (
        <div className={`tooltip ${isConnected ? 'hasButton' : ''}`} style={styles.tooltip}>
          <div className='text'>{name}</div>
          {/* why tf does it not work with simple button */}
          {isConnected && (
            <a className="button" onClick={handleTravel}>Travel here</a>
          )}
        </div>
      )}
    </>
  );
  
};
