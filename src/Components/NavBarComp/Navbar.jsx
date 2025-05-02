import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                        onClick={closeMenu}
                    >
                        Arjun S
                    </Link>
                </div>

                <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link
                            to="home"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="about"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="skills"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Skills
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="timeline"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Experience
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="projects"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Projects
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="contact"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;