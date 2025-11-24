import React from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
};

export const UserMenu = () => {
  return (
    <Dropdown trigger={<span>👤 User Menu</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Profile
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Settings
        </button>
        <hr style={{ margin: "5px 0" }} />
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "red",
          }}
        >
          Logout
        </button>
      </div>
    </Dropdown>
  );
};

export const JobActions = () => {
  return (
    <Dropdown trigger={<span>⚙️ Actions</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          View Applications
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Close Posting
        </button>
        <hr style={{ margin: "5px 0" }} />
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "red",
          }}
        >
          Delete
        </button>
      </div>
    </Dropdown>
  );
};

export const FilterOptions = () => {
  return (
    <Dropdown trigger={<span>🔽 Sort By</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Latest
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Most Relevant
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Most Popular
        </button>
      </div>
    </Dropdown>
  );
};

export const LanguageSelector = () => {
  return (
    <Dropdown trigger={<span>🌐 Language</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          English
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Spanish
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          French
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          German
        </button>
      </div>
    </Dropdown>
  );
};

export const StatusFilter = () => {
  return (
    <Dropdown trigger={<span>📊 Status</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Active
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Closed
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Draft
        </button>
      </div>
    </Dropdown>
  );
};

export const ApplicationMenu = () => {
  return (
    <Dropdown trigger={<span>📋 Application Actions</span>}>
      <div style={{ padding: "10px 0" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Accept
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Interview
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Reject
        </button>
        <hr style={{ margin: "5px 0" }} />
        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Mark as Read
        </button>
      </div>
    </Dropdown>
  );
};
