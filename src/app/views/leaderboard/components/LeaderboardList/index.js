import React, { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

import './leaderboard-list.scss';

const LeaderboardHead = () =>{
    return (
        <div className="leaderboard-list-head">
            <div className="list-col name">NAME</div>
            <div className="list-col date">DATE</div>
            <div className="list-col level">LEVEL</div>
            <div className="list-col duration">DURATION</div>
        </div>
    );
};

const LeaderboardEntry = ({name, date, level, duration, position}) =>{

    const f_duration = useMemo(()=>{
        const min = Math.floor(duration / 60);
        const sec = duration - min*60;
        return String(min).padStart(2, '0')+':'+String(sec).padStart(2, '0');    
    }, [duration]);

    return (
        <div className="leaderboard-entry">
            <div className={`trophy position-${position}`} >
                {position<3 && 
                    <FontAwesomeIcon icon={faTrophy} />
                }
            </div>
            <div className="list-col name">{name}</div>
            <div className="list-col date">{date}</div>
            <div className="list-col level">{level}</div>
            <div className="list-col duration">{f_duration}</div>
        </div>
    );
};

const LeaderboardList = ({entries}) => {

    return (
        <div className="leaderboard-list">
            <LeaderboardHead />
            {
                entries.map((entry, index)=><LeaderboardEntry key={index} position={index} {...entry} />)
            }
        </div>
    );
};

export default LeaderboardList;
export { LeaderboardEntry };