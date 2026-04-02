// =========================================
// CATALOG GRID MODULE
// =========================================
import { openGamePage } from './game-page.js';

export function renderCatalog(gamesArray) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    contentArea.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'games-grid view-shop';

    // =========================================
    // GENERATE CARDS
    // =========================================
    gamesArray.forEach(function(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.id = game.id; 

        card.innerHTML = `
            <div class="card-cover">
                <img 
                    src="${game.assets.cover}" 
                    alt="${game.title}"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://placehold.co/300x400/eeddc6/5c3a21?text=No+Cover';"
                >
            </div>
            <div class="card-info">
                <h2>${game.title}</h2>
                <div class="card-stats">
                    <span>👥 ${game.players.min}-${game.players.max}</span>
                    <span>⏱️ ${game.playTimeMinutes} хв</span>
                    <span>🌍 ${game.language}</span>
                </div>
                <p class="card-desc">${game.shortDescription}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            openGamePage(game.id);
        });

        grid.appendChild(card);
    });

    contentArea.appendChild(grid);
}