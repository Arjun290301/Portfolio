import React, { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import './project.css';

const Project = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const projects = [
        {
            id: 1,
            title: "Full-stack Food Delivery Application",
            image: "https://www.clariontech.com/hubfs/Food%20Delivery%20App%20Development.webp",
            shortDescription: "A comprehensive food delivery platform with user authentication and order tracking.",
            fullDescription: "A comprehensive food delivery platform with user authentication, menu browsing, cart functionality, and order tracking. Built with modern web technologies for a seamless user experience.",
            skills: ["React", "Node.js", "MongoDB", "Express", "Redux"],
            preview: "https://food-del-frontend-4a2g.onrender.com/",
            github: "https://github.com/Arjun290301/FOOD-DEL"
        },
        {
            id: 2,
            title: "E-commerce Dashboard",
            image: "https://img.freepik.com/premium-vector/online-shopping-with-smartphone-shop-shopping-cart_269039-853.jpg",
            shortDescription: "A fully responsive online store built with modern web technologies",
            fullDescription: "A fully responsive online store built with modern web technologies. It includes product listings, shopping cart functionality, user authentication, and secure checkout. Designed for a seamless user experience with dynamic product filtering and real-time updates.",
            skills: ["React.js", "Tailwind css", "Redux", "Stripe", "Firebase"],
            preview: "https://eshop-firebase.vercel.app/",
            github: "https://github.com/Arjun290301/E-COMweb"
        },
        {
            id: 3,
            title: "Social Media App",
            image: "https://camo.githubusercontent.com/692a53f74a76bc7e1efdc716ee29af71eaf870eeff66a5a6c8671af672847d9b/68747470733a2f2f696d672e6672656570696b2e636f6d2f7072656d69756d2d766563746f722f636861742d6170702d6c6f676f2d64657369676e2d74656d706c6174652d63616e2d62652d757365642d69636f6e2d636861742d6170706c69636174696f6e2d6c6f676f5f3630353931302d313732342e6a7067",
            shortDescription: "Feature-rich social platform with real-time messaging and notifications.",
            fullDescription: "A feature-rich social platform with real-time messaging, post creation, user profiles, and notifications. Includes image uploads, comment threading functionality, and comprehensive search.",
            skills: ["React.js", "JWT", "AWS", "WebSockets", "bcrypt"],
            preview: "https://chatspace-krbm.onrender.com",
            github: "https://github.com/Arjun290301/ChatApp"
        }
    ];

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    const getCardIndex = (index) => {
        return (index + projects.length) % projects.length;
    };

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div className="carousel-title">
                    <h1>My Projects</h1>
                    <div className="carousel-title-underline"></div>
                </div>

                <div className="carousel-track">
                    <div className="carousel-slides">
                        {[-1, 0, 1].map((offset) => {
                            const cardIndex = getCardIndex(activeIndex + offset);
                            const project = projects[cardIndex];
                            const isActive = offset === 0;

                            return (
                                <div
                                    key={project.id}
                                    className={`project-card ${isActive ? 'active' : offset === -1 ? 'prev' : 'next'}`}
                                >
                                    <div className="card-inner">
                                        <h2 className="card-title">{project.title}</h2>

                                        <div className="card-image">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                            />
                                        </div>

                                        <div className="card-content">
                                            <p className="card-description">
                                                {isActive ? project.fullDescription : project.shortDescription}
                                            </p>

                                            <div className="card-skills">
                                                {project.skills.map((skill, index) => (
                                                    <span key={index} className="skill-tag">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            {isActive && (
                                                <div className="card-buttons">
                                                    <a
                                                        href={project.preview}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-primary"
                                                    >
                                                        <ExternalLink size={16} />
                                                        <span>Preview</span>
                                                    </a>
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-secondary"
                                                    >
                                                        <Github size={16} />
                                                        <span>GitHub</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="carousel-nav-button prev"
                        aria-label="Previous project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="carousel-nav-button next"
                        aria-label="Next project"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="carousel-indicators">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`carousel-indicator ${activeIndex === index ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
