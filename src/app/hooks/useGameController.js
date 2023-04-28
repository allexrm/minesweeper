
import { useSelector } from 'react-redux';
import useApiController from '../services/api';

const useGameController = () => {
    const gameConfig = useSelector(state => state.gameConfig);
    const Api = useApiController();

    const gameModel = {
        ...{
            status: 'new',      // Game status: new, running, paused, completed, gameover
            mode: 'single',     // Game mode: single, multi
            level: 'normal',    // Game dificulty level: easy, normal, hard
            sizeX: 15,          // Number of columns from 10 to 50
            sizeY: 15,          // Number of rows from 10 to 50
            player1: '',        // Player 1 name
            player2: '',        // Player 2 name
            playing: 1,         // Who is playing
            startTime: null,    // Unix time when game was started
            revealed: 0,        // How many safe tiles was revealed
            bombs: 0,           // How many mines are in the grid
            flags: 0,           // How many flags user still can set to a tile
            board: {}
        },
        ...gameConfig
    };
    
    // Create a new game configuration
    const createNewGame = () => {
        const numOfBombs = Math.floor(gameModel.sizeX * gameModel.sizeY * (gameModel.level==='easy' ? 0.05 : gameModel.level==='normal' ? 0.1 : 0.15));
        let board = new Array(gameModel.sizeY).fill().map(()=>new Array(gameModel.sizeX).fill(''));
    
        let bombsRemaining = numOfBombs;
        while (bombsRemaining > 0){
            const y = Math.floor(Math.random() * gameModel.sizeY);
            const x = Math.floor(Math.random() * gameModel.sizeX);
            if (board[y][x]===''){
                board[y][x] = 'B';
                bombsRemaining--;
            }
        }
        return {
            ...gameModel,
            ...{
                status: 'new',
                startTime: 0,
                playing: 1,
                bombs: numOfBombs,
                flags: numOfBombs,
                board: board 
            }
        };
    };
    
    // Reveal hidden tile content
    const revealTileContent = (game, row, col) => {
        if (!['running', 'new'].includes(game.status)) return;

        if (game.board[row][col] != '') return 0;
        
        if (game.status === 'new') startGame(game);

        // Checking surroundings
        let sum = 0;
        for (let y=Math.max(0,row-1); y<=Math.min(row+1, game.sizeY-1); y++) 
            for (let x=Math.max(0,col-1); x<=Math.min(col+1, game.sizeX-1); x++)
                sum += ['B','Bf'].includes(game.board[y][x]) ? 1 : 0;
    
        let revealed = 1;
        if (sum > 0){
            game.board[row][col] = String(sum);
        } else {
            game.board[row][col] = '0';
            for (let y=Math.max(0,row-1); y<=Math.min(row+1, game.sizeY-1); y++) 
                for (let x=Math.max(0,col-1); x<=Math.min(col+1, game.sizeX-1); x++)
                    revealed += revealTileContent(game, y, x);
        }

        if (game.mode==='multi')
            game.playing = game.playing===1 ? 2 : 1;

        return revealed;
    };

    // Reveal all hidden mines
    const revealMines = (game) => {
        for (let row=0; row<game.board.length; row++)
            for (let col=0; col<game.board.length; col++)
                if (game.board[row][col].indexOf('B') >= 0)
                    game.board[row][col] = 'X';
    };

    // Set game status to 'running'
    const startGame = (game) => {
        game.status = 'running';
        game.startTime = new Date().getTime();
    };

    // Add the game winner to leaderboard
    const addEntryToLeaderboard = async (entry) => {
        return Api.post('/leaderboard', entry);
    };

    // End a running game with 'game over' status
    const gameOver = async (game) => {
        game.status = 'gameover';
        if (game.startTime===0)
            game.startTime = new Date().getTime();

        // Revealing all mines
        revealMines(game);

        if (game.mode==='multi'){

            const duration = Math.round((new Date().getTime() - game.startTime)/1000);
            const date = new Date();
            const f_date = `${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

            const winner = {
                name: game.playing===1 ? game.player2 : game.player1,
                date: f_date,
                level: game.level.toUpperCase(),
                duration: duration
            };
            await addEntryToLeaderboard(winner);
            return {winner, game};
        } else {
            return new Promise(resolve => resolve({winner: null, game: game}));
        }
    };

    // End a game with 'completed' status
    const completeGame = async (game) => {
        game.status = 'completed';

        const duration = Math.round((new Date().getTime() - game.startTime)/1000);
        const date = new Date();
        const f_date = `${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;

        const winner = {
            name: game.mode==='multi' && game.playing===1 ? game.player2 : game.player1,
            date: f_date,
            level: game.level.toUpperCase(),
            duration: duration
        };
        
        await addEntryToLeaderboard(winner);
        return {winner, game};
    };
    
    return {
        createNewGame,
        revealTileContent,
        gameOver,
        completeGame
    };
};
export default useGameController;