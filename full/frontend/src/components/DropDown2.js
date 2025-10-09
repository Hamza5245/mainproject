import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Dropdown2 = ({ label, options, image }) => {


  return (
    <div className="dropdown p-0" >
      <button
        className="border-0 bg-white forDropRsponsive "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontWeight: "500",padding:"0px",margin:"0px" }}
      >
        {image && <img src={image} alt={label} style={{ marginRight: '5px' }} />}
        {label}
      </button>
      <ul className={`dropdown-menu mt-3 dd_wrap3 `}>
      <li>Admin</li><hr style={{margin:"1px 15px 0px 0px"}}/>

        {options.map((option, index) => (
   
          <li key={index} className="dropdown-item">
       
              {option}
           
          </li>
  
        ))}
              
      </ul>
    </div>
  );
};

export default Dropdown2;
