// import React, { useState } from 'react';
import '../css/node.css';

export default function Node({ type, name, position, setActiveTooltip, activeTooltip, id, currentPos}) {
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
  };

  const style = {
    position: "absolute",
    top: position.top,
    left: position.left,
  };

  return (
    <div
        className={`node ${type.toLowerCase()} ${activeTooltip === id ? 'node-tooltip active' : ''}`}
        style={style}
        data-name={name}
        onClick={handleNodeClick}
        id={id}
      >
      <div className={currentPos === id ? 'selectedNode' : ''}></div>
    </div>
  );
  
};
