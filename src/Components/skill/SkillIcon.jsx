import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNodeJs, faReact, faJs, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './SkillIcon.css';

const SkillIcon = () => {
    const categories = ['frontend', 'backend', 'design'];
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionDirection, setTransitionDirection] = useState('right');
    const [animationKey, setAnimationKey] = useState(0); // Add key to force animation refresh

    const skills = {
        frontend: [
            { name: "HTML", percentage: 70 },
            { name: "CSS/SCSS", percentage: 80 },
            { name: "JavaScript", percentage: 85 },
            { name: "React", percentage: 90 },
            { name: "UI Libraries", percentage: 75 }
        ],
        backend: [
            { name: "Node.js", percentage: 75 },
            { name: "Express", percentage: 70 },
            { name: "MongoDB", percentage: 65 },
            { name: "SQL", percentage: 60 },
            { name: "API Design", percentage: 80 }
        ],
        design: [
            { name: "Figma", percentage: 85 },
            { name: "UI/UX", percentage: 75 },
            { name: "Prototyping", percentage: 70 },
            { name: "Wireframing", percentage: 80 }
        ]
    };

    // Auto-rotate every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const goToNext = () => {
        setTransitionDirection('right');
        setActiveIndex((prev) => (prev + 1) % categories.length);
        setAnimationKey(prev => prev + 1); // Force animation refresh
    };

    const goToPrev = () => {
        setTransitionDirection('left');
        setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
        setAnimationKey(prev => prev + 1); // Force animation refresh
    };

    const getCategoryTitle = () => {
        switch (categories[activeIndex]) {
            case 'frontend': return 'Frontend Skills';
            case 'backend': return 'Backend Skills';
            case 'design': return 'Design Skills';
            default: return '';
        }
    };

    return (
        <div className="skill-container">
            <div className="orbit-container">
                {/* Central Text */}
                <div className="center-text">Skills</div>

                {/* Orbit 1 - React Icon */}
                <div className="orbit orbit-1">
                    <div className="icon">
                        <FontAwesomeIcon icon={faReact} color="#61DAFB" size="lg" />
                    </div>
                </div>

                {/* Orbit 2 - Node.js Icon */}
                <div className="orbit orbit-2">
                    <div className="icon">
                        <FontAwesomeIcon icon={faNodeJs} color="#539E43" size="lg" />
                    </div>
                </div>

                {/* Orbit 3 - JavaScript Icon */}
                <div className="orbit orbit-3">
                    <div className="icon">
                        <FontAwesomeIcon icon={faJs} color="#F7DF1E" size="lg" />
                    </div>
                </div>

                {/* Orbit 4 - Database Icon */}
                <div className="orbit orbit-4">
                    <div className="icon">
                        <FontAwesomeIcon icon={faDatabase} color="#336791" size="lg" />
                    </div>
                </div>

                {/* Orbit 5 - Express.js Icon */}
                <div className="orbit orbit-5">
                    <div className="icon">
                        <span style={{ color: "#000", fontSize: "14px", fontWeight: "bold" }}>Ex</span>
                    </div>
                </div>

                {/* Orbit 6 - Figma Icon */}
                <div className="orbit orbit-6">
                    <div className="icon">
                        <FontAwesomeIcon icon={faFigma} color="#F24E1E" size="lg" />
                    </div>
                </div>
            </div>

            <div className="skills-percentage-container">
                <div className="skills-carousel">
                    <div className="carousel-navigation">
                        <button className="nav-arrow" onClick={goToPrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <h2 className="skills-title">{getCategoryTitle()}</h2>

                        <button className="nav-arrow" onClick={goToNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>

                    <div className={`carousel-content ${transitionDirection}`} key={animationKey}>
                        <div className="skills-list">
                            {skills[categories[activeIndex]].map((skill, index) => (
                                <div className="skill-item" key={index}>
                                    <div className="skill-info">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percent">{skill.percentage}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${skill.percentage}%`,
                                                animationDelay: `${index * 0.2}s`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillIcon;