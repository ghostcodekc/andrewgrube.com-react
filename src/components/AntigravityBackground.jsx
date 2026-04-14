import React, { useEffect, useRef } from 'react';

const AntigravityBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <div 
            ref={bgRef}
            className="ring-particles-bg fixed inset-0 -z-30 pointer-events-none"
        />
    );
};

export default AntigravityBackground;
