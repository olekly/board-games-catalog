// =========================================
// MAIN CONTROLLER & SEARCH
// =========================================
import { boardGames } from './database.js';
import { renderCatalog, initThemeToggle } from './catalog.js';

// =========================================
// 1. INITIALIZATION
// =========================================
boardGames.sort((gameA, gameB) => {
    return gameA.id.localeCompare(gameB.id);
});

renderCatalog(boardGames);
initThemeToggle();

// =========================================
// 2. SEARCH FILTER
// =========================================
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