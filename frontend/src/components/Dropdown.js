import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const HoverDropdown = ({ label, options, image }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="border-0 bg-white dropdown-toggle d-flex align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontWeight: "500" }}
      >
        {image && <img src={image} alt={label} style={{ marginRight: '5px' }} />}
        {label}
      </button>
      <ul className={`dropdown-menu dd_wrap ${isDropdownOpen ? 'show' : ''}`}>
        {options.map((option, index) => (
          <li key={index}>
            <a className="dropdown-item" href="#">
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HoverDropdown;
