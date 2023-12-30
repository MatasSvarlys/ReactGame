// import reportWebVitals from './components/reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './pages/noPage';
import MainGame from './pages/mainGame';
import CharacterPage from './pages/characterPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainGame />} />
          <Route path='Character' element={<CharacterPage/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
);

// reportWebVitals();
