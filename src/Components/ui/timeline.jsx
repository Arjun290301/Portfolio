import { useState, useEffect, useRef } from 'react';

export default function ScrollingTimeline() {
    const [activeYear, setActiveYear] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    // Sample timeline data
    const timelineData = [
        {
            year: "2024",
            content: [
                {
                    title: "Simple pricing for advanced people",
                    description: "Our pricing design helps you focus on users rather than your price points and features.",
                    image: "/api/placeholder/500/300"
                }
            ]
        },
        {
            year: "Early 2023",
            content: [
                {
                    title: "Lorem ipsum content",
                    description: "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.",
                    image: "/api/placeholder/500/300"
                },
                {
                    title: "More beautiful designs",
                    description: "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
                    image: "/api/placeholder/500/300"
                }
            ]
        },
        {
            year: "2022",
            content: [
                {
                    title: "Product launch",
                    description: "We launched our first product with great success and positive feedback.",
                    image: "/api/placeholder/500/300"
                }
            ]
        }
    ];

    const calculateActiveYear = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const containerHeight = container.clientHeight;
        const containerTop = container.getBoundingClientRect().top;
        const containerCenter = containerTop + containerHeight / 2;

        let foundActiveYear = null;
        let minDistance = Infinity;

        const yearElements = document.querySelectorAll('.timeline-year');
        yearElements.forEach((yearElement) => {
            const yearTop = yearElement.getBoundingClientRect().top;
            const distance = Math.abs(yearTop - containerCenter);

            if (distance < minDistance) {
                minDistance = distance;
                foundActiveYear = yearElement.getAttribute('data-year');
            }
        });

        setActiveYear(foundActiveYear);

        // Calculate scroll progress for the line animation
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        const progress = Math.min(scrollPosition / maxScroll, 1);
        setScrollProgress(progress);
    };

    useEffect(() => {
        window.addEventListener('scroll', calculateActiveYear);
        calculateActiveYear(); // Initialize on mount

        return () => {
            window.removeEventListener('scroll', calculateActiveYear);
        };
    }, []);

    return (
        <div className="relative w-full bg-gray-50" ref={containerRef}>
            {/* Timeline container */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Timeline track */}
                <div className="relative">
                    {/* Blue line */}
                    <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200">
                        <div
                            className="absolute w-1 bg-blue-500 transition-all duration-300"
                            style={{
                                height: `${scrollProgress * 100}%`,
                                top: 0,
                                left: 0
                            }}
                        />
                    </div>

                    {/* Timeline content */}
                    <div className="relative pl-16" ref={timelineRef}>
                        {timelineData.map((item, index) => (
                            <div key={index} className="mb-32">
                                {/* Year marker */}
                                <div
                                    className={`timeline-year sticky top-1/2 -translate-y-1/2 -ml-16 flex items-center transition-all duration-300 ${activeYear === item.year ? 'opacity-100' : 'opacity-50'}`}
                                    data-year={item.year}
                                >
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activeYear === item.year ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </div>
                                    <h2 className="text-5xl font-bold text-gray-700 ml-6">{item.year}</h2>
                                </div>

                                {/* Content */}
                                <div className="ml-6 mt-10 space-y-16">
                                    {item.content.map((contentItem, contentIndex) => (
                                        <div key={contentIndex} className="grid md:grid-cols-2 gap-8">
                                            <div className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-500 hover:scale-105">
                                                <h3 className="text-xl font-semibold mb-4">{contentItem.title}</h3>
                                                <p className="text-gray-600">{contentItem.description}</p>
                                            </div>
                                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                                <img src={contentItem.image} alt={contentItem.title} className="w-full h-64 object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}