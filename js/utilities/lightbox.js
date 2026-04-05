// =========================================
// LIGHTBOX GALLERY MODULE
// =========================================

export function initLightbox(gameAssetsGallery) {
    const lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) return;

    const lbImg = document.getElementById('lb-image');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    
    let currentLbIndex = 0;
    let isLightboxTiltable = false;

    // Refreshes lightbox image and apply basic animation
    const updateLightbox = () => {
        lbImg.src = gameAssetsGallery[currentLbIndex];
        lbImg.classList.remove('lightbox-anim');
        void lbImg.offsetWidth; 
        lbImg.classList.add('lightbox-anim');
        lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        setTimeout(() => lbImg.classList.remove('lightbox-anim'), 300);
    };

    // Initialize gallery thumbnails
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            currentLbIndex = parseInt(e.target.dataset.index);
            isLightboxTiltable = (currentLbIndex === 0);
            lbPrev.style.display = 'flex';
            lbNext.style.display = 'flex';
            updateLightbox();
            lightbox.classList.remove('hidden');
        });
    });

    // Initialize expansion triggers
    document.querySelectorAll('.exp-lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            lbImg.src = e.target.src;
            isLightboxTiltable = true;
            lbPrev.style.display = 'none';
            lbNext.style.display = 'none';
            lbImg.classList.remove('lightbox-anim');
            void lbImg.offsetWidth;
            lbImg.classList.add('lightbox-anim');
            lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
            setTimeout(() => lbImg.classList.remove('lightbox-anim'), 300);
            lightbox.classList.remove('hidden');
        });
    });

    // Gallery navigation
    lbPrev.addEventListener('click', (e) => {
        e.stopPropagation(); 
        currentLbIndex = (currentLbIndex - 1 + gameAssetsGallery.length) % gameAssetsGallery.length;
        isLightboxTiltable = (currentLbIndex === 0);
        updateLightbox();
    });
    
    lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLbIndex = (currentLbIndex + 1) % gameAssetsGallery.length;
        isLightboxTiltable = (currentLbIndex === 0);
        updateLightbox();
    });

    // Close lightbox on background click
    lightbox.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    // Dynamic 3D tilt effect on mouse move
    lightbox.addEventListener('mousemove', (e) => {
        if (!isLightboxTiltable) return;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const rotateX = ((e.clientY - centerY) / centerY) * -15;
        const rotateY = ((e.clientX - centerX) / centerX) * 15;
        lbImg.style.transform = `scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    lightbox.addEventListener('mouseleave', () => {
        if (!isLightboxTiltable) return;
        lbImg.style.transform = `scale(1) rotateX(0) rotateY(0)`;
    });
}