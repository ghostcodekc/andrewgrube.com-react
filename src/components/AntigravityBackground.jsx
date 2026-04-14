import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        let isInteractive = false;
        
        const loadWorklet = async () => {
            if (typeof window !== 'undefined' && 'paintWorklet' in CSS) {
                try {
                    await CSS.paintWorklet.addModule('https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js');
                } catch (e) {
                    console.error('Failed to load paintWorklet:', e);
                }
            }
        };
        loadWorklet();

        const elem = bgRef.current;
        if (!elem) return;

        const handlePointerMove = (e) => {
            if (!isInteractive) { 
                elem.classList.add('interactive'); 
                isInteractive = true; 
            }
            elem.style.setProperty('--ring-x', (e.clientX / window.innerWidth) * 100);
            elem.style.setProperty('--ring-y', (e.clientY / window.innerHeight) * 100);
            elem.style.setProperty('--ring-interactive', 1);
        };

        const handlePointerLeave = () => {
            elem.classList.remove('interactive'); 
            isInteractive = false;
            elem.style.setProperty('--ring-x', 50);
            elem.style.setProperty('--ring-y', 50);
            elem.style.setProperty('--ring-interactive', 0);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerleave', handlePointerLeave);
        };
    }, []);

    return (
        <div 
            ref={bgRef}
            className="ring-particles-bg fixed inset-0 -z-30 pointer-events-none"
        />
    );
};

export default AntigravityBackground;
