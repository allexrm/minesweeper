import { configureStore } from '@reduxjs/toolkit';
import GameReducers from './GameSlice';

export default configureStore({
    reducer: {
        gameConfig: GameReducers
    }
});