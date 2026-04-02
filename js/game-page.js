// =========================================
// GAME PAGE BUILDER & INTERACTIVITY
// =========================================
import { boardGames } from './database.js';
import { initConstellationCanvas, stopConstellationCanvas } from './dixit-stars.js';

export function openGamePage(gameId) {
    const game = boardGames.find(g => g.id === gameId);
    if (!game) return;

    const catalogView = document.getElementById('catalog-view');
    const gamePageView = document.getElementById('game-page-view');

    // =========================================
    // 1. PREPARE THEME & HTML COMPONENTS
    // =========================================
    document.body.className = ''; 
    if (game.themeClass) { document.body.classList.add(game.themeClass); } 
    
    const fullTextHTML = game.fullDescription.map(paragraph => `<p>${paragraph}</p>`).join('');
    const heroImageSrc = game.assets.logo ? game.assets.logo : game.assets.cover;

    const headerHTML = `
        <div class="game-header-section">
            <div class="header-background">
                <canvas id="game-canvas-bg"></canvas>
            </div>
            <button id="back-btn" class="back-btn">⬅ Повернутися до каталогу</button>
            <img src="${heroImageSrc}" class="game-profile-cover" alt="${game.title}" onerror="this.onerror=null; this.src='https://placehold.co/400x600/eeddc6/5c3a21?text=Cover';">
        </div>
    `;

    let galleryHTML = '';
    if (game.assets.gallery && game.assets.gallery.length > 0) {
        const imagesHTML = game.assets.gallery.map((imgSrc, index) => {
            if (index === 0) {
                return `<div class="tilt-wrapper gallery-thumb-wrap"><img src="${imgSrc}" class="tilt-target gallery-thumb" data-index="${index}" alt="Gameplay"></div>`;
            }
            return `<img src="${imgSrc}" class="gallery-thumb" data-index="${index}" loading="lazy" alt="Gameplay">`;
        }).join('');
        
        galleryHTML = `
            <div class="gallery-section">
                <h2>Фото геймплею</h2>
                <div class="gallery-slider-wrap">
                    <button class="glass-arrow prev-arrow" id="gal-prev">❮</button>
                    <div class="gameplay-gallery" id="gallery-scroll">${imagesHTML}</div>
                    <button class="glass-arrow next-arrow" id="gal-next">❯</button>
                </div>
            </div>
        `;
    }

    let baseGameButtons = `<a href="${game.assets.rules}" target="_blank" class="action-btn">📖 Читати правила (PDF)</a>`;
    if (game.assets.cardsPdf) {
        baseGameButtons += `<a href="${game.assets.cardsPdf}" target="_blank" class="action-btn secondary-btn">🃏 Перегляд карт </a>`;
    }

    const infoHTML = `
        <div class="game-info-card">
            <h1>${game.title}</h1>
            <div class="card-stats">
                <span>👥 ${game.players.min}-${game.players.max}</span>
                <span>⏱️ ${game.playTimeMinutes} хв</span>
                <span>🌍 ${game.language}</span>
            </div>
            <div class="game-description-text">${fullTextHTML}</div>
            <div class="action-buttons">
                ${baseGameButtons}
            </div>
        </div>
    `;

    let expansionsHTML = '';
    if (game.expansions && game.expansions.length > 0) {
        const expList = game.expansions.map(exp => {
            let expButton = exp.cardsPdf ? `<div class="action-buttons"><a href="${exp.cardsPdf}" target="_blank" class="action-btn secondary-btn btn-small">🃏 Перегляд карт</a></div>` : '';
            
            const isOwnedWrapper = exp.owned ? 'tilt-wrapper' : '';
            const isOwnedTarget = exp.owned ? 'tilt-target' : '';
            
            return `
            <div class="exp-item-container">
                <div class="expansion-card ${exp.owned ? '' : 'not-owned'}">
                    <div class="exp-image-wrap ${isOwnedWrapper}">
                        <img src="${exp.cover}" alt="${exp.title}" class="exp-lightbox-trigger ${isOwnedTarget}" loading="lazy" style="cursor: pointer;">
                    </div>
                    <div class="expansion-content">
                        <h3>${exp.title}</h3>
                        <p>${exp.description}</p>
                        <div class="exp-meta">
                            ${exp.owned ? '<span class="badge owned">В колекції</span>' : '<span class="badge wishlist">У планах</span>'}
                            ${expButton}
                        </div>
                    </div>
                </div>
            </div>
        `}).join('');
        expansionsHTML = `<div class="expansions-section"><h2>Доповнення</h2><div class="expansions-list">${expList}</div></div>`;
    }

    const lightboxHTML = `
        <div id="lightbox-modal" class="hidden">
            <button id="lb-close" class="glass-arrow">✖</button>
            <button id="lb-prev" class="glass-arrow lb-nav">❮</button>
            <div id="lb-tilt-wrapper">
                <img id="lb-image" class="tilt-target" src="" alt="Fullscreen">
            </div>
            <button id="lb-next" class="glass-arrow lb-nav">❯</button>
        </div>
    `;

    // =========================================
    // 2. RENDER CONTENT TO DOM
    // =========================================
    gamePageView.innerHTML = `
        ${headerHTML}
        ${galleryHTML}
        ${infoHTML}
        ${expansionsHTML}
        ${lightboxHTML}
    `;

    catalogView.classList.add('hidden');
    gamePageView.classList.remove('hidden');

    // =========================================
    // 3. INITIALIZE INTERACTIVITY
    // =========================================
    if (game.id === 'dixit') {
        initConstellationCanvas('game-canvas-bg');
    }

    // --- Back Button ---
    document.getElementById('back-btn').addEventListener('click', () => {
        stopConstellationCanvas();
        gamePageView.classList.add('hidden');
        catalogView.classList.remove('hidden');
        document.body.className = ''; 
    });

    // --- Gallery Slider ---
    const scrollContainer = document.getElementById('gallery-scroll');
    if (scrollContainer) {
        const prevBtn = document.getElementById('gal-prev');
        const nextBtn = document.getElementById('gal-next');
        const checkArrowsVisibility = () => {
            if (scrollContainer.scrollWidth <= Math.ceil(scrollContainer.clientWidth)) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
        };

        const resizeObserver = new ResizeObserver(() => checkArrowsVisibility());
        resizeObserver.observe(scrollContainer);

        prevBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: -300, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    // --- 3D Tilt Effect ---
    document.querySelectorAll('.tilt-wrapper').forEach(wrapper => {
        const target = wrapper.querySelector('.tilt-target');
        if (!target) return;
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height/2) / (rect.height/2)) * -15; 
            const rotateY = ((x - rect.width/2) / (rect.width/2)) * 15;
            target.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        wrapper.addEventListener('mouseleave', () => {
            target.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox-modal');
    if (lightbox) {
        const lbImg = document.getElementById('lb-image');
        let currentLbIndex = 0;
        let isLightboxTiltable = false;

        const updateLightbox = () => { 
            lbImg.src = game.assets.gallery[currentLbIndex]; 
            lbImg.classList.remove('lightbox-anim');
            void lbImg.offsetWidth; 
            lbImg.classList.add('lightbox-anim');
            lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
            setTimeout(() => lbImg.classList.remove('lightbox-anim'), 300);
        };

        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                currentLbIndex = parseInt(e.target.dataset.index);
                isLightboxTiltable = (currentLbIndex === 0);
                document.getElementById('lb-prev').style.display = 'flex';
                document.getElementById('lb-next').style.display = 'flex';
                updateLightbox();
                lightbox.classList.remove('hidden');
            });
        });

        document.querySelectorAll('.exp-lightbox-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                lbImg.src = e.target.src; 
                isLightboxTiltable = true;

                document.getElementById('lb-prev').style.display = 'none';
                document.getElementById('lb-next').style.display = 'none';

                lbImg.classList.remove('lightbox-anim');
                void lbImg.offsetWidth; 
                lbImg.classList.add('lightbox-anim');
                lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
                setTimeout(() => lbImg.classList.remove('lightbox-anim'), 300);
                lightbox.classList.remove('hidden');
            });
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.id === 'lb-tilt-wrapper' || e.target.id === 'lb-close') {
                lightbox.classList.add('hidden');
            }
        });

        document.getElementById('lb-prev').addEventListener('click', () => {
            currentLbIndex = (currentLbIndex - 1 + game.assets.gallery.length) % game.assets.gallery.length;
            isLightboxTiltable = (currentLbIndex === 0);
            updateLightbox();
        });
        
        document.getElementById('lb-next').addEventListener('click', () => {
            currentLbIndex = (currentLbIndex + 1) % game.assets.gallery.length;
            isLightboxTiltable = (currentLbIndex === 0);
            updateLightbox();
        });

        lightbox.addEventListener('mousemove', (e) => {
            if (!isLightboxTiltable) return; 
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const x = e.clientX; 
            const y = e.clientY;
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            lbImg.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        lightbox.addEventListener('mouseleave', () => {
            if (!isLightboxTiltable) return;
            lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    }
}