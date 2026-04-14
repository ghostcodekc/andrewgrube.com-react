import React, { useEffect, useRef } from 'react';

// A deterministic Pseudo-Random Number Generator (PRNG) 
function PRNG(seed) {
    let t = seed;
    return function() {
        t = 1831565813 + (t | 0) | 0;
        let a = Math.imul(t ^ (t >>> 15), 1 | t);
        return (((a = a + Math.imul(a ^ (a >>> 7), 61 | a) ^ a) ^ (a >>> 14)) >>> 0) / 4294967296;
    }
}

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // -----------------------------------------------------------------
        // The DNA of the Nebula: In Loving Memory (08/08/2013 - 04/15/2024)
        // -----------------------------------------------------------------
        const birth = { m: 8, d: 8, y: 2013 };
        const pass = { m: 4, d: 15, y: 2024 };
        
        // 1. Universal Seed:
        // We combine the birth and passing dates to form the unique cosmic seed.
        // This makes the entire nebula's structure a unique timeline of a life.
        const cosmicSeed = parseInt(`${birth.m}${birth.d}${birth.y}`) + parseInt(`${pass.m}${pass.d}${pass.y}`); 
        const random = PRNG(cosmicSeed);

        // Emerald & Zinc Palette matching the website's theme
        const palette = [
            '#10b981', '#34d399', '#059669', '#06b6d4', '#6ee7b7', '#e4e4e7'
        ];

        // 2. Cosmic Dust Density:
        // Desktop renders particles equal to the sum of both significant days (415 + 88 = 503).
        // Mobile renders a focused subset (88 + 15 = 103) to maintain performance.
        const numParticles = width > 768 ? (pass.m * 100 + pass.d) + (birth.m * 10 + birth.d) : (birth.m * 10 + birth.d) + pass.d; 
        const particles = [];
        
        // Expansion: On mobile, we push the distance significantly beyond the screen 
        // to avoid a "cramped" look, letting the nebula feel infinite.
        const expansionFactor = width > 768 ? 0.85 : 1.5;
        const maxDist = Math.max(width, height) * expansionFactor;

        for (let i = 0; i < numParticles; i++) {
            const randomU = random();
            const randomV = random();
            // Gaussian math using the seeded PRNG
            const r = Math.sqrt(-2.0 * Math.log(randomU)) * Math.cos(2.0 * Math.PI * randomV);
            
            particles.push({
                angle: random() * Math.PI * 2,
                distBase: random() * 20, 
                radiusSpread: Math.abs(r) * maxDist * 0.45, 
                size: random() * 1.5 + 0.5, 
                color: palette[Math.floor(random() * palette.length)],
                angleSpeed: (random() - 0.5) * 0.0003, 
                opacityOffset: random() * Math.PI * 2,
                sizeGlow: random() > 0.9 
            });
        }

        let reqId;
        const startTime = performance.now();

        const draw = (t) => {
            const elapsed = t - startTime;
            
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'screen';

            // 3. The Breathing Rate (Period):
            // The expansion cycle duration is derived from the span of a life.
            const period = pass.m * pass.d * pass.y; 
            const progress = (elapsed % period) / period;

            // Rebounds back and forth endlessly between 35% and 75% marks
            // (Shortened by ~20% from the 'beginning' collapse point)
            const easeT = 0.55 + 0.2 * Math.sin(progress * Math.PI * 2 - Math.PI / 2);

            const centerX = width / 2;
            const centerY = height / 2;

            // Faint emerald core glow
            const coreRadius = 30 + 200 * easeT;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
            gradient.addColorStop(0, `rgba(16, 185, 129, ${0.1 * (1 - easeT * 0.6)})`); 
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
            ctx.fill();

            // Render particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                const currentAngle = p.angle + elapsed * p.angleSpeed * (1 + easeT * 0.5); 
                const currentDist = p.distBase + p.radiusSpread * easeT;
                
                const x = centerX + Math.cos(currentAngle) * currentDist;
                const y = centerY + Math.sin(currentAngle) * currentDist;
                
                let alpha = 0.4 * (1 - easeT * 0.3); 
                alpha *= (Math.sin(elapsed * 0.0008 + p.opacityOffset) * 0.5 + 0.5); 
                
                // Boundaries removed to allow the nebula to bleed off-screen naturally

                ctx.fillStyle = p.color;
                ctx.globalAlpha = alpha;
                
                const currentSize = p.size * (1 + easeT * 0.2);

                if (p.sizeGlow) {
                    ctx.beginPath();
                    ctx.arc(x, y, currentSize * 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(x, y, currentSize, 0, Math.PI * 2);
                ctx.fill();
            }

            reqId = requestAnimationFrame(draw);
        };

        reqId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(reqId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-30 pointer-events-none"
        />
    );
};

export default AntigravityBackground;
