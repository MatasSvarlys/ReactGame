import Map from '../components/map';
import Sidebar from '../components/sidebar';

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


export default function MainGame(){
    return(
        <>
            <Map />
            <Sidebar {...initialSidebarData}/>
        </>
    );
}