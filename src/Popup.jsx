import React from "react";
import "./Popup.css"; // Create this file for styling

function Popup({ onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Task Popup</h2>
        <p>This is a centered popup that appears when clicking TASK.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
