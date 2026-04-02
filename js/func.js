// Functions
import { boardGames } from './database.js';

const contentArea = document.getElementById('content-area');
const catalogView = document.getElementById('catalog-view');
const gamePageView = document.getElementById('game-page-view');

let canvasAnimationId = null;


function drawStar(ctx, x, y, radius, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle); 
    ctx.beginPath();
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < 5; i++) {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - (radius * 0.4));
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.fill();
    ctx.restore();
}

function initConstellationCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const setSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const numParticles = Math.floor((canvas.width * canvas.height) / 5000);
    const particles = [];
    const mouse = { x: -1000, y: -1000 };

    const headerContainer = canvas.closest('.game-header-section');
    if (headerContainer) {
        headerContainer.addEventListener('mousemove', e => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left; 
            mouse.y = e.clientY - rect.top;
        });
        headerContainer.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });
    }

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 3 + 1, 
            angle: Math.random() * Math.PI * 2, // Випадковий початковий кут
            vAngle: (Math.random() - 0.5) * 0.05 // Випадкова швидкість обертання
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < numParticles; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            p.angle += p.vAngle; // Збільшуємо кут для обертання

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.fillStyle = 'rgba(255, 230, 180, 0.9)';
            drawStar(ctx, p.x, p.y, p.radius, p.angle); // Передаємо кут!

            const distMouse = Math.sqrt((mouse.x - p.x)**2 + (mouse.y - p.y)**2);
            if (distMouse < 550) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(255, 230, 180, ${1 - distMouse/150})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }

            for (let j = i + 1; j < numParticles; j++) {
                const p2 = particles[j];
                const dist = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 230, 180, ${0.3 - dist/200})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        canvasAnimationId = requestAnimationFrame(animate);
    }
    animate();
}



export function renderCatalog(gamesArray) {
    if (!contentArea) {return;}
    contentArea.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'games-grid view-shop';

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




function openGamePage(gameId) {
    const game = boardGames.find(g => g.id === gameId);
    if (!game) return;

    document.body.className = ''; 
    if (game.themeClass) {document.body.classList.add(game.themeClass);}   

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
            
            // Якщо є в колекції - додаємо класи для 3D тільки на обгортку картинки
            const isOwnedWrapper = exp.owned ? 'tilt-wrapper' : '';
            const isOwnedTarget = exp.owned ? 'tilt-target' : '';
            
            return `
            <div style="margin-bottom: 20px;">
                <div class="expansion-card-horizontal ${exp.owned ? '' : 'not-owned'}">
                    <div class="exp-image-wrap ${isOwnedWrapper}">
                        <img src="${exp.cover}" alt="${exp.title}" class="${isOwnedTarget} exp-lightbox-trigger" loading="lazy" style="cursor: pointer;">
                    </div>
                    <div class="expansion-content">
                        <h3>${exp.title}</h3><p>${exp.description}</p>
                        ${exp.owned ? '<span class="badge owned">В колекції</span>' : '<span class="badge wishlist">У планах</span>'}
                        ${expButton}
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

    gamePageView.innerHTML = `
        ${headerHTML}
        ${galleryHTML}
        ${infoHTML}
        ${expansionsHTML}
        ${lightboxHTML}
    `;

    catalogView.classList.add('hidden');
    gamePageView.classList.remove('hidden');




// --- ЛОГІКА ІНТЕРАКТИВУ (ПІСЛЯ ТОГО ЯК HTML НАМАЛЬОВАНО) ---

    if (game.id === 'dixit') {
        initConstellationCanvas('game-canvas-bg');
    }

    // 1. Кнопка назад
    document.getElementById('back-btn').addEventListener('click', () => {
        if (canvasAnimationId) cancelAnimationFrame(canvasAnimationId);
        gamePageView.classList.add('hidden');
        catalogView.classList.remove('hidden');
        document.body.className = ''; 
    });

    const scrollContainer = document.getElementById('gallery-scroll');
    if (scrollContainer) {
        const prevBtn = document.getElementById('gal-prev');
        const nextBtn = document.getElementById('gal-next');
        const checkArrowsVisibility = () => {
            // Використовуємо Math.ceil для точності пікселів на деяких екранах
            if (scrollContainer.scrollWidth <= Math.ceil(scrollContainer.clientWidth)) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex'; // flex, щоб зберегти центрування іконок
                nextBtn.style.display = 'flex';
            }
        };

        // 1. Створюємо "Спостерігача" за зміною розміру
        const resizeObserver = new ResizeObserver(() => {
            checkArrowsVisibility();
        });
        
        // Кажемо йому стежити за нашою галереєю
        resizeObserver.observe(scrollContainer);

        // 2. Логіка кліків по стрілочках
        prevBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: -300, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    // Універсальний 3D Tilt для ВСІХ хітбоксів (.tilt-wrapper)
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

    // Lightbox
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

            setTimeout(() => {
                lbImg.classList.remove('lightbox-anim');
            }, 300);
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
                
                // Ховаємо навігацію
                document.getElementById('lb-prev').style.display = 'none';
                document.getElementById('lb-next').style.display = 'none';
                
                // Перезапускаємо анімацію зуму
                lbImg.classList.remove('lightbox-anim');
                void lbImg.offsetWidth; 
                lbImg.classList.add('lightbox-anim');
                lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
                setTimeout(() => lbImg.classList.remove('lightbox-anim'), 300);
                lightbox.classList.remove('hidden');
            });
        });

        document.getElementById('lb-close').addEventListener('click', () => lightbox.classList.add('hidden'));
        
        // НОВЕ: Закриваємо Lightbox при кліку на темний фон!
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
            if (!isLightboxTiltable) return; // Якщо не перше фото і не доповнення - виходимо
            
            // Рахуємо відносно всього вікна екрану
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const x = e.clientX; 
            const y = e.clientY;
            
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            lbImg.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Скидаємо поворот, коли мишка виходить за межі екрану
        lightbox.addEventListener('mouseleave', () => {
            if (!isLightboxTiltable) return;
            lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    }
}