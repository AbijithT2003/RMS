import React from "react";
import "./TestimonialCard.css";

const TestimonialCard = ({ image, name, title, testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-image">
        <img src={image} alt={name} />
      </div>
      <div className="testimonial-content">
        <p className="testimonial-text">{testimonial}</p>
        <div className="testimonial-author">
          <h4 className="testimonial-name">{name}</h4>
          {title && <p className="testimonial-title">{title}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
