import '../css/mapDisplay.css'
import React, { useState, useEffect } from 'react';
import Node from './node'
import PolygonVisualTesting from './polygonVisualTesting';

export default function MapDisplay({nodes, polygons}){
    const [displayedNodes, setDisplayedNodes] = useState([]);
    const [activeTooltip, setActiveTooltip] = useState(null);

    useEffect(() => {
        //update the displayed nodes whenever nodes change
        setDisplayedNodes(nodes);
        setActiveTooltip(null);
    }, [nodes]);

    return(
        <>
            {/* <div className='top1'/>
            <div className='top2'/>
            <div className='mid'/>
            <div className='bot1'/>
            <div className='bot2'/> */}
            {displayedNodes.map((node, index) => (
                <Node
                    key={index}
                    type={node.type}
                    name={node.name}
                    position={node.position}
                    setActiveTooltip={setActiveTooltip}
                    activeTooltip={activeTooltip}
                    id={index}
              />
            ))}
            {/* <PolygonVisualTesting polygons={polygons} setActiveTooltip={setActiveTooltip} activeTooltip={activeTooltip}/> */}
        </>
    )
}