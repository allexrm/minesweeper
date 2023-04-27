import React, { useEffect, useState } from 'react';

import './leaderboard.scss';
import { NavigationButton } from '../../components/Buttons';
import LeaderboardList from './components/LeaderboardList';

import useApiController from '../../services/api';

const LeaderboardView = () => {
    const Api = useApiController();

    const [leaderboard, setLeaderboard] = useState(null);

    const loadLeaderboardData = () => {
        Api.get('/leaderboard').then(response=>setLeaderboard(response.data));
    };

    useEffect(()=>{
        if (leaderboard!==null) return;
        loadLeaderboardData();
    }, []);


    return (
        <div className="view leaderboard-view">
            <div className="view-content">
                <h1 className="leaderboard-title">LEADERBOARD</h1>
                <LeaderboardList entries={leaderboard || []} />
            </div>
            <div>
                <NavigationButton className="btn-yellow" icon='faArrowLeft' to='/' >GO BACK TO MENU</NavigationButton>
            </div>
        </div>
    );
};

export default LeaderboardView;