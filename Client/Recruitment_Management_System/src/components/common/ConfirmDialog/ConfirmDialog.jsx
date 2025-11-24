import React from "react";
import Button from "../../atoms/Button/Button";
import "./ConfirmDialog.css";

const ConfirmDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirm-actions">
          <Button
            onClick={onCancel}
            variant="secondary"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger" disabled={isProcessing}>
            {isProcessing ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
