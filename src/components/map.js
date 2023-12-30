import React, { useState, useEffect } from 'react';
import MapDisplay from './mapDisplay';
import '../css/map.css'

export default function Map(){
  const [nodes, setNodes] = useState([]);
  const [paths, setPaths] = useState([]);
  //these are in [x, y] from top left
  const top1poly = [[0, 0], [40, 0], [0, 40]];
  const top2poly = [[40, 0], [80, 0], [0, 80], [0, 40]];
  const midpoly = [[80, 0], [100, 0], [100, 20], [20, 100], [0, 100], [0, 80]];
  const bot1poly = [[100, 20], [100, 60], [60, 100], [20, 100]];
  const bot2poly = [[100, 60], [60, 100], [100, 100]];
  
  
  useEffect(() => {
    //take out the nodes from storage when you load up a page again
    const storedNodes = JSON.parse(localStorage.getItem('mapNodes')) || [];
    // localStorage.removeItem('mapNodes');
    setNodes(storedNodes);
  }, []); 

  const initRandomMap = () => {
    iteratorObject.value = 0;
    
    const getNodeIds = (nodes) => {
      const nodeIds = nodes.map(node => node.id);
      return nodeIds;
    }
    //ugh im mad [...createRandomNodes('Town', 3, 5, top1poly), ...createRandomNodes('Town', 3, 5, bot2poly)] doesnt work because position doesnt get passed on
    const minTowns = 1;
    const maxTowns = 3;
    const minForests = 3;
    const maxForests = 5;
    const minTemples = 2;
    const maxTemples = 5;
    
    
    const topTownNodes = createRandomNodes('Town', minTowns, maxTowns, top1poly);
    const topTownPaths = generatePaths(getNodeIds(topTownNodes), topTownNodes);
    const botTownNodes = createRandomNodes('Town', minTowns, maxTowns, bot2poly);
    const botTownPaths = generatePaths(getNodeIds(botTownNodes), botTownNodes);
    const topForestNodes = createRandomNodes('Forest', minForests, maxForests, top2poly)
    const botForestNodes = createRandomNodes('Forest', minForests, maxForests, bot1poly);
    const templeNodes = createRandomNodes('Temple', minTemples, maxTemples, midpoly);

    const newNodes = [...topTownNodes, ...botTownNodes, ...topForestNodes, ...botForestNodes, ...templeNodes];
    const newPaths = [...topTownPaths, ...botTownPaths];
    // console.log(newPaths);
    // localStorage.removeItem('mapNodes');
    localStorage.setItem('mapNodes', JSON.stringify(newNodes));
    // localStorage.setItem('paths', JSON.stringify(newPaths));
    setPaths(newPaths);
    setNodes(newNodes);
  };  

  return (
    <div className="map">
        <button onClick={initRandomMap}>randomize map</button>
        <div className='map-display'>
            <MapDisplay nodes={nodes} paths={paths} polygons={[top1poly, top2poly, midpoly, bot1poly, bot2poly]}/>
        </div>
    </div>
  );
};

const iteratorObject = { value: 0 };

const generateUniqueId = (iteratorObj) => {
  iteratorObj.value += 1;
  return `id_${iteratorObj.value}`;
};

const createRandomNodes = (type, minCount, maxCount, polygon) => {
//TODO: make sure nodes dont overlap visually

  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const nodes = [];
  const marginPercent = 3;

  for (let i = 1; i <= count; i++) {
    const name = `${type} ${i}`;
    const id = generateUniqueId(iteratorObject);
    let top, left;
    // Generate random positions within the specified polygon
    do {
      top = `${Math.random() * (100 - marginPercent)}%`;
      left = `${Math.random() * (100 - marginPercent)}%`;
    } while (!insidePoly([parseFloat(left), parseFloat(top)], polygon));
    // console.log(name, id);
    // console.log(top, left);
    const color = getNodeColor(type);

    nodes.push({ type, name, position: { top, left }, color, id});
  }

  return nodes;
};

const getNodeColor = type => {
  switch (type) {
    case 'Town':
      return 'blue';
    case 'Forest':
      return 'green';
    case 'Temple':
      return 'red';
    default:
      return 'orange';
  }
};


function insidePoly(point, polygon) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      var xi = polygon[i][0], yi = polygon[i][1];
      var xj = polygon[j][0], yj = polygon[j][1];
      
      var intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};


const generatePaths = (nodeIds, nodes) => {
  if(!nodeIds || !nodes){
    console.error("couldnt generate paths because there were no ids or nodes");
    return;
  }
  let used = [];
  let unused = [...nodeIds];
  let paths = [];

  const pickRandomAndMoveToUsed = () => {
    if (unused.length > 0) {
      const randomIndex = Math.floor(Math.random() * unused.length);
      const randomId = unused.splice(randomIndex, 1)[0];
      used.push(randomId);
      return randomId;
    }
  };

  const pickRandomFromUsed = () => {
    if (used.length > 0) {
      const randomIndex = Math.floor(Math.random() * used.length);
      const randomId = used.splice(randomIndex, 1)[0];
      return randomId;
    }
  };

  const generatePath = () => {
    return [pickRandomFromUsed(), pickRandomAndMoveToUsed()];
  };

  pickRandomAndMoveToUsed();
  while (unused.length > 0) {
    paths.push(generatePath());
  }

  // Enhance paths to include node positions or IDs
  const pathsWithNodes = paths.map(path => ({
    start: {
      position: nodes.find(node => node.id === path[0]).position,
    },
    end: {
      position: nodes.find(node => node.id === path[1]).position,
    },
  }));

  console.log('Generated paths: ', pathsWithNodes);
  return pathsWithNodes;
};
