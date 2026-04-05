// =========================================
// 3D TILT EFFECT MODULE
// =========================================

export function initTiltEffect() {
    document.querySelectorAll('.tilt-wrapper').forEach(wrapper => {
        const target = wrapper.querySelector('.tilt-target');
        if (!target) return;
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
            target.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        wrapper.addEventListener('mouseleave', () => {
            target.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    });
}