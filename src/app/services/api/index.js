
/**
 * This hook was created to simulate the use of APIs for communication with 
 * remote servers and can be replaced by libraries such as axios or fetch. 
 * It uses localStorage to persist leaderboard data.
 */

const useApiController = () => {

    const loadData = () => {
        return JSON.parse(localStorage.getItem('minesweeper'));
    };

    const saveData = (data) => {
        localStorage.setItem('minesweeper', JSON.stringify(data));
    };

    const loadLeaderboardData = async () => {
        const levels = {HARD:2, NORMAL:1, EASY:0};
        return new Promise(resolve => {
            let data = loadData();
            resolve({
                status: 200, 
                data: data.leaderboard.sort((e1, e2) => {
                    return e1.level===e2.level ? (e1.duration > e2.duration ? 1 : -1) : levels[e1.level] > levels[e2.level] ? -1 : 1; 
                }).slice(0, 10)
            });
        });
    };

    const addEntryToLeaderboard = async (entry) => {
        return new Promise(resolve => {
            let data = loadData();
            saveData({
                ...data,
                ...{
                    leaderboard: [...data.leaderboard, entry]
                }
            });
            resolve({status: 200, data: entry});
        });
    };

    const get = async (url) => {
        switch (url) {
            case '/leaderboard':
                return loadLeaderboardData();
        }
    };

    const post = async (url, data) => {
        switch (url) {
            case '/leaderboard':
                return addEntryToLeaderboard(data);
        }
    };

    if (loadData() === null){
        saveData({
            config: {},
            leaderboard: []
        });
    }

    return {
        get,
        post
    };
};

export default useApiController;
