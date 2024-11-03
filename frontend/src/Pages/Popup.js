import React from 'react';
import '../App.css'; // Optional CSS for styling

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          &times; {/* Close button */}
        </button>
        {children} {/* Content of the popup */}
      </div>
    </div>
  );
};

export default Popup;