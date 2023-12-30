import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map from './components/map';
import Sidebar from './components/sidebar';
import reportWebVitals from './components/reportWebVitals';

const initialSidebarData =
{
  playerName: 'Bobber',
  playerClass: 'Wizard',
  stats: {
    vit: 10,
    wis: 15,
    str: 10,
    con: 12,
    luck: 5,
  },
  equips: {
    hat: 'Iron Helmet',
    chest: 'Steel Armor',
    hand1: 'Sword',
    hand2: 'Shield',
    boots: 'Leather Boots',
  },
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Map />
      <Sidebar {...initialSidebarData}/>
  </React.StrictMode>
);

reportWebVitals();
