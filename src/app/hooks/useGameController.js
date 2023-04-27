
import { useSelector } from 'react-redux';
import useApiController from '../services/api';

const useGameController = () => {
    const gameConfig = useSelector(state => state.gameConfig);
    const Api = useApiController();

    const gameModel = {
        ...{
            mode: 'single', // single, multi
            level: 'normal', // easy, normal, hard
            sizeX: 15, // from 10 to 50
            sizeY: 15, // from 10 to 50
            player1: '',
            player2: '',
            startTime: null,
            revealed: 0,
            bombs: 0,
            flags: 0,
            status: 'new', //new, running, paused, completed, gameover
            board: {}
        },
        ...gameConfig
    };
    
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

    const revealMines = (game) => {
        for (let row=0; row<game.board.length; row++)
            for (let col=0; col<game.board.length; col++)
                if (game.board[row][col].indexOf('B') >= 0)
                    game.board[row][col] = 'X';
    };

    const startGame = (game) => {
        game.status = 'running';
        game.startTime = new Date().getTime();
    };

    const addEntryToLeaderboard = async (entry) => {
        return Api.post('/leaderboard', entry);
    };

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