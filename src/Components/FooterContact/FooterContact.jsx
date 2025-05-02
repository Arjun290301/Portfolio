import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './FooterContact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


const FooterContact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        try {
            // Replace with your actual email service integration
            // Example with EmailJS

            const response = await emailjs.send(
                'service_ps12k5p',
                'template_mhmoehm',
                {
                    name: formData.fullName,
                    email: formData.email,
                    message: formData.message
                },
                'RfFaaXhpPIw8SOSAn'
            );

            if (response.status === 200) {
                setStatus('success');
                setFormData({ fullName: '', email: '', message: '' });
            } else {
                setStatus('error');
            }


            // Simulating email sending for demo
            setTimeout(() => {
                setStatus('success');
                setFormData({ fullName: '', email: '', message: '' });
                setSending(false);
            }, 1500);

        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
            setSending(false);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-heading">
                    <h2 className="footer-title">
                        Let's create something
                        <span className="footer-highlight">extraordinary together</span>
                    </h2>
                    <p className="footer-description">
                        Ready to transform your ideas into reality? From concept to completion, let's build
                        something that sets new standards and exceeds expectations.
                    </p>
                </div>

                <div className="footer-content">
                    <div className="footer-column">
                        <h3 className="footer-section-title">Let's Connect</h3>
                        <div>
                            <div className="contact-item">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                <span className="contact-text" style={{ marginLeft: '16px' }}>
                                    Arjun.S
                                </span>
                                <a
                                    href="https://www.linkedin.com/in/arjun-s-210910219/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-icon"
                                    style={{ marginLeft: '16px' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            </div>

                            <div className="contact-item">
                                <FontAwesomeIcon icon={faPhone} size="lg" />
                                <span className="contact-text" style={{ marginLeft: '16px' }}>9025185576</span>
                                <button className="contact-icon">

                                </button>
                            </div>
                        </div>

                        <h3 className="footer-section-title" style={{ marginTop: '1.5rem' }}>Send Me a Message</h3>
                        <div className="contact-item">
                            <span className="contact-text">arjunswaves08@gmail.com</span>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=arjunswaves08@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-icon"
                                style={{ marginLeft: '16px' }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </a>
                        </div>

                    </div>

                    <div className="footer-column">
                        <h3 className="footer-section-title">Let's Discuss Your Project</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your Full Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Your Email Address"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Let's create something amazing together!"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="submit-button"
                                >
                                    {sending ? 'Sending...' : 'Send Message'}
                                    {!sending && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13"></line>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                        </svg>
                                    )}
                                </button>
                                {status === 'success' && (
                                    <p className="success-message">Your message has been sent successfully!</p>
                                )}
                                {status === 'error' && (
                                    <p className="error-message">Failed to send message. Please try again.</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer-copyright">
                    <p>© {new Date().getFullYear()} Arjun.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterContact;