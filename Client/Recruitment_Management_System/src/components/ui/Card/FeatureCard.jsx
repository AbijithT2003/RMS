import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({
  image,
  title,
  description,
  actionText = "Learn More",
  actionHref = "#",
}) => {
  // Resolve image path: allow passing either a full path (starting with '/' or 'http')
  // or just a filename which will be resolved from /assets/images/
  const resolveImage = (img) => {
    if (!img) return undefined;
    // absolute or remote URL
    if (
      img.startsWith("/") ||
      img.startsWith("http://") ||
      img.startsWith("https://")
    )
      return img;
    return `/assets/images/${img}`;
  };

  const imageSrc = resolveImage(image);

  return (
    <div className="feature-card">
      <div className="feature-image">
        {imageSrc ? (
          <img src={imageSrc} alt={title || "feature image"} />
        ) : null}
      </div>
      <div className="feature-content">
        <a href={actionHref}>
          <span className="feature-title">{title}</span>
        </a>
        <p className="feature-desc">{description}</p>
        <a className="feature-action" href={actionHref}>
          {actionText}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
};

export default FeatureCard;
