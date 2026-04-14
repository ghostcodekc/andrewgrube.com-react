import React, { useEffect, useRef } from 'react';

function PRNG(seed) {
    let t = seed;
    return function() {
        t = 1831565813 + (t | 0) | 0;
        let a = Math.imul(t ^ (t >>> 15), 1 | t);
        return (((a = a + Math.imul(a ^ (a >>> 7), 61 | a) ^ a) ^ (a >>> 14)) >>> 0) / 4294967296;
    }
}

function hash(t) {
    let a = 43758.5453123 * Math.sin(t);
    return a - Math.floor(a);
}

const getBezierValue = (t, a, r, e, n) => {
    const i = 1 - t, s = t * t, o = i * i;
    return o * i * a + 3 * o * t * r + 3 * i * s * e + s * t * n;
};

const solveBezierX = (t, a, r) => {
    let e = t;
    for (let n = 0; n < 8; n++) {
        const val = getBezierValue(e, 0, a, r, 1);
        const diff = (getBezierValue(e + .001, 0, a, r, 1) - val) / .001;
        if (diff === 0) break;
        e -= (val - t) / diff;
    }
    return Math.max(0, Math.min(1, e));
};

const AntigravityBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const prng = PRNG(0);
        const randomInt = (t, a) => Math.floor(prng() * (a - t + 1)) + t;
        const randomFloat = (t, a) => t + prng() * (a - t);

        const M = randomInt(2, 8);
        const I = randomInt(1, 2);
        const S = hash(10) > .5 ? 1 : -1;
        const z = randomInt(2, 9);
        const x_mul = -S;
        const P_val = randomFloat(.2, .8);
        const V = randomInt(8, 20);

        const floatKeyframes = [
            { p: 0, x: 40, y: 40 },
            { p: 0.3333, x: 60, y: 45 },
            { p: 0.6666, x: 50, y: 60 },
            { p: 1, x: 40, y: 40 }
        ];

        let reqId;
        const startTime = performance.now();
        const w = .42, B = 0, y = .58, v = 1; 

        const draw = (t) => {
            const elapsed = t - startTime;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const n = 120 + 20 * (0.5 - 0.5 * Math.cos(elapsed * Math.PI * 2 / 120000));
            const i_val = 600;
            const c = 22;
            const l = 44;
            const m = 2;
            const d = 0.1;
            const u = 0.6;
            const h = "rgba(16, 185, 129, 0.25)"; 

            const floatElapsed = (elapsed % 60000) / 60000;
            let startK = floatKeyframes[0], endK = floatKeyframes[1];
            for (let i = 0; i < floatKeyframes.length - 1; i++) {
                if (floatElapsed >= floatKeyframes[i].p && floatElapsed <= floatKeyframes[i+1].p) {
                    startK = floatKeyframes[i];
                    endK = floatKeyframes[i+1];
                    break;
                }
            }
            
            let lp = (floatElapsed - startK.p) / (endK.p - startK.p);
            lp = lp * lp * (3 - 2 * lp); 
            const ringX = startK.x + (endK.x - startK.x) * lp;
            const ringY = startK.y + (endK.y - startK.y) * lp;

            const g = (elapsed / 1000) * (100 / 180);

            const k = canvas.width * ringX / 100;
            const b = canvas.height * ringY / 100;
            const C = g * Math.PI * 2;
            const R = n + i_val;
            const U = i_val / 2;

            ctx.fillStyle = h;

            for (let t_row = 0; t_row < c; t_row++) {
                const r = n + (c > 1 ? t_row / (c - 1) : 0) * i_val;
                for (let e = 0; e < l; e++) {
                    const currentAngle = (e / l) * Math.PI * 2;
                    const wave = Math.sin(currentAngle * M + C * I * S) + Math.sin(currentAngle * z + C * x_mul) + Math.sin(t_row * P_val + C);
                    
                    let alphaWave = (wave + 3) / 6;
                    alphaWave = Math.pow(Math.max(0, alphaWave), 1.5);
                    let currentAlpha = d + alphaWave * (u - d);

                    const dist = r + wave * V;
                    const px = k + Math.cos(currentAngle) * dist;
                    const py = b + Math.sin(currentAngle) * dist;

                    let fVal = Math.min(dist - n, R - dist) / U;
                    fVal = Math.max(0, Math.min(1, fVal));

                    const F = solveBezierX(fVal, w, y);
                    currentAlpha *= getBezierValue(F, 0, B, v, 1);
                    currentAlpha = Math.max(0, Math.min(1, currentAlpha));

                    if (currentAlpha > .01) {
                        ctx.globalAlpha = currentAlpha;
                        ctx.beginPath();
                        ctx.arc(px, py, m, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                }
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
            style={{ display: 'block' }}
        />
    );
};

export default AntigravityBackground;
