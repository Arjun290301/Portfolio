import React from 'react'
import AboutText from './AboutText'
import "./About.css"
import RotatingText from './RotatingText'
const About = () => {
    return <>
        <div className="about-content">
            <div className="heading">
                <h1 className='abth1'>About</h1>
            </div>
            <div className="content">


                <AboutText
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={0}
                    blurStrength={15}

                >
                    Full Stack Developer with nearly 3 years of experience crafting responsive, high-performance web applications using React.js, JavaScript, HTML5, CSS3, and Material UI on the frontend, alongside Node.js, Express.js, and MongoDB for backend development. I specialize in RESTful API integration and JWT authentication, focusing on creating seamless user experiences through clean, efficient code that combines technical expertise with design sensibility to deliver intuitive, powerful applications that consistently exceed expectations.
                </AboutText>
                <div className="animation">
                    <div className="animation-text">
                        From vision to reality - i
                    </div>

                    <RotatingText
                        texts={['Design', 'Develop', 'Deploy']}
                        mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-[#EBE9E1] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}

                    />

                </div>

            </div>
        </div>
    </>
}

export default About
