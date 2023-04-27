import React, { useContext, useEffect, useState } from 'react';
import GameContext from '../GameContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './game-header.scss';

const Player = ({name, active}) => {

    return (
        <div className={`player-name ${active ? 'active' : ''}`} >
            {active && <FontAwesomeIcon icon={faArrowRight} /> }
            { name }
        </div>
    );
};

const GameHeader = () => {
    const context = useContext(GameContext);

    const [time, setTime] = useState(0);

    const updateTimer = () => {
        if (context.game.status!=='running') return;

        const elapsed = Math.round((new Date().getTime() - context.game.startTime)/1000);
        const min = Math.floor(elapsed / 60);
        const sec = elapsed - min*60;
        setTime(String(min).padStart(2, '0')+':'+String(sec).padStart(2, '0'));
    };
    useEffect(()=>{
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [context.game.status]);

    return (
        <div className={`game-header game-mode-${context.game.mode}`}>
            <div className="bombs">
                <FontAwesomeIcon icon={faBomb} />
                { context.game.bombs }
            </div>
            <div className="flags">
                <FontAwesomeIcon icon={faFlag} />
                { context.game.flags }
            </div>
            <div className="time">
                <FontAwesomeIcon icon={faClock} />
                { time }
            </div>
            <div className="players">
                <Player active={context.game.playing===1} name={context.game.player1} />
                {context.game.mode==='multi' && 
                    <Player active={context.game.playing===2} name={context.game.player2} />
                }
            </div>
        </div>
    );
};

export default GameHeader;