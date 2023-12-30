import '../css/path.css';
import { useState } from 'react';

export default function Path({ start, end }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="path">.</div> 
      )}
    </>
  );
  
};