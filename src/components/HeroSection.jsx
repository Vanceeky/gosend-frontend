import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hero1 from "@/assets/ub-03-hero.avif";
import hero2 from "@/assets/ub-04-hero.avif";
import hero3 from "@/assets/ub-hero-02.avif";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      image: hero1,
      title: "Fast and Secure Payments",
      description: "Seamlessly send and receive payments with GoSend, your all-in-one e-wallet solution.",
      buttonText: "Get Started",
      buttonLink: "#"
    },
    {
      image: hero2,
      title: "Experience the Future of Digital Transactions",
      description: "Make secure payments with just a few clicks, anytime and anywhere with GoSend.",
      buttonText: "Explore Now",
      buttonLink: "#explore"
    },
    {
      image: hero3,
      title: "Join the GoSend Revolution",
      description: "Be a part of the next-generation digital wallet with innovative features and instant transactions.",
      buttonText: "Learn More",
      buttonLink: "#learn-more"
    }
  ];

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1000); // Match this with your animation duration
  };

  const goToNextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Images with Transition */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src={slide.image}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content with Fade Animation */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center md:text-left md:w-1/2">
            <h1 
              className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-md"
              key={`title-${currentSlide}`}
            >
              {slides[currentSlide].title}
            </h1>
            <p 
              className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md"
              key={`desc-${currentSlide}`}
            >
              {slides[currentSlide].description}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Button
                asChild
                className="px-5 py-3 text-white bg-black hover:bg-gray-800 transition"
              >
                <Link to={slides[currentSlide].buttonLink}>
                  <span className="text-base font-medium">{slides[currentSlide].buttonText}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 transform -translate-y-1/2 z-20">
        <button
          onClick={goToPreviousSlide}
          className="bg-black/50 text-white p-3 rounded-full shadow-lg hover:bg-black/70 transition backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          className="bg-black/50 text-white p-3 rounded-full shadow-lg hover:bg-black/70 transition backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Add these animations to your global CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
