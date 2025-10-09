import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

import { BiMessageDetail } from "react-icons/bi";
import { FiBell } from "react-icons/fi";
import { BiExpand } from "react-icons/bi";
import HoverDropdown from "./Dropdown";
import { HiBars3 } from "react-icons/hi2";
import Dropdown2 from "./DropDown2";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import ApiUrl from "../ApiUrl";
function Nav({ press2 }) {
  const [country, setCategory] = useState([]);
  useEffect(() => {
    axios.get(`${ApiUrl}/country/get`).then((res) => {
      setCategory(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);
  return (
    <>
    <ToastContainer/>
      <div
        className={`Nav2 px-3 py-2 shadow-sm bg-white  `}>



        {/* <div
          className="q"
          style={{
            fontSize: "17px",
            color: " #0E9F6E",
          }}
        >

          <i class="fa-solid fa-bars "
            onClick={press}
           id="toggle_desktop"
          ></i>
          <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
             id="toggle_mobile"
           
          >
          <i class="fa-solid fa-bars"
      style={{color:"black"}}
          ></i>
</a>
        </div> */}
<div style={{display:"flex",justifyContent:"space-between"}}>
<div className="forjustMobile" style={{display:"flex",justifyContent:"end",margin:"10px 0px 0px 10px",cursor:"pointer"}} onClick={press2}>
          {/* <img src={require("../assets/images/download (2).png")} width="15%" height="auto" alt="" style={{}}/> */}
          <HiBars3 size={40} color="white" style={{backgroundColor:"#24237B",padding:"5px",borderRadius:"100px"}}/>
        </div>
<div className="crancy-header__form">
  <form className="crancy-header__form-inner" action="#" style={{display:"flex",alignItems:"center",backgroundColor:"#f5faff",borderRadius:"8px",padding:"0px 15px 5px 0px"}}>
    <button style={{height:"48px",border:"0",background:"0"}} className="search-btn" type="submit">
      <svg
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="9.78639"
          cy="9.78614"
          r="8.23951"
          stroke="#9AA2B1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5176 15.9448L18.7479 19.1668"
          stroke="#9AA2B1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    <input className="inputForSerach" style={{fontSize:"16px",padding:"0px",background:"0",border:"0"}} name="s" type="text" placeholder="Search..." />
    <a href="#" className="crancy-header__command" style={{display:"flex",alignItems:"center",gap:"5px",color:"#a9a9aa",fontWeight:"400"}}>
      <svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.975 13.3875C6.975 13.8548 6.83644 14.3115 6.57685 14.7C6.31725 15.0885 5.94828 15.3914 5.51659 15.5702C5.0849 15.749 4.60988 15.7958 4.1516 15.7046C3.69332 15.6134 3.27236 15.3884 2.94196 15.058C2.61156 14.7276 2.38655 14.3067 2.2954 13.8484C2.20424 13.3901 2.25102 12.9151 2.42984 12.4834C2.60865 12.0517 2.91146 11.6827 3.29997 11.4232C3.68848 11.1636 4.14524 11.025 4.6125 11.025H13.3875C13.8548 11.025 14.3115 11.1636 14.7 11.4232C15.0885 11.6827 15.3914 12.0517 15.5702 12.4834C15.749 12.9151 15.7958 13.3901 15.7046 13.8484C15.6134 14.3067 15.3884 14.7276 15.058 15.058C14.7276 15.3884 14.3067 15.6134 13.8484 15.7046C13.3901 15.7958 12.9151 15.749 12.4834 15.5702C12.0517 15.3914 11.6827 15.0885 11.4232 14.7C11.1636 14.3115 11.025 13.8548 11.025 13.3875V4.6125C11.025 4.14524 11.1636 3.68848 11.4232 3.29997C11.6827 2.91146 12.0517 2.60865 12.4834 2.42984C12.9151 2.25102 13.3901 2.20424 13.8484 2.2954C14.3067 2.38655 14.7276 2.61156 15.058 2.94196C15.3884 3.27236 15.6134 3.69332 15.7046 4.1516C15.7958 4.60988 15.749 5.0849 15.5702 5.51659C15.3914 5.94828 15.0885 6.31725 14.7 6.57685C14.3115 6.83644 13.8548 6.975 13.3875 6.975H4.6125C4.14524 6.975 3.68848 6.83644 3.29997 6.57685C2.91146 6.31725 2.60865 5.94828 2.42984 5.51659C2.25102 5.0849 2.20424 4.60988 2.2954 4.1516C2.38655 3.69332 2.61156 3.27236 2.94196 2.94196C3.27236 2.61156 3.69332 2.38655 4.1516 2.2954C4.60988 2.20424 5.0849 2.25102 5.51659 2.42984C5.94828 2.60865 6.31725 2.91146 6.57685 3.29997C6.83644 3.68848 6.975 4.14524 6.975 4.6125V13.3875Z"
          stroke="#A9A9AA"
          strokeWidth="1.5"
        />
      </svg>
      <span>K</span>
    </a>
  </form>
</div>




<div className="d-flex" id="forMobile">

<HoverDropdown
        label="Country"
        options={country.map((item, index) => item.name)}
        // image={require("../assets/images/download (1).png")}
      />

<HoverDropdown label="Currency"  options={country.map((item, index) => item.unit)} />
{/* <div class="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button
            class="border-0 bg-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{fontWeight:"500"}}
    
          >
        <img src={require("../assets/images/download (1).png")}/> <span >United States</span>
          </button>

          <ul class="dropdown-menu dd_wrap" >
      
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div> */}
        {/* <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="border-0 bg-white dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontWeight: "500" }}
      >
        USD
      </button>
      <ul className={`dropdown-menu dd_wrap2 ${isDropdownOpen ? 'show' : ''}`}>
        <li>
          <a className="dropdown-item" href="#">
            USD
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            EURO
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            INR
          </a>
        </li>
      </ul>
    </div> */}
</div>
      

<div style={{display:"flex",alignItems:"center"}}>
{/* <i style={{fontSize:"25px",color:"#655d5d"}} class="fa-solid fa-compress"></i> */}

{/* <BiExpand id="forMobile" style={{fontSize:"25px",color:"#655d5d"}} /> */}

        {/* <i style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}} class="fa-regular fa-bell" ></i> */}
      
        {/* <FiBell style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}}/> */}


        {/* <i style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}} class="fa-regular fa-message"></i> */}
{/* <Link to="/chat">
        <BiMessageDetail id="forMobile" style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}}/>
        </Link> */}

        {/* <IoSettingsOutline style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}}/> */}

        {/* <i style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}} class="fa-solid fa-gear"></i> */}
        {/* <i style={{fontSize:"25px",marginLeft:"35px",color:"#655d5d"}} class="fa-regular fa-user"></i> */}

        <span style={{marginLeft:"20px"}}><Dropdown2

        options={[ <Link to="./country" className="text-black">Country</Link>,<Link to="./taxes" className="text-black">Taxes</Link>, <Link to="./earning" className="text-black">Earning</Link>,<Link to="/" className="text-black">Log Out</Link>]}
        image={require("../assets/images/profile-pic-9f992699.png")}
      /></span> 
      {/* <img style={{marginLeft:"35px"}}  src={require("../assets/images/profile-pic-9f992699.png")}/> */}
</div>
   
      </div></div>
    </>
  );
}

export default Nav;
