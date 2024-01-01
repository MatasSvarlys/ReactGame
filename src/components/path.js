import React, { useEffect, useRef } from 'react';
import '../css/path.css'
export default function Path({path: {end, start}}) {
  const pathRef = useRef(null);

  useEffect(() => {
    const updatePath = () => {
    //TODO: make sure that paths get displayed correctly no matter the zoom scale

      const pathElement = pathRef.current;
      
      const nodeSize = [20, 20];
      const startX = parseFloat(start.position.left);
      const startY = parseFloat(start.position.top);
      const endX = parseFloat(end.position.left);
      const endY = parseFloat(end.position.top);
      
      console.log("start node pos", startX, startY, "\nend node pos", endX, endY, "\npath ref", pathElement);
      // Calculate midpoint
      const midX = ((startX + endX) / 2) + nodeSize[0]/2;
      const midY = ((startY + endY) / 2) + nodeSize[1]/2;
      
      // Calculate distance between points
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      
      const angleRadians = Math.atan2(endY - startY, endX - startX);
      
      // Set styles
      pathElement.style.width = `${distance}px`;
      pathElement.style.transform = `rotate(${angleRadians}rad)`;
      pathElement.style.left = `${midX - distance/2}px`;
      pathElement.style.top = `${midY}px`;
      
    };


    updatePath();

  }, [start, end]);

  return <div ref={pathRef} className="path"></div>;
}
