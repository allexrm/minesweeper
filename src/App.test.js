import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import HomeView from './app/views/home';

test('HomeViewNewGameButton', () => {
    render(<App />);
    const button = screen.getByText(/NEW GAME/i);
    expect(button).toBeInTheDocument();
});

test('HomeViewLeaderboardButton', () => {
    render(<App />);
    const button = screen.getByText(/LEADERBOARD/i);
    expect(button).toBeInTheDocument();
});

test('HomeViewHowToPlayButton', () => {
    render(<App />);
    const button = screen.getByText(/HOW TO PLAY/i);
    expect(button).toBeInTheDocument();
});

test('HomeViewNewGameButtonClick', async () => {
    render(<HomeView />, {
        wrapper: BrowserRouter,
    });
    const button = screen.getByText(/NEW GAME/i);
    await userEvent.click(button);
    expect(global.window.location.pathname).toEqual('/config');
});

test('HomeViewLeaderboardButtonClick', async () => {
    render(<HomeView />, {
        wrapper: BrowserRouter,
    });
    const button = screen.getByText(/LEADERBOARD/i);
    await userEvent.click(button);
    expect(global.window.location.pathname).toEqual('/leaderboard');
});

test('HomeViewHowToPlayButtonClick', async () => {
    render(<HomeView />, {
        wrapper: BrowserRouter,
    });
    const button = screen.getByText(/HOW TO PLAY/i);
    await userEvent.click(button);
    expect(global.window.location.pathname).toEqual('/instructions');
});
