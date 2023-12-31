import '../css/mapDisplay.css'
import React, { useState, useEffect, useRef } from 'react';
import Node from './node'
import Path from './path';
import ScrollDrag from './scrollDrag';
import PolygonVisualTesting from './polygonVisualTesting';

export default function MapDisplay({nodes, paths, mapSize}){
    const [displayedNodes, setDisplayedNodes] = useState([]);
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [displayedPaths, setDisplayedPaths] = useState([]);
    const mapDisplayRef = useRef(null);


    useEffect(() => {
        //update the displayed nodes whenever nodes change
        setDisplayedNodes(nodes);
        setDisplayedPaths(paths);
        setActiveTooltip(null);
    }, [nodes, paths]);

    return(
        <ScrollDrag ref={mapDisplayRef} rootClass="map-display-container">
            <div className='map' style={{height: mapSize[0], width: mapSize[1]}}>
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
            </div>
        </ScrollDrag>
    )
}