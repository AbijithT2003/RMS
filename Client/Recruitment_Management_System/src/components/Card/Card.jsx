import React from "react";
import "./Card.css";

const Card = ({
  image,
  title,
  description,
  actionText = "Find out more",
  actionHref = "#",
}) => {
  return (
    <div className="card">
      <div
        className="image"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      ></div>
      <div className="content">
        <a href={actionHref}>
          <span className="card-title">{title}</span>
        </a>
        <p className="card-body">{description}</p>
        <a className="action fw-medium" href={actionHref}>
          {actionText}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
