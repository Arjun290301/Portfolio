import { useState, useEffect, useRef } from 'react';

export default function ScrollingTimeline() {
  const [activeYear, setActiveYear] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const yearsRef = useRef([]);

  // Sample timeline data
  const timelineData = [
    {
      id: "01",
      year: "2024-Present",
      title: "Full-Stack Devloper",
      content: `OORT (Optius Order Removal Tool).:`,
      pt1: `* Developed User-Centric Interfaces: Designed responsive, visually appealing web UIs using HTML, CSS, Bootstrap, and
JavaScript, enhancing UX by 25%.`,
      pt2: `* Optimized Responsive Design: Utilized CSS media queries, Flexbox, and Bootstrap grid for seamless layouts across all
devices.`,
      pt3: `* Automated Order Management: Built an automated system, reducing paperwork by 70% using HTML forms, JavaScript
validation, and dynamic UI updates.`
    },
    {
      id: "02",
      year: "2022-23",
      title: "React Devloper",
      content: `AT&T:`,
      pt1: `* Enhanced Frontend Components: Developed reusable UI components with JavaScript and Bootstrap, improving
efficiency and maintainability.`,
      pt2: `* Implemented Responsive Design: Ensured cross- device accessibility using CSS and Bootstrap, enhancing mobile
compatibility.`,
      pt3: `* Optimized Platform Efficiency: Streamlined platform development from conception to deployment, boosting operational
efficiency.`
    }
  ];

  // Reset the yearsRef when data changes
  useEffect(() => {
    yearsRef.current = yearsRef.current.slice(0, timelineData.length);
  }, [timelineData]);

  const calculateActiveYear = () => {
    if (!containerRef.current) return;

    const containerCenter = window.innerHeight / 2;
    let minDistance = Infinity;
    let currentActiveIndex = 0;

    // Find which year is closest to the center
    yearsRef.current.forEach((yearEl, index) => {
      if (!yearEl) return;

      const rect = yearEl.getBoundingClientRect();
      const distance = Math.abs(rect.top - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        currentActiveIndex = index;
        setActiveYear(timelineData[index].year);
      }
    });

    setActiveIndex(currentActiveIndex);

    // Calculate progress between this year and next
    if (currentActiveIndex < timelineData.length - 1 && yearsRef.current[currentActiveIndex + 1]) {
      const currentYearTop = yearsRef.current[currentActiveIndex].getBoundingClientRect().top;
      const nextYearTop = yearsRef.current[currentActiveIndex + 1].getBoundingClientRect().top;
      const totalDistance = nextYearTop - currentYearTop;
      const currentDistance = containerCenter - currentYearTop;

      // Add a sensitivity factor
      const sensitivityFactor = 0.3;
      const progressBetweenYears = Math.max(0, Math.min(1, currentDistance / totalDistance * sensitivityFactor));

      const segmentSize = 1 / (timelineData.length - 1);
      const baseProgress = currentActiveIndex * segmentSize;
      const segmentProgress = progressBetweenYears * segmentSize;

      setProgress(baseProgress + segmentProgress);
    } else if (currentActiveIndex === timelineData.length - 1) {
      setProgress(1);
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(calculateActiveYear);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#0c0c1a] text-white">
      <style jsx>{`
        /* Timeline styles */
        .timeline-container {
          position: relative;
          width: 100%;
          font-family: "Outfit", sans-serif;
          overflow: hidden;
          padding: 4rem 0;
        }
        
        .timeline-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          position: relative;
        }
        
        /* Timeline progress line */
        .timeline-line-container {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 4px;
          transform: translateX(-50%);
          z-index: 10;
          background-color: rgba(228, 60, 19, 0.2);
        }
        
        .timeline-progress {
          position: absolute;
          width: 4px;
          background-color: #e43c13;
          top: 0;
          left: 0;
          transition: height 0.5s ease;
        }
        
        /* Timeline sections */
        .timeline-section {
          margin-bottom: 10rem;
          position: relative;
          min-height: 300px;
          perspective: 1000px;
        }
        
        /* Section content */
        .timeline-section-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          position: relative;
        }
        
        .timeline-section-left {
          text-align: right;
          padding-right: 3rem;
        }
        
        .timeline-section-right {
          padding-left: 3rem;
        }
        
        /* Large number */
        .timeline-number {
          font-size: 9rem;
          font-weight: 700;
          color: #e43c13;
          opacity: 0.9;
          margin: 0;
          line-height: 1;
        }
        
        /* Heading and tagline */
        .tagline {
          color: #e43c13;
          text-transform: uppercase;
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        
        .heading {
          font-size: 3rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        /* Text content */
        .timeline-content {
        font-size:1.2rem;
        color:rgb(0, 0, 0);
          line-height: 1.6;
          font-weight: 300;
        }
        
        /* Button */
        .change-variant-btn {
          background-color: #6d28d9;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          cursor: pointer;
          margin-top: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .change-variant-btn:hover {
          background-color: #5b21b6;
        }
        
        /* Dot indicator */
        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #e43c13;
          
          z-index: 20;
        }
        
        /* Animation classes */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .blur-effect {
          filter: blur(2px);
          opacity: 0.5;
          transition: all 0.6s ease;
        }
        
        .blur-effect.active {
          filter: blur(0);
          opacity: 1;
        }
        
        /* Alternate section layout */
        .timeline-section:nth-child(even) .timeline-section-content {
          grid-template-columns: 1fr 1fr;
        }
        
        .timeline-section:nth-child(odd) .timeline-section-content {
          grid-template-columns: 1fr 1fr;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .timeline-section-content {
            grid-template-columns: 1fr !important;
          }
          
          .timeline-section-left,
          .timeline-section-right {
            text-align: left;
            padding: 0 0 0 3rem;
          }
          .timeline-number{
          padding-left:100px
          }
          
          .timeline-line-container {
            left: 1rem;
          }
          
          .timeline-dot {
            left: 1rem;
          }
        }
        @media(max-width:825px){
  .timeline-content {
        font-size:1rem;
        }
        .heading {
          font-size: 2rem;
         
        }
           .tagline {
        
          font-size: 0.9rem;
          
        }
    
  }
        /* Media Query for Scrolling Timeline - screens below 600px */
@media screen and (max-width: 600px) {
  .timeline-wrapper {
    padding: 1rem 0.75rem;
  }
  
  .timeline-section {
    margin-bottom: 6rem;
    min-height: 250px;
  }
  
  .timeline-line-container {
    left: 0.75rem;
  }
  
  .timeline-dot {
    left: 0.75rem;
    width: 12px;
    height: 12px;
  }
  
  .timeline-section-left,
  .timeline-section-right {
    padding: 0 0 0 2rem;
  }
  
  .timeline-number {
    font-size: 5rem;
    opacity: 0.7;
    top: -20px;
  }
  
  .tagline {
    font-size: 0.75rem;
    margin-bottom: 0.3rem;
  }
  
  .heading {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .timeline-content {
    font-size: 0.875rem;
  }
  
  p {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .change-variant-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    margin-top: 1rem;
  }
  
  .timeline-section:nth-child(even) .timeline-section-content,
  .timeline-section:nth-child(odd) .timeline-section-content {
    display: grid;
    grid-template-columns: 1fr !important;
  }
  
  /* Adjust large number positioning */
  .timeline-section:nth-child(odd) .timeline-number,
  .timeline-section:nth-child(even) .timeline-number {
    left: -1;
    right: 1;
    transform: translateX(0);
  }
}

@media screen and (max-width:450px){
  .timeline-number {
    font-size: 3rem;
    opacity: 0.7;
    top: -20px;
  }
    .timeline-number-
}
      `}</style>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-wrapper">
          {/* Timeline progress line */}
          <div className="timeline-line-container">
            <div
              className="timeline-progress"
              style={{ height: `${progress * 100}%` }}
            ></div>
          </div>

          {/* Timeline content */}
          <div className="timeline-content" ref={timelineRef}>
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-section">
                {/* Hidden marker for scroll detection */}
                <div
                  ref={el => yearsRef.current[index] = el}
                  style={{ height: '1px', visibility: 'hidden' }}
                ></div>

                {/* Dot indicator */}
                <div className="timeline-dot"></div>

                {/* Section content */}
                <div className={`timeline-section-content ${activeIndex === index ? 'active' : 'blur-effect'}`}>
                  {index % 2 === 0 ? (
                    <>
                      {/* Right side content */}
                      <div className="timeline-section-left"></div>
                      <div className="timeline-section-right">
                        <div className={`fade-in ${activeIndex === index ? 'active' : ''}`}>
                          <div className="tagline">2024 - Present</div>
                          <h2 className="heading">{item.title}</h2>
                          <h3 className="timeline-content">{item.content}</h3>
                          <p>{item.pt1}</p>
                          <p>{item.pt2}</p>
                          <p>{item.pt3}</p>


                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Left side content */}
                      <div className="timeline-section-left">
                        <div className={`fade-in ${activeIndex === index ? 'active' : ''}`}>
                          <div className="tagline">2022-2023</div>
                          <h2 className="heading">{item.title}</h2>
                          <h3 className="timeline-content">{item.content}</h3>
                          <p>{item.pt1}</p>
                          <p>{item.pt2}</p>
                          <p>{item.pt3}</p>

                        </div>
                      </div>
                      <div className="timeline-section-right"></div>
                    </>
                  )}

                  {/* Large number overlay */}
                  <div
                    className="timeline-number"
                    style={{
                      position: 'absolute',
                      top: '0',
                      [index % 2 === 0 ? 'left' : 'right']: '50%',
                      transform: `translate(${index % 2 === 0 ? '-100%' : '100%'}, 0)`,
                      zIndex: 5
                    }}
                  >
                    {item.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}