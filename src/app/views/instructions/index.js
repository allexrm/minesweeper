import React from 'react';

import './instructions.scss';
import { NavigationButton } from '../../components/Buttons';
const InstructionsView = () => {

    return (
        <div className="view instructions-view">
            <div className="view-content">
                <h1>WELCOME TO MINESWEEPER</h1>
                <p>The objective of the game is to reveal all the tiles of the grid without detonating any hidden mines. The grid consists of a number of tiles, some of which contain hidden mines. Your task as the player is to click on each tile to uncover them and use the revealed numbers to deduce the location of the hidden mines.</p>
                <p>Each tile that doesn&apos;t contain a mine will reveal a number that indicates how many of its adjacent tiles contain mines. You can use this information to mark tiles that you believe might contain mines by flagging them with a flag icon. To flag a tile, you should click on it using the right mouse button.</p>
                <p>The game is won when you have successfully cleared all the safe tiles. However, if you click on a tile that contains a mine, the game is over, and you lose.</p>
                <h2>Single player mode</h2>
                <p>To play Minesweeper in single player mode, click on <b>NEW GAME</b> button in the main menu screen to start configuring a new game. Once the <b>CONFIGURATION PAGE</b> is loaded, follow the steps below:</p>
                <ul>
                    <li>Choose <b>SINGLE PLAYER</b> on mode selector; </li>
                    <li>Type your name on <b>PLAYER 1</b> field;</li>
                    <li>Choose the dificulty level on <b>LEVEL</b> selector. This can be <b>EASY</b>, <b>NORMAL</b> and <b>EASY</b> and the difficulty level will determine the number of mines you will need to avoid;</li>
                    <li>Choose the grid size as <b>ROW</b> x <b>COL</b>;</li>
                    <li>Click on <b>START</b> button to see the game screen.</li>
                </ul>
                <h2>Multi player mode</h2>
                <p>To play Minesweeper in multiplayer player mode, click on <b>NEW GAME</b> button in the main menu screen to start configuring a new game. Once the <b>CONFIGURATION PAGE</b> is loaded, follow the steps bellow:</p>
                <ul>
                    <li>Choose <b>MULTI PLAYER</b> on mode selector; </li>
                    <li>Type your name on <b>PLAYER 1</b> field;</li>
                    <li>Type your opponent&apos;s name on <b>PLAYER 2</b> field;</li>
                    <li>Choose the dificulty level on <b>LEVEL</b> selector. This can be <b>EASY</b>, <b>NORMAL</b> and <b>EASY</b> and the difficulty level will determine the number of mines you will need to avoid;</li>
                    <li>Choose the grid size as <b>ROW</b> x <b>COL</b>;</li>
                    <li>Click on <b>START</b> button to see the game screen.</li>
                </ul>
                <p>The game starts when you click on a tile for the first time. You can see who is the current player at the top of the game screen. Players make their moves in alternating turns. If you detonate a mine, you lose. The player who reveals the last tile wins the game.</p>
            </div>
            <div>
                <NavigationButton className="btn-yellow" icon='faArrowLeft' to='/' >GO BACK TO MENU</NavigationButton>
            </div>
        </div>
    );
};
export default InstructionsView;