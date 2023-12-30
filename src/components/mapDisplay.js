import '../css/mapDisplay.css'
import React, { useState, useEffect } from 'react';
import Node from './node'
import Path from './path';
import PolygonVisualTesting from './polygonVisualTesting';

export default function MapDisplay({nodes, paths, polygons}){
    const [displayedNodes, setDisplayedNodes] = useState([]);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [displayedPaths, setDisplayedPaths] = useState([]);

    useEffect(() => {
        //update the displayed nodes whenever nodes change
        setDisplayedNodes(nodes);
        setDisplayedPaths(paths);
        setActiveTooltip(null);
    }, [nodes, paths]);

    return(
        <>
            {/* <div className='top1'/>
            <div className='top2'/>
            <div className='mid'/>
            <div className='bot1'/>
            <div className='bot2'/> */}
            {displayedPaths.map((path) => (
                <Path path={path}/>
            ))}
            {displayedNodes.map((node) => (
                <Node
                    key={node.id}
                    type={node.type}
                    name={node.name}
                    position={node.position}
                    setActiveTooltip={setActiveTooltip}
                    activeTooltip={activeTooltip}
                    id={node.id}
              />
            ))}
            {/* <PolygonVisualTesting polygons={polygons} setActiveTooltip={setActiveTooltip} activeTooltip={activeTooltip}/> */}
        </>
    )
}