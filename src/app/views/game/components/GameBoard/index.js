import React, { useContext } from 'react';
import GameContext from '../GameContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons';

import './game-board.scss';

const Tile = (props) => {
    const { handleTileClick, handleTileToggleFlag } = useContext(GameContext);

    // eslint-disable-next-line react/prop-types
    const { value, row, col } = props;
    let className = '';
    let content = '';
    switch (value){
        case 'X': className = 'bomb'; content = <FontAwesomeIcon icon={faBomb} />; break;
        case 'Bf': className = 'flag'; content = <FontAwesomeIcon icon={faFlag} />; break;
        case 'f': className = 'flag'; content = <FontAwesomeIcon icon={faFlag} />; break;
        case 'B': className = ''; content = ''; break;
        case '0': className = 'revealed'; content = ''; break;
        case '': className = ''; content = ''; break;
        default: className = 'revealed'; content = value;
    }

    return (
        <div className={`game-board-col ${className}`} {...props} 
            onClick={()=>handleTileClick(row, col)} 
            onContextMenu={(e)=>{
                e.preventDefault();
                handleTileToggleFlag(row, col);
            }}
        >
            { content }
        </div>
    );
};

const GameBoard = () => {
    const context = useContext(GameContext);

    return (
        <div className="game-board">
            {
                context.game.board.map((row, rKey)=>{
                    return (
                        <div key={rKey} className="game-board-row">
                            {
                                row.map((col, cKey)=><Tile key={cKey} row={rKey} col={cKey} value={col} />)
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default GameBoard;