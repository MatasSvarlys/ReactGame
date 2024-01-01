import React, { useState, useEffect } from 'react';
import MapDisplay from './mapDisplay';
import '../css/map.css'
const mapSize = [1000, 1000];

export default function Map(){
  const [nodes, setNodes] = useState([]);
  const [paths, setPaths] = useState([]);


  //these are in [x%, y%] from top left
  const top1poly = [[0, 0], [40, 0], [0, 40]].map(coords => percentToPixels(coords, mapSize));
  const top2poly = [[40, 0], [80, 0], [0, 80], [0, 40]].map(coords => percentToPixels(coords, mapSize));
  const midpoly = [[80, 0], [100, 0], [100, 20], [20, 100], [0, 100], [0, 80]].map(coords => percentToPixels(coords, mapSize));
  const bot1poly = [[100, 20], [100, 60], [60, 100], [20, 100]].map(coords => percentToPixels(coords, mapSize));
  const bot2poly = [[100, 60], [60, 100], [100, 100]].map(coords => percentToPixels(coords, mapSize));
  
  
  useEffect(() => {
    //take out the nodes and paths from storage when you load up a page again
    const storedNodes = JSON.parse(localStorage.getItem('mapNodes')) || [];
    const storedPaths = JSON.parse(localStorage.getItem('paths')) || [];
    setPaths(storedPaths);
    setNodes(storedNodes);
  }, []); 

  const initRandomMap = () => {
    iteratorObject.value = 0;
    
    const minTowns = 1;
    const maxTowns = 3;
    const minForests = 3;
    const maxForests = 5;
    const minTemples = 2;
    const maxTemples = 5;
    
    
    const topTownNodes = createRandomNodes('Town', minTowns, maxTowns, top1poly); 
    const botTownNodes = createRandomNodes('Town', minTowns, maxTowns, bot2poly);
    const topForestNodes = createRandomNodes('Forest', minForests, maxForests, top2poly); 
    const botForestNodes = createRandomNodes('Forest', minForests, maxForests, bot1poly);
    const templeNodes = createRandomNodes('Temple', minTemples, maxTemples, midpoly);

    //make sure these are in order from where to where they go to
    const newNodes = [[...topTownNodes], [...topForestNodes], [...templeNodes], [...botForestNodes], [...botTownNodes]];
    // console.log("not concated", newNodes);
    // console.log("concated nodes", newNodes.flat());
    const allPaths = generateRandomPaths(newNodes);

    localStorage.setItem('mapNodes', JSON.stringify(newNodes.flat()));
    localStorage.setItem('paths', JSON.stringify(allPaths));
    setPaths(allPaths);
    setNodes(newNodes.flat());
  };  

  return (
    <div className="content">
        <button onClick={initRandomMap}>randomize map</button>
        <MapDisplay nodes={nodes} paths={paths} mapSize={mapSize}/>
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
  const marginPx = 20;

  for (let i = 1; i <= count; i++) {
    const name = `${type} ${i}`;
    const id = generateUniqueId(iteratorObject);
    let top, left;
    // Generate random positions within the specified polygon
    do {
      top = `${Math.trunc(Math.random() * (mapSize[0] - marginPx), 2)}px`;
      left = `${Math.trunc(Math.random() * (mapSize[1] - marginPx), 2)}px`;
    } while (!insidePoly([parseFloat(left), parseFloat(top)], polygon));

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


function percentToPixels(coords, mapSize) {
  const [mapWidth, mapHeight] = mapSize;
  const [percentX, percentY] = coords;

  const pixelX = (percentX / 100) * mapWidth;
  const pixelY = (percentY / 100) * mapHeight;

  return [pixelX, pixelY];
}

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

const generateRandomPaths = (sectionsArr) => {
  const pickRandomNode = (nodes) => {
    if (nodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * nodes.length);
      return nodes[randomIndex];
    } else {
      console.error("No more nodes to pick from");
      return null;
    }
  }

  const generatePathFromTwoNodes = (node1, node2) =>{
    // console.log(node1.position, node2.position);
    return({
      start: {
        position: node1.position,
      },
      end: {
        position: node2.position,
      },
    });
  }

  const generatePathsInSection = (section) => {
    let used = [];
    let unused = [...section];
    let generatedPaths = [];
    
    const pickOutNode = (givenNode) => {
      used.push(givenNode);
      unused = unused.filter(node => node !== givenNode);
      return givenNode;
    }

    //seed the first node
    pickOutNode(pickRandomNode(unused));
    
    //generate paths
    while(unused.length > 0){
      generatedPaths.push(
        generatePathFromTwoNodes(pickRandomNode(used), pickOutNode(pickRandomNode(unused)))
        );
    }

    return generatedPaths;
  }

  const generatePathsBetweenSections = (section1, section2) =>{
    //probably should add a way to pick how may paths between the sections but it works for now
    return [
      generatePathFromTwoNodes(pickRandomNode(section1), pickRandomNode(section2)), 
      generatePathFromTwoNodes(pickRandomNode(section1), pickRandomNode(section2))
    ];
  }

  const sectionPaths = sectionsArr.map(section => generatePathsInSection(section));

  let pathsBetweenSections = [];
  for(let i = 0; i < sectionsArr.length - 1; i++)
    pathsBetweenSections.push(generatePathsBetweenSections(sectionsArr[i], sectionsArr[i+1]));

  // console.log(pathsBetweenSections.flat());

  return [...sectionPaths.flat(), ...pathsBetweenSections.flat()];
}
