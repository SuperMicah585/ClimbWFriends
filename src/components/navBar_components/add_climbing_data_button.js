import React, { useState } from "react";

const ClimbingDataButton = ({ modalTrigger }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    modalTrigger();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        //bottom:'3.5px',
        height: "35px",
        width: "35px",
        display: "flex", // Use flexbox
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
        borderRadius: "50%", // Keep the circle shape
        cursor: "pointer",
        position: "relative",
        transition: "background-color 0.2s",
        backgroundColor: isHovered ? "#DCDCDC" : "#F5F5F5",
      }}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
      </svg>
    </div>
  );
};

export default ClimbingDataButton;
