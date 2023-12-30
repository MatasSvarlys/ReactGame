import { useState, useEffect } from 'react';
import Node from './node';
import '../css/mapDisplay.css'
function createNodesFromPolygon(index, polygon){
    const output = [];
    polygon.forEach(element => {
        output.push({ type: "test", name: "poly " + index, position: { top: element[1]+'%', left: element[0]+'%'}})
    });
    return output;
}

export default function PolygonVisualTesting({polygons, setActiveTooltip, activeTooltip}){
    //testing polygon borders
    const [polyNodes, setPolyNodes] = useState([]);


    useEffect(() => {
        // Convert polygons to nodes
        const nodesFromPolygons = polygons.reduce((acc, polygon, index) => {
          const polygonNodes = createNodesFromPolygon(index, polygon);
          return acc.concat(polygonNodes);
        }, []);
      
        // Update state with the converted nodes
        setPolyNodes(nodesFromPolygons);
    }, [polygons]);

return(
    <>
    {/* testing polygon nodes */}
    {polyNodes.map((node, index) => (
        <Node
        key={(index+1)*100}
        type={node.type}
        name={node.name}
        position={node.position}
        setActiveTooltip={setActiveTooltip}
        activeTooltip={activeTooltip}
        id={(index+1)*100}
        />
    ))}
    </>
);
}