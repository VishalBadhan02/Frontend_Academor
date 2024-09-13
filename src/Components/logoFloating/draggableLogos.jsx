import React, { useState, useEffect } from 'react';
import { FaGithub, FaApple, FaGoogle } from 'react-icons/fa';

const MovingLogos = () => {
    const [positions, setPositions] = useState({
        google: { x: 0, y: 0 },
        apple: { x: 100, y: 100 },
        github: { x: 200, y: 200 },
    });

    const getRandomPosition = (maxWidth, maxHeight) => {
        return {
            x: Math.floor(Math.random() * (maxWidth - 50)), // subtracting the size of the logo
            y: Math.floor(Math.random() * (maxHeight - 50)),
        };
    };

    useEffect(() => {
        const updatePositions = () => {
            const container = document.querySelector('.moving-area');
            const maxWidth = container.clientWidth;
            const maxHeight = container.clientHeight;

            setPositions({
                google: getRandomPosition(maxWidth, maxHeight),
                apple: getRandomPosition(maxWidth, maxHeight),
                github: getRandomPosition(maxWidth, maxHeight),
            });
        };

        // Update positions every 2 seconds
        const interval = setInterval(updatePositions, 2000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <h4 className="text-center">Watch the logos move freely!</h4>
            <div className="moving-area">
                {/* Google Logo */}
                <div
                    className="logo-container"
                    style={{
                        transform: `translate(${positions.google.x}px, ${positions.google.y}px)`,
                    }}
                >
                    <FaGoogle className="logo" size={50} />
                </div>

                {/* Apple Logo */}
                <div
                    className="logo-container"
                    style={{
                        transform: `translate(${positions.apple.x}px, ${positions.apple.y}px)`,
                    }}
                >
                    <FaApple className="logo" size={50} />
                </div>

                {/* GitHub Logo */}
                <div
                    className="logo-container"
                    style={{
                        transform: `translate(${positions.github.x}px, ${positions.github.y}px)`,
                    }}
                >
                    <FaGithub className="logo" size={50} />
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f5f5f5;
                }

                .moving-area {
                    position: relative;
                    width: 500px;
                    height: 300px;
                    border: 2px dashed #ccc;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: white;
                    position: relative;
                }

                .logo-container {
                    position: absolute;
                    transition: transform 2s ease-in-out;
                }

                .logo {
                    color: #000;
                }
            `}</style>
        </div>
    );
};

export default MovingLogos;
