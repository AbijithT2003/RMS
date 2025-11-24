import React, { useState, useEffect, useRef } from "react";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import "./TestimonialCarousel.css";

const TestimonialCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const trackRef = useRef(null);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ensure currentIndex stays within bounds when itemsPerView changes
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Transform the track to show the correct items
  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const itemsContainer = track.querySelector(".carousel-items");
    if (!itemsContainer) return;

    const translateX = -(index * (100 / itemsPerView));
    itemsContainer.style.transform = `translateX(${translateX}%)`;
  };

  // ensure currentIndex stays within bounds when itemsPerView or list length changes
  useEffect(() => {
    const max = Math.max(0, testimonials.length - itemsPerView);
    if (currentIndex > max) {
      // avoid synchronous setState in effect — update asynchronously
      setTimeout(() => {
        setCurrentIndex(0);
        scrollToIndex(0);
      }, 0);
    }
  }, [itemsPerView, testimonials.length, currentIndex]);

  const handlePrev = () => {
    const next = currentIndex === 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = currentIndex === maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(next);
    scrollToIndex(next);
  };

  const goTo = (idx) => {
    setCurrentIndex(idx);
    scrollToIndex(idx);
  };

  return (
    <div className="carousel-container">
      <button
        className="carousel-btn prev"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="carousel-track" ref={trackRef}>
        <div className="carousel-items">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="carousel-item">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-btn next"
        onClick={handleNext}
        aria-label="Next"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
