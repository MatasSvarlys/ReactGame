import '../css/mapDisplay.css'
import React, { useState, useEffect, useRef } from 'react';
import Node from './node'
import Path from './path';
import ScrollDrag from './scrollDrag';

export default function MapDisplay({nodes, paths, mapSize}){
    const [displayedNodes, setDisplayedNodes] = useState([]);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [displayedPaths, setDisplayedPaths] = useState([]);
    const mapDisplayRef = useRef(null);
    const [currentPos, setPos] = useState("id_1"); 
    const [connectedNodes, setConnectedNodes] = useState([]);


    useEffect(() => {
        //update the display whenever nodes or paths change
        setDisplayedNodes(nodes);
        setDisplayedPaths(paths);
        setActiveTooltip(null);
    }, [nodes, paths]);

    useEffect(() => {
        // Update connectedNodes whenever paths change
        const newConnectedNodes = paths.reduce((acc, path) => {
            if(path.start.connectsTo === currentPos)
                acc.push(path.end.connectsTo);
            else if (path.end.connectsTo === currentPos)
                acc.push(path.start.connectsTo);
            return acc;
        }, []);
    
        setConnectedNodes(newConnectedNodes);
      }, [paths, currentPos]);    

    return(
        <ScrollDrag ref={mapDisplayRef} rootClass="map-display-container">
            <div className='map' style={{height: mapSize[0], width: mapSize[1]}}>
                {displayedPaths.map((path, index) => (
                    <Path 
                        key={index} 
                        path={path}
                    />
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
                        currentPos={currentPos}
                        setPos={setPos}
                        isConnected={connectedNodes.includes(node.id)}
                    />
                ))}
            </div>
        </ScrollDrag>
    )
}