import React, { useEffect, useState } from 'react';

import GameContext from './components/GameContext';
import './game.scss';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import useGameController from '../../hooks/useGameController';
import { NavigationButton } from '../../components/Buttons';

const GameView = ()=>{
    const navigate = useNavigate();
    const GameController = useGameController();

    const [game, setGame] = useState(GameController.createNewGame());

    const handleTileClick = (row,col) => {
        if (game.board[row][col].indexOf('f')>=0) return;

        if (game.board[row][col]==='B'){
            GameController.gameOver(game)
                .then(({winner, game})=>{
                    setGame(prev=>{ return {...prev, ...game}; });
                    if (winner===null){
                        toast.error('GAME OVER!');
                        setTimeout(()=>navigate('/config'), 5000);
                    } else {
                        toast.success(`CONGRATULATIONS ${winner.name}, YOU WON THE CHALLENGE!`);
                        setTimeout(()=>navigate('/leaderboard'), 5000);
                    }
                });
        } else {
            setGame(prev => {
                const newGame = JSON.parse(JSON.stringify(prev));
                newGame.revealed += GameController.revealTileContent(newGame, row, col);
                return newGame;
            });
        }
    };

    const handleTileToggleFlag = (row,col) => {
        if (game.status !== 'running' || game.mode==='multi') return;
        if (!['','f','Bf','B'].includes(game.board[row][col])) return;
        if (['','B'].includes(game.board[row][col]) && game.flags===0) return;

        setGame(prev => {
            const newGame = JSON.parse(JSON.stringify(prev));
            if (newGame.board[row][col].indexOf('f') >= 0){
                newGame.board[row][col] = newGame.board[row][col].replace('f', '');
                newGame.flags++;
            } else {
                newGame.board[row][col] += 'f';
                newGame.flags--;
            }
            return newGame;
        });
    };

    useEffect(()=>{
        if (game.revealed == game.sizeX*game.sizeY-game.bombs){
            GameController.completeGame(game).then(winner=>{
                if (game.mode==='multi'){
                    toast.success(`CONGRATULATIONS ${winner.name}, YOU WON THE CHALLENGE!`);
                } else {
                    toast.success('CONGRATULATIONS, YOU WON!');
                }
                setTimeout(()=>navigate('/leaderboard'), 5000);
            });
        }
    },[game]);
    
    return (
        <div className="view game-view">
            <div className="view-content">
                <GameContext.Provider value={{
                    game,
                    handleTileClick,
                    handleTileToggleFlag
                }}>
                    <GameHeader />
                    <GameBoard />
                </GameContext.Provider>
            </div>
            <div>
                <NavigationButton className="btn-yellow" icon='faArrowLeft' to='/config' >LEAVE THE GAME</NavigationButton>
            </div>
        </div>
    );
};
export default GameView;
