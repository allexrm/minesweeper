import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfigView from '../views/config';
import HomeView from '../views/home';
import GameView from '../views/game';
import LeaderboardView from '../views/leaderboard';
import InstructionsView from '../views/instructions';

const AppRoutes = ()=>{

    return (
        <Router>
            <Routes>
                <Route exact path='/config' element={<ConfigView />} />
                <Route exact path='/game' element={<GameView />} />
                <Route exact path='/leaderboard' element={<LeaderboardView />} />
                <Route exact path='/instructions' element={<InstructionsView />} />
                <Route path='/' element={<HomeView />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;