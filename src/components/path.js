import React, { useEffect, useRef } from 'react';
import '../css/path.css'
export default function Path({path: {end, start}}) {
  const pathRef = useRef(null);

  useEffect(() => {
    console.log("start node pos", start, "\nend node pos", end);
    const updatePath = () => {
      const pathElement = pathRef.current;

      const startX = parseFloat(start.position.left);
      const startY = parseFloat(start.position.top);
      const endX = parseFloat(end.position.left);
      const endY = parseFloat(end.position.top);
      
      // Calculate midpoint
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      
      // Calculate distance between points
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      
      // Calculate angle in degrees
      const angleDegrees = Math.atan2(endY - startY, endX - startX);
      
      // Set styles
      pathElement.style.width = `${distance}%`; // You might want to use pixels or adjust accordingly
      pathElement.style.transform = `rotate(${angleDegrees}rad)`;
      pathElement.style.left = `${midX}%`;
      pathElement.style.top = `${midY}%`;
      
    };

    // Call the update function initially and whenever start or end change
    updatePath();

    // Attach resize event listener to recalculate on window resize
    window.addEventListener('resize', updatePath);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updatePath);
    };
  }, [start, end]);

  return <div ref={pathRef} className="path"></div>;
}
