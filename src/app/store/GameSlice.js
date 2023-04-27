import { createSlice } from '@reduxjs/toolkit';

const GameSlice = createSlice({
    name: 'config',
    initialState: {
        mode: 'single', // single, multi
        level: 'normal', // easy, normal, hard
        sizeX: 10, // from 10 to 50
        sizeY: 10, // from 10 to 50
        playing: 1,
        player1: '',
        player2: ''
    },
    reducers: {
        setGameConfig(state, { payload }){
            return {...state, ...payload};
        }
    }
});

export const { setGameConfig } = GameSlice.actions;
export default GameSlice.reducer;