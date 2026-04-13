// =========================================
// RUMMIKUB THEME LOGIC
// =========================================

import { boardGames } from "../database.js";

// Global Theme State
const rkColors = ['#d32f2f', '#1976d2', '#f57c00', '#2b2b2b']; 
let colorIndex = 0;
let btnHoverHandler = null;
let scrollParallaxHandler = null;

// =========================================
// INITIALIZATION
// =========================================

export function initRummikubTiles() {
    initTableBackground();
    initColorSwitching();
    initCustomRulesTile();

    const header = document.querySelector('.game-header-section');
    const rummikubData = boardGames.find(g => g.id === 'rummikub');

    if (header && rummikubData?.assets?.cover) {
        init3DBox(header);
        spawnScatterTiles(25, header);
    }
}

// =========================================
// THEME COMPONENTS
// =========================================

function initTableBackground() {
    const tableBg = document.createElement('div');
    tableBg.id = 'wood-table-bg';
    document.body.prepend(tableBg); 

    let ticking = false; 

    // Parallax effect for the wooden table
    scrollParallaxHandler = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                tableBg.style.transform = `perspective(1200px) rotateX(45deg) translateY(-${scrolled * 0.3}px)`;
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', scrollParallaxHandler, { passive: true });
    scrollParallaxHandler(); 
}

function initColorSwitching() {
    const interactiveBtns = [
        document.getElementById('back-btn'),
        document.getElementById('gal-prev'),
        document.getElementById('gal-next')
    ].filter(Boolean); 

    if (interactiveBtns.length === 0) return;

    document.body.style.setProperty('--rk-hover-color', rkColors[colorIndex]);
    
    // Cycle through Rummikub colors on button hover
    btnHoverHandler = () => {
        colorIndex = (colorIndex + 1) % rkColors.length;
        document.body.style.setProperty('--rk-hover-color', rkColors[colorIndex]);
    };
    
    interactiveBtns.forEach(btn => btn.addEventListener('mouseenter', btnHoverHandler));
}

function initCustomRulesTile() {
    const ruleLinks = Array.from(document.querySelectorAll('.action-btn'));
    const rulesBtn = ruleLinks.find(el => el.textContent.includes('Читати правила')) || ruleLinks.find(el => el.textContent.includes('Rules'));
    const infoCard = document.querySelector('.game-info-card');

    if (!rulesBtn || !infoCard) return;

    const pdfLink = rulesBtn.getAttribute('href');
    rulesBtn.style.display = 'none'; 

    // Replace standard button with interactive 3D rules tile
    const customRulesTile = document.createElement('a');
    customRulesTile.href = pdfLink;
    customRulesTile.target = '_blank';
    customRulesTile.className = 'rk-rules-tile';
    customRulesTile.id = 'rk-custom-rules';

    customRulesTile.innerHTML = `<img src="./assets/rummikub/rules-pic.png" onerror="this.style.display='none'" alt="Rules">`;
    
    infoCard.appendChild(customRulesTile);
    infoCard.style.position = 'relative'; 
}

function init3DBox(container) {
    const boxWrapper = document.createElement('div');
    boxWrapper.className = 'rk-3d-box-wrapper';
    boxWrapper.id = 'rk-dynamic-box';

    const boxShadow = document.createElement('div');
    boxShadow.className = 'rk-box-shadow';
    boxWrapper.appendChild(boxShadow);

    const boxEntity = document.createElement('div');
    boxEntity.className = 'rk-box-entity';

    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    // Apply textures to the 3D box faces
    faces.forEach(face => {
        const faceEl = document.createElement('div');
        faceEl.className = `rk-box-face rk-face-${face}`;
        
        if (face === 'front') {
            faceEl.style.backgroundImage = `url('./assets/rummikub/rum-front.jpg')`;
            faceEl.style.backgroundColor = 'transparent'; 
        } else if (face === 'right' || face === 'left') {
            faceEl.style.backgroundImage = `url('./assets/rummikub/rum-long.png')`;
        } else if (face === 'top' || face === 'bottom') {
            faceEl.style.backgroundImage = `url('./assets/rummikub/rum-short.png')`;
        }
        
        boxEntity.appendChild(faceEl);
    });

    boxWrapper.appendChild(boxEntity);
    container.appendChild(boxWrapper);
}

// =========================================
// SCATTERED TILES GENERATION
// =========================================

function generateUniqueDeck() {
    const deck = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 13; col++) {
            deck.push({ row, col });
        }
    }
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function spawnScatterTiles(count, container) {
    const cw = window.innerWidth;
    
    // Areas where tiles are not allowed to drop (Logo and 3D Box)
    const forbiddenZones = [
        { left: cw / 2 - 580, right: cw / 2 + 580, top: 150, bottom: 450 },
        { left: cw / 2 - 200, right: cw / 2 + 275, top: 800, bottom: 1250 } 
    ];
    
    const tiles = [];
    const tileW = 90; 
    const tileH = 110;
    
    const jokerIndex = Math.floor(Math.random() * count);
    const deck = generateUniqueDeck();
    
    const wrapper = document.createElement('div');
    wrapper.className = 'rk-scatter-wrapper';
    wrapper.id = 'rk-scatter-layer';
    
    for (let i = 0; i < count; i++) {
        let x, y, overlap;
        let attempts = 0;
        
        // Find a random safe spot for the tile
        do {
            overlap = false;
            x = Math.random() * (cw - 120) + 30;
            y = Math.random() * 1100 + 100;
            
            const rect = { left: x, right: x + tileW, top: y, bottom: y + tileH };
            
            // Check collisions against zones
            for (let z of forbiddenZones) {
                if (!(rect.right < z.left || rect.left > z.right || rect.bottom < z.top || rect.top > z.bottom)) {
                    overlap = true; break;
                }
            }
            // Check collisions against other generated tiles
            if (!overlap) {
                for (let t of tiles) {
                    const z = { left: t.x, right: t.x + tileW, top: t.y, bottom: t.y + tileH };
                    if (!(rect.right < z.left || rect.left > z.right || rect.bottom < z.top || rect.top > z.bottom)) {
                        overlap = true; break;
                    }
                }
            }
            attempts++;
        } while (overlap && attempts < 100);
        
        if (!overlap) {
            tiles.push({x, y});
            createSingleScatterTile(wrapper, i, jokerIndex, deck, x, y);
        }
    }
    container.appendChild(wrapper);
}

function createSingleScatterTile(wrapper, index, jokerIndex, deck, x, y) {
    const angleDeg = Math.random() * 360;
    
    // Less perspective tilt for tiles closer to camera
    const dynamicRotateX = 65 + (750 - y) * 0.01;
    
    const isJoker = (index === jokerIndex);
    let spriteCol = 0, spriteRow = 0;
    
    if (!isJoker) {
        const drawn = deck.pop();
        spriteCol = drawn.col;
        spriteRow = drawn.row;
    }

    const tileNode = document.createElement('div');
    tileNode.className = 'rk-scatter-tile';
    tileNode.style.left = `${x}px`;
    tileNode.style.top = `${y}px`;
    tileNode.style.setProperty('--angle', `${angleDeg}deg`);
    tileNode.style.transform = `rotateX(${dynamicRotateX}deg) rotateZ(${angleDeg}deg)`;
    
    const shadow = document.createElement('div');
    shadow.className = 'rk-scatter-shadow';
    tileNode.appendChild(shadow);
    
    const entity = document.createElement('div');
    entity.className = 'rk-scatter-entity';
    
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    
    faces.forEach(face => {
        const faceEl = document.createElement('div');
        faceEl.className = `rk-scatter-face rk-scatter-${face}`;
        
        // Base plastic layer visible through rounded corners
        if (face) faceEl.style.backgroundColor = '#bdaa88ff';
        
        if (face === 'front') {
            faceEl.style.filter = "brightness(1.1) contrast(1.05)";
            faceEl.style.borderRadius = "4px";
            
            if (isJoker) {
                faceEl.style.backgroundImage = "url('./assets/rummikub/joker-pic.png')";
                faceEl.style.backgroundColor = "transparent";
                faceEl.style.backgroundSize = "cover";
            } else {
                // CSS Sprite mapping config (gaps are % of single tile width/height)
                const gapX = 0.05; 
                const gapY = 0.05; 
                
                const bgW = 1300 + 1200 * gapX;
                const bgH = 400 + 300 * gapY;
                
                faceEl.style.backgroundImage = "url('./assets/rummikub/all-tiles-sprite.png')";
                faceEl.style.backgroundSize = `${bgW}% ${bgH}%`;
                faceEl.style.backgroundPosition = `${(spriteCol / 12) * 100}% ${(spriteRow / 3) * 100}%`;
                faceEl.style.backgroundColor = "transparent";
            }
        }

        if (face === 'back') {
            faceEl.style.backgroundImage = "url('./assets/rummikub/tile-back.png')";
            faceEl.style.backgroundSize = "cover";
            faceEl.style.borderRadius = "4px";
        }
        
        entity.appendChild(faceEl);
    });
    
    tileNode.appendChild(entity);
    wrapper.appendChild(tileNode);
}

// =========================================
// CLEANUP LOGIC
// =========================================

export function stopRummikubTiles() {
    const interactiveBtns = [
        document.getElementById('back-btn'),
        document.getElementById('gal-prev'),
        document.getElementById('gal-next')
    ].filter(Boolean);
    
    if (btnHoverHandler) {
        interactiveBtns.forEach(btn => btn.removeEventListener('mouseenter', btnHoverHandler));
    }
    document.body.style.removeProperty('--rk-hover-color');
    
    if (scrollParallaxHandler) {
        window.removeEventListener('scroll', scrollParallaxHandler);
    }
    
    ['wood-table-bg', 'rk-custom-rules', 'rk-dynamic-box', 'rk-scatter-layer'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });
}