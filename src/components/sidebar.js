import React, { Component } from 'react';
import '../css/sidebar.css'

class Sidebar extends Component{
  
  render() {
    const { playerName, playerClass, stats, equips } = this.props;
    
    return (
      <div className="sidebar">
        <h2>{playerName}</h2>
        <h3>{playerClass}</h3>

        <div className='stats'>
            <div>vit: {stats.vit}</div>
            <div>wis: {stats.wis}</div>
            <div>str: {stats.str}</div>
            <div>con: {stats.con}</div>
            <div>luck: {stats.luck}</div>
        </div>

        <div className="backpack">
            <div className='equips'>
              <div>hat: {equips.hat}</div>
              <div>chest: {equips.chest}</div>
              <div>hand: {equips.hand1}</div>
              <div>hand: {equips.hand2}</div>
              <div>hand: {equips.boots}</div>
            </div>
            <button className='seeInventoryButton'>see inventory</button>
        </div>
      </div>
    );
  }

}

export default Sidebar;