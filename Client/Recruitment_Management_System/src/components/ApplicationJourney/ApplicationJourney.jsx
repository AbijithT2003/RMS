import React from "react";
import "./ApplicationJourney.css";

const ApplicationJourney = ({ status, appliedAt, jobTitle, recruiterName }) => {
  const defaultMilestones = [
    {
      stage: "SUBMITTED",
      label: "Applied",
      icon: "fas fa-paper-plane",
      completed: status !== "SUBMITTED",
    },
    {
      stage: "UNDER_REVIEW",
      label: "Under Review",
      icon: "fas fa-search",
      completed: [
        "SHORTLISTED",
        "INTERVIEW_SCHEDULED",
        "INTERVIEWED",
        "SELECTED",
      ].includes(status),
    },
    {
      stage: "SHORTLISTED",
      label: "Shortlisted",
      icon: "fas fa-star",
      completed: ["INTERVIEW_SCHEDULED", "INTERVIEWED", "SELECTED"].includes(
        status
      ),
    },
    {
      stage: "INTERVIEW_SCHEDULED",
      label: "Interview",
      icon: "fas fa-video",
      completed: ["INTERVIEWED", "SELECTED"].includes(status),
    },
    {
      stage: "SELECTED",
      label: "Selected",
      icon: "fas fa-check-circle",
      completed: status === "SELECTED",
    },
  ];

  const currentMilestoneIndex = defaultMilestones.findIndex(
    (m) => m.stage === status
  );

  return (
    <div className="application-journey">
      <div className="journey-header">
        <h3 className="journey-title">{jobTitle}</h3>
        <p className="journey-recruiter">with {recruiterName || "Company"}</p>
      </div>

      <div className="journey-timeline">
        {defaultMilestones.map((milestone, index) => {
          const isCompleted = milestone.completed;
          const isCurrent = index === currentMilestoneIndex;

          return (
            <div
              key={milestone.stage}
              className={`journey-step ${isCompleted ? "completed" : ""} ${
                isCurrent ? "current" : ""
              }`}
            >
              <div
                className={`journey-dot ${
                  isCompleted ? "completed" : isCurrent ? "current" : ""
                }`}
              >
                <i className={milestone.icon}></i>
              </div>
              <div className="journey-label">{milestone.label}</div>
              {index < defaultMilestones.length - 1 && (
                <div
                  className={`journey-connector ${
                    isCompleted ? "completed" : ""
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="journey-footer">
        <small className="journey-date">
          Applied on{" "}
          {new Date(appliedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </small>
      </div>
    </div>
  );
};

export default ApplicationJourney;
