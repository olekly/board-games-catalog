//Main Scrpit

import { boardGames } from './database.js';
import { renderCatalog } from './func.js';

boardGames.sort((gameA, gameB) => {
    return gameA.id.localeCompare(gameB.id);
});

renderCatalog(boardGames);


const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase(); 

    const filteredGames = boardGames.filter(game => {
        const titleMatch = game.title.toLowerCase().includes(searchText);
        const descMatch = game.id.toLowerCase().includes(searchText);
        return titleMatch || descMatch;
    });

    renderCatalog(filteredGames);
});