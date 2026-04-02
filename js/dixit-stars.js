// =========================================
// DIXIT THEME: CONSTELLATION ANIMATION
// =========================================

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

// =========================================
// START ANIMATION
// =========================================

export function initConstellationCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let numParticles = 0;
    let particles = [];
    const mouse = { x: -1000, y: -1000 };

    const generateStars = () => {
        numParticles = Math.floor((canvas.width * canvas.height) / 5000);
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 3 + 1, 
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.05
            });
        }
    };

    const setSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStars(); 
    };
    setSize();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSize, 250); 
    });

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX; mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < numParticles; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            p.angle += p.vAngle; 

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.fillStyle = 'rgba(255, 230, 180, 0.9)';
            drawStar(ctx, p.x, p.y, p.radius, p.angle); 

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

// =========================================
// STOP ANIMATION (Performance optimization)
// =========================================

export function stopConstellationCanvas() {
    if (canvasAnimationId) {
        cancelAnimationFrame(canvasAnimationId);
        canvasAnimationId = null;
    }
}