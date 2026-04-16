// =========================================
// MAIN CONTROLLER & SEARCH
// =========================================
import { boardGames, firstPlayerConditions } from './database.js';
import { renderCatalog, initThemeToggle, initScrabbleInteraction } from './catalog.js';

// =========================================
// 1. INITIALIZATION
// =========================================
boardGames.sort((gameA, gameB) => {
    return gameA.id.localeCompare(gameB.id);
});

renderCatalog(boardGames);
initThemeToggle();
initScrabbleInteraction();

// =========================================
// 2. SEARCH & FILTERS (Clipboard)
// =========================================
const searchInput = document.getElementById('search-input');
const langUk = document.getElementById('lang-uk');
const langEn = document.getElementById('lang-en');
const langDe = document.getElementById('lang-de');
const langInd = document.getElementById('lang-ind');

// Dual Sliders elements
const playersMin = document.getElementById('players-min');
const playersMax = document.getElementById('players-max');
const playersValMin = document.getElementById('players-val-min');
const playersValMax = document.getElementById('players-val-max');
const playersFill = document.getElementById('players-fill');

const timeMin = document.getElementById('time-min');
const timeMax = document.getElementById('time-max');
const timeValMin = document.getElementById('time-val-min');
const timeValMax = document.getElementById('time-val-max');
const timeFill = document.getElementById('time-fill');

// Знаходимо максимальні обмеження з бази даних
let maxPossibleTime = 0;
let maxPossiblePlayers = 0;
boardGames.forEach(game => {
    if (game.playTimeMinutes && game.playTimeMinutes > maxPossibleTime) maxPossibleTime = game.playTimeMinutes;
    if (game.players && game.players.max && game.players.max > maxPossiblePlayers) maxPossiblePlayers = game.players.max;
});

function initDualSlider(minInput, maxInput, fillEl, labelMin, labelMax, absoluteMax) {
    if (!minInput || !maxInput) return;
    
    minInput.max = absoluteMax;
    maxInput.max = absoluteMax;
    maxInput.value = absoluteMax;

    function update() {
        let minVal = parseInt(minInput.value, 10);
        let maxVal = parseInt(maxInput.value, 10);
        
        // Prevent crossover
        if (minVal > maxVal) {
            if (this === minInput) {
                minInput.value = maxVal;
                minVal = maxVal;
            } else {
                maxInput.value = minVal;
                maxVal = minVal;
            }
        }
        
        if (labelMin) labelMin.textContent = minVal;
        if (labelMax) labelMax.textContent = maxVal;
        
        if (fillEl) {
            const percentMin = (minVal / absoluteMax) * 100;
            const percentMax = (maxVal / absoluteMax) * 100;
            fillEl.style.left = percentMin + '%';
            fillEl.style.width = (percentMax - percentMin) + '%';
        }
        
        applyFilters();
    }
    
    minInput.addEventListener('input', update);
    maxInput.addEventListener('input', update);
    
    // Initial UI Setup without triggering double filter
    if (labelMin) labelMin.textContent = minInput.value;
    if (labelMax) labelMax.textContent = maxInput.value;
    if (fillEl) {
        fillEl.style.left = '0%';
        fillEl.style.width = '100%';
    }
}

initDualSlider(playersMin, playersMax, playersFill, playersValMin, playersValMax, maxPossiblePlayers);
initDualSlider(timeMin, timeMax, timeFill, timeValMin, timeValMax, maxPossibleTime);

function applyFilters() {
    const searchText = searchInput ? searchInput.value.toLowerCase() : '';
    const isUk = langUk ? langUk.checked : false;
    const isEn = langEn ? langEn.checked : false;
    const isDe = langDe ? langDe.checked : false;
    const isInd = langInd ? langInd.checked : false;
    
    const minTimeWanted = timeMin ? parseInt(timeMin.value, 10) : 0;
    const maxTimeWanted = timeMax ? parseInt(timeMax.value, 10) : Infinity;
    
    const minPlayersWanted = playersMin ? parseInt(playersMin.value, 10) : 0;
    const maxPlayersWanted = playersMax ? parseInt(playersMax.value, 10) : Infinity;

    const filteredGames = boardGames.filter(game => {
        // 1. Text Search (по назві)
        const titleMatch = game.title.toLowerCase().includes(searchText);
        if (searchText && !titleMatch) return false;

        // 2. Language Filter (Логічне АБО)
        if (isUk || isEn || isDe || isInd) {
            const gl = game.language ? game.language.toLowerCase() : '';
            let langMatch = false;
            if (isUk && gl.includes('укра')) langMatch = true;
            if (isEn && gl.includes('eng')) langMatch = true;
            if (isDe && gl.includes('deu')) langMatch = true;
            if (isInd && gl.includes('independent')) langMatch = true;
            if (!langMatch) return false;
        }

        // 3. Time Filter (overlap logic: time falls within user bounds)
        // assuming game time is a single number playTimeMinutes
        if (game.playTimeMinutes) {
            if (game.playTimeMinutes < minTimeWanted || game.playTimeMinutes > maxTimeWanted) return false;
        } else {
            // if no time specified, maybe exclude if user restricts heavily, but for now allow
        }

        // 4. Players Filter (overlap logic)
        // user wants to play with [min, max] players. Game supports [game.min, game.max].
        // Overlap exists if game.min <= userMax AND game.max >= userMin
        if (game.players) {
            if (game.players.min > maxPlayersWanted || game.players.max < minPlayersWanted) return false; 
        }

        return true;
    });

    renderCatalog(filteredGames);
}

if (searchInput) searchInput.addEventListener('input', applyFilters);
if (langUk) langUk.addEventListener('change', applyFilters);
if (langEn) langEn.addEventListener('change', applyFilters);
if (langDe) langDe.addEventListener('change', applyFilters);
if (langInd) langInd.addEventListener('change', applyFilters);

// =========================================
// 3. RANDOMIZERS (Meeple & D6 -> Button)
// =========================================

const randomizerBtn = document.getElementById('game-randomizer-btn');
const marauderText = document.getElementById('marauder-text');

function handleMarauderOutsideClick(e) {
    if (!randomizerBtn || !marauderText) return;
    if (!randomizerBtn.contains(e.target) && !marauderText.contains(e.target)) {
        if (marauderText.classList.contains('revealed')) {
            marauderText.classList.remove('revealed');
        }
    }
}

if (randomizerBtn && marauderText) {
    randomizerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // If it's already showing text, fade it out first
        if (marauderText.classList.contains('revealed')) {
            marauderText.classList.remove('revealed');
            
            // Wait for fade out, then update and fade in
            setTimeout(() => {
                const randGame = boardGames[Math.floor(Math.random() * boardGames.length)];
                marauderText.textContent = `Зіграйте в ${randGame.title}!`;
                marauderText.classList.add('revealed');
            }, 600); // 600ms corresponds to halfway through the CSS transition
        } else {
            const randGame = boardGames[Math.floor(Math.random() * boardGames.length)];
            marauderText.textContent = `Зіграйте в ${randGame.title}!`;
            marauderText.classList.add('revealed');
        }
    });
}

const meepleContainer = document.getElementById('meeple-container');
const meepleBubble = document.getElementById('meeple-bubble');

const headerDiorama = document.querySelector('.header-diorama');
const clipboard = document.querySelector('.clipboard-board');
const scrabble = document.querySelector('.scrabble-board');
let extraMeeplesArray = [];
let hasExtraMeeples = false;
let resizeDelay;

function handleMeepleOutsideClick(e) {
    let clickedExtra = extraMeeplesArray.some(mep => mep.contains(e.target));
    let clickedMain = meepleContainer && meepleContainer.contains(e.target);
    
    if (!clickedExtra && !clickedMain && meepleBubble) {
        meepleBubble.classList.remove('revealed');
        // Revert z-index when hiding
        if (meepleContainer) meepleContainer.style.zIndex = "";
        extraMeeplesArray.forEach(m => m.style.zIndex = "");
    }
}

function handleWindowResize() {
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(checkAndHandleMeeples, 150); // 150ms debounce
}

export function mountCatalogListeners() {
    if (typeof handleMarauderOutsideClick !== 'undefined') {
        document.addEventListener('click', handleMarauderOutsideClick);
    }
    window.addEventListener('resize', handleWindowResize);
    document.addEventListener('click', handleMeepleOutsideClick);
}

export function unmountCatalogListeners() {
    if (typeof handleMarauderOutsideClick !== 'undefined') {
        document.removeEventListener('click', handleMarauderOutsideClick);
    }
    window.removeEventListener('resize', handleWindowResize);
    document.removeEventListener('click', handleMeepleOutsideClick);
}

function checkAndHandleMeeples() {
    if (!headerDiorama || !clipboard || !scrabble) return;
    
    const dioramaRect = headerDiorama.getBoundingClientRect();
    const clipRect = clipboard.getBoundingClientRect();
    const scrabRect = scrabble.getBoundingClientRect();
    
    const safeLeft = (clipRect.right - dioramaRect.left) + 30;
    const safeRight = (scrabRect.left - dioramaRect.left) - 80;
    const safeWidth = safeRight - safeLeft;
    
    const safeTop = 60; 
    const safeBottom = dioramaRect.height - 800;
    const safeHeight = safeBottom - safeTop;

    const isEnoughSpace = (safeWidth > 150 && safeHeight > 100);

    if (isEnoughSpace && !hasExtraMeeples) {
        spawnExtraMeeples(safeLeft, safeWidth, safeTop, safeHeight, dioramaRect);
        hasExtraMeeples = true;
    } else if (!isEnoughSpace && hasExtraMeeples) {
        removeExtraMeeples();
        hasExtraMeeples = false;
    }
}

const meepleColorsConfig = [
    "hue-rotate(300deg) saturate(1.5)", // Red
    "hue-rotate(335deg) saturate(1.2)", // Orange
    "hue-rotate(0deg)",                 // Yellow (Base)
    "hue-rotate(140deg) saturate(1.5)", // Light Blue (Cyan)
    "hue-rotate(270deg) saturate(1.3) brightness(1.1)", // Pink
    "grayscale(100%) brightness(350%)", // White
    "grayscale(100%) brightness(100%) ", // Gray
    "grayscale(100%) brightness(20%) contrast(150%)"  // Black
];

function meepleClickHandler(e) {
    e.stopPropagation(); 
    const mep = e.currentTarget;
    
    // Reset z-index for all
    meepleContainer.style.zIndex = "";
    extraMeeplesArray.forEach(m => m.style.zIndex = "");
    
    // Elevate the clicked meeple
    mep.style.zIndex = "1000";
    
    const randIndex = Math.floor(Math.random() * firstPlayerConditions.length);
    meepleBubble.textContent = firstPlayerConditions[randIndex];
    
    mep.appendChild(meepleBubble);
    
    const parentRot = parseFloat(mep.dataset.rotation || 0);
    meepleBubble.style.transform = `translateX(-50%) translateY(10px) scale(0.8) rotate(${-parentRot}deg)`;
    
    meepleBubble.classList.remove('revealed');
    
    setTimeout(() => {
        meepleBubble.classList.add('revealed');
        meepleBubble.style.transform = `translateX(-50%) translateY(0px) scale(1) rotate(${-parentRot}deg)`;
    }, 10);
}

function spawnExtraMeeples(safeLeft, safeWidth, safeTop, safeHeight, dioramaRect) {
    const extraCount = Math.floor(Math.random() * 4) + 4; 
    
    const mainMeepleRect = meepleContainer.getBoundingClientRect();
    const placedRects = [{
        x: mainMeepleRect.left - dioramaRect.left,
        y: mainMeepleRect.top - dioramaRect.top,
        w: mainMeepleRect.width,
        h: mainMeepleRect.height
    }];
    
    for(let i=0; i<extraCount; i++) {
        let placed = false;
        let randomX, randomY;
        const meepleSize = 65; 
        
        for(let attempt=0; attempt<50; attempt++) {
            randomX = safeLeft + Math.random() * (safeWidth - meepleSize);
            randomY = safeTop + Math.random() * (safeHeight - meepleSize);
            
            let collision = false;
            for(let r of placedRects) {
                const padding = 20; 
                if (randomX < r.x + r.w + padding &&
                    randomX + meepleSize + padding > r.x &&
                    randomY < r.y + r.h + padding &&
                    randomY + meepleSize + padding > r.y) {
                    collision = true;
                    break;
                }
            }
            if (!collision) {
                placed = true;
                placedRects.push({x: randomX, y: randomY, w: meepleSize, h: meepleSize});
                break; 
            }
        }
        
        if (placed) {
            const extra = document.createElement('div');
            extra.className = 'extra-meeple';
            extra.title = "Хто ходить першим?";
            
            const meepleRot = (Math.random() - 0.5) * 120; 
            
            extra.style.top = `${randomY}px`;
            extra.style.left = `${randomX}px`;
            extra.style.transform = `rotate(${meepleRot}deg)`;
            extra.dataset.rotation = meepleRot; 
            
            const img = document.createElement('img');
            img.src = 'assets/textures/meeple.webp';
            img.className = 'meeple-img';
            
            const selectedColorFilter = meepleColorsConfig[Math.floor(Math.random() * meepleColorsConfig.length)];
            img.style.setProperty('--meeple-color', selectedColorFilter);
            
            extra.appendChild(img);
            headerDiorama.appendChild(extra);
            extraMeeplesArray.push(extra);
            
            extra.addEventListener('click', meepleClickHandler);
        }
    }
}

function removeExtraMeeples() {
    extraMeeplesArray.forEach(mep => {
        if (mep.contains(meepleBubble)) {
            meepleBubble.classList.remove('revealed');
            meepleContainer.appendChild(meepleBubble);
        }
        mep.remove();
    });
    extraMeeplesArray = [];
}

if (meepleContainer && meepleBubble && firstPlayerConditions) {
    // Store original rotation for main meeple
    meepleContainer.dataset.rotation = "8";
    
    // Set a random color filter for the MAIN meeple on load
    const mainMeepleImg = meepleContainer.querySelector('.meeple-img');
    if (mainMeepleImg) {
        const randMain = meepleColorsConfig[Math.floor(Math.random() * meepleColorsConfig.length)];
        mainMeepleImg.style.setProperty('--meeple-color', randMain);
    }
    
    meepleContainer.addEventListener('click', meepleClickHandler);
    
    // Первинна перевірка при завантаженні (з короткою затримкою для відмальовки layout'у)
    setTimeout(checkAndHandleMeeples, 100);
}

// Mount the event listeners initially
mountCatalogListeners();