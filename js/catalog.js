// =========================================
// CATALOG GRID MODULE
// =========================================
import { openGamePage } from './game-page.js';

// Зберігаємо посилання на поточні відрендерені компоненти для їх якісного очищення
let activeCards = [];

export function cleanupCatalogView() {
    const contentArea = document.getElementById('content-area');
    if (contentArea) contentArea.innerHTML = '';
    
    // Явне видалення карточок для допомоги збирачу сміття (Garbage Collector)
    activeCards.forEach(card => card.remove());
    activeCards = [];
}

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
        activeCards.push(card); // зберігаємо картокчу для подальшого очищення
    });

    contentArea.appendChild(grid);
}

// =========================================
// THEME & LIGHTING MODULE
// =========================================

let updateFlashlightFn = null;

export function forceDisableBlackout() {
    const body = document.body;
    if (body.classList.contains('blackout')) {
        body.classList.remove('blackout');
        if (updateFlashlightFn) {
            document.removeEventListener('mousemove', updateFlashlightFn);
        }
        body.style.removeProperty('--mouse-x');
        body.style.removeProperty('--mouse-y');
    }
}

export function restoreCatalogTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle-chk');
    document.body.className = ''; // очистимо від усіх класів
    
    if (savedTheme === 'dark') {
        if(themeToggle) themeToggle.checked = true;
        document.body.classList.add('dark-theme');
    } else {
        if(themeToggle) themeToggle.checked = false;
        document.body.classList.remove('dark-theme');
    }
    forceDisableBlackout();
}

export function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle-chk');
    const lampButton = document.querySelector('.lamp-button');
    const body = document.body;

    if (!themeToggle || !lampButton) return;

    restoreCatalogTheme();

    let holdTimer = null;
    let isBlackoutJustTriggered = false;

    // Звичайний клік (світло/ніч)
    themeToggle.addEventListener('change', (e) => {
        // Якщо блекаут щойно увімкнувся від утримання, ми ігноруємо цей зміну стану
        if (isBlackoutJustTriggered) {
            isBlackoutJustTriggered = false;
            themeToggle.checked = !e.target.checked; 
            return;
        }

        // Якщо блекаут вже АКТИВНИЙ, то будь-який клік просто вимикає його
        if (body.classList.contains('blackout')) {
            forceDisableBlackout();
            // Відновлюємо правильний стан чекбоксу для поточної теми
            themeToggle.checked = (localStorage.getItem('theme') === 'dark');
            return; 
        }

        // Нормальна зміна теми
        if (e.target.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Логіка утримання (Blackout - 3 секунди)
    function startHold(e) {
        if (e.type !== 'touchstart' && e.button !== 0) return; // тільки ліва кнопка або тап
        if (holdTimer) clearTimeout(holdTimer);
        
        holdTimer = setTimeout(() => {
            if (!body.classList.contains('blackout')) {
                body.classList.add('blackout');
                document.addEventListener('mousemove', updateFlashlightFn);
                body.style.setProperty('--mouse-x', '50vw');
                body.style.setProperty('--mouse-y', '50vh');
                isBlackoutJustTriggered = true; 
            }
        }, 2000);
    }

    function cancelHold() {
        if (holdTimer) clearTimeout(holdTimer);
    }

    lampButton.addEventListener('mousedown', startHold);
    lampButton.addEventListener('touchstart', startHold, {passive: true});

    lampButton.addEventListener('mouseup', cancelHold);
    lampButton.addEventListener('mouseleave', cancelHold);
    lampButton.addEventListener('touchend', cancelHold);

    updateFlashlightFn = function(e) {
        body.style.setProperty('--mouse-x', e.clientX + 'px');
        body.style.setProperty('--mouse-y', e.clientY + 'px');
    };
}

// =========================================
// SCRABBLE PROXIMITY REPULSION
// =========================================
let scrabbleInteractionHandler = null;

export function initScrabbleInteraction() {
    const tiles = document.querySelectorAll('.scrabble-tile');
    if (!tiles.length) return;

    const REPULSION_RADIUS = 120; // Радіус взаємодії курсора
    const REPULSION_FORCE = 30; // Максимальна сила відштовхування

    scrabbleInteractionHandler = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            // Центр фішки
            const tileCenterX = rect.left + rect.width / 2;
            const tileCenterY = rect.top + rect.height / 2;

            const distX = mouseX - tileCenterX;
            const distY = mouseY - tileCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < REPULSION_RADIUS) {
                // Чим ближче курсор, тим сильніший ефект
                const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS;
                
                // Відштовхуємо у протилежний від курсора бік
                // Якщо distX додатній (курсор справа), то ми рухаємо вліво (від'ємний translateX)
                const moveX = (distX / distance || 0) * -REPULSION_FORCE * force;
                const moveY = (distY / distance || 0) * -REPULSION_FORCE * force;
                
                // Додаємо випадковості повороту для "недбалості"
                const rotate = moveX * 0.5;

                // Піднімаємо падаючу тінь, але залишаємо базовий об'єм дерева на місці
                const liftShadow = `
                    -3px 4px 0px #704d2e, 
                    ${-3 - moveX/5}px ${5 - moveY/5}px ${15 * force}px rgba(0,0,0,0.6), 
                    inset 2px 2px 5px rgba(255,255,255,0.8), 
                    inset -2px -2px 5px rgba(0,0,0,0.2)
                `;

                tile.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(1.05)`;
                tile.style.boxShadow = liftShadow;
                tile.style.zIndex = "10";
            } else {
                // Плавне повернення завдяки CSS transition
                tile.style.transform = '';
                tile.style.boxShadow = '';
                tile.style.zIndex = "2";
            }
        });
    };

    document.addEventListener('mousemove', scrabbleInteractionHandler);
}

export function removeScrabbleInteraction() {
    if (scrabbleInteractionHandler) {
        document.removeEventListener('mousemove', scrabbleInteractionHandler);
        // Скидаємо стилі всіх фішок, щоб вони "впали" назад, якщо ми залишили сторінку під час анімації
        const tiles = document.querySelectorAll('.scrabble-tile');
        tiles.forEach(tile => {
            tile.style.transform = '';
            tile.style.boxShadow = '';
            tile.style.zIndex = "2";
        });
    }
}

export function restoreScrabbleInteraction() {
    if (scrabbleInteractionHandler) {
        document.addEventListener('mousemove', scrabbleInteractionHandler);
    }
}