import React from 'react';

import './home.scss';

import bomb from '../../assets/images/bomb.svg';
import { NavigationButton } from '../../components/Buttons';

const HomeView = ()=>{

    return (
        <div className="view home-view">
            <div className="home-title">
                <img src={bomb} />
                <h1>MINESWEEPER</h1>
            </div>
            <div className="view-content home-menu">
                <NavigationButton to='/config' className='home-menu-item' >NEW GAME</NavigationButton>
                <NavigationButton to='/leaderboard' className='home-menu-item' >LEADERBOARD</NavigationButton>
                <NavigationButton to='/instructions' className='home-menu-item' >HOW TO PLAY</NavigationButton>
            </div>
        </div>
    );
};
export default HomeView;