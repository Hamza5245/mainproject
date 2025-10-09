import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { TbCategoryPlus,TbMoneybag  } from "react-icons/tb";
import { TbBrandAirtable,TbBrandAdobe,TbBrandUnity } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import { IoPeopleOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { TbWorldPlus } from "react-icons/tb";
import { CiBoxList, CiMoneyCheck1  } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { LiaCitySolid } from "react-icons/lia";

import { GrMoney , GrStatusUnknown} from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineTeam,AiOutlineSchedule  } from "react-icons/ai";
import { MdDomainVerification } from "react-icons/md";
function ScrollableSection({ left, press, isHidden, press2,onIconClick }) {
  return (
    <>


      <div id="sidebar_mobile" className="sidebar" style={{ left: left }}>
        {left === "-12%" ? (
          <div className="icon-wrapper">
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "20px 20px 20px 30px",
                cursor: "pointer",
              }}
              onClick={press}
            >
              {/* <img src={require("../assets/images/download (2).png")} width="15%" height="auto" alt="" style={{}}/> */}
              <HiBars3
                size={40}
                color="white"
                style={{
                  backgroundColor: "#24237B",
                  padding: "5px",
                  borderRadius: "100px",
                }}
              />
            </div>
            <hr style={{ opacity: "0.09" }} />
            <h6
              style={{
                textAlign: "end",
                margin: "0px 20px 0px 0px",
                opacity: "0.5",
              }}
            >
              Menu
            </h6>
            <hr style={{ opacity: "0.09" }} />
            <ul className="pb-5">
              <li className="nav-item m-0" style={{ textAlign: "end" }}>
                <Link
                 to="/dashboard"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <RxDashboard  size={25} className="px-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item m-0" style={{ textAlign: "end" }}>
                <Link
                 to="/Customers"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <IoPeopleOutline  size={25} className="px-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item m-0" style={{ textAlign: "end" }}>
                <Link
                 to="/country"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <TbWorldPlus size={25} className="px-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item m-0" style={{ textAlign: "end" }}>
                <Link
                 to="/taxes"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <LiaCitySolid  size={25} className="px-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item" style={{ textAlign: "end" }}>
                <div
                  
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 30px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <MdOutlineCategory onClick={() => onIconClick('content1')} size={25} className="px-1" />
                  </span>
                </div>
              </li>
              <li className="nav-item" style={{ textAlign: "end" }}>
                <div
                 
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "20px 30px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <MdOutlineBookmarkAdded  onClick={() => onIconClick('content2')} size={25} className="px-1" />
                  </span>
                </div>
              </li>
              <li className="nav-item" style={{ textAlign: "end" }}>
                <div
          
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "20px 30px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <TbBrandUnity onClick={() => onIconClick('content3')} size={25} className="px-1" />
                  </span>
                </div>
              </li>
              <li className="nav-item" style={{ textAlign: "end" }}>
                <div
           
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "20px 30px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <TbMoneybag  onClick={() => onIconClick('content4')}  size={25} className="px-1" />
                  </span>
                </div>
              </li>
              <li className="nav-item" style={{ textAlign: "end" }}>
                <Link
                 to="/warrantyStatus"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <GrStatusUnknown  size={25} className="px-1" />
                  </span>
                </Link>
              </li>
              <li className="nav-item m-0" style={{ textAlign: "end" }}>
                <Link
                 to="/"
                  style={{
                    justifyContent: "end",
                    display: "flex",
                    margin: "0px 20px 0px 0px",
                  }}
                  className="fw-semi-bold nav-link"
                  aria-current="page"
                >
                  {""}
                  <span className="d-flex">   
                    <CiLogout  size={25} className="px-1" />
                  </span>
                </Link>
              </li>





      
            </ul>
          
          </div>
        ) : (
          <>

            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0px 20px 30px",
              }}
            >
              <img
                src={require("../assets/images/WhatsApp_Image_2024-03-03_at_11.34.50_AM__1_-removebg-preview.png")}
                width="80%"
                height="auto"
                alt=""
                style={{}}
              />
              <div
                style={{
                  backgroundColor: "#24237B",
                  padding: "5px 0px 5px 5px",
                  borderTopLeftRadius: " 10px",
                  borderBottomLeftRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={press}
              >
                <i
                  style={{ color: "white" }}
                  class="fa-solid  fa-angle-left"
                ></i>
              </div>
            </div>
            <ul className="pb-5">
            <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="fw-semi-bold nav-link active"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <RxDashboard size={25} className="px-1" />
                    Dashboard
                  </span>
                </Link>
              </li>

              <li>
                      {" "}
                      <Link
                        to="/Customers"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <IoPeopleOutline  size={27} className="px-1" />
                          Customers
                        </span>
                      </Link>
                    </li>

              <li>
                      {" "}
                      <Link
                        to="/country"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbWorldPlus size={25} className="px-1" />
                          Countries
                        </span>
                      </Link>
                    </li>
              
             
              
              <li>
                      {" "}
                      <Link
                        to="/taxes"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <LiaCitySolid size={25} className="px-1" />
                          Taxes
                        </span>
                      </Link>
                    </li>
              
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="headingTwo">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="d-flex">
                      <MdOutlineCategory size={25} className="px-1" />
                      Category
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                  
                      {" "}
                      <Link
                        to="/categories"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <MdOutlineCategory size={25} className="px-1" />
                          Categories
                        </span>
                      </Link>
                  
                      {" "}
                      <Link
                        to="/serviceList"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <CiBoxList size={25} className="px-1" />
                          Services list
                        </span>
                      </Link>
                  
                    
                      {" "}
                      <Link
                        to="/subCategory"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbCategoryPlus size={25} className="px-1" />
                         Sub Category
                        </span>
                      </Link>
                   

                    {/* <Link
                           to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <TbCategoryPlus size={25} className="px-1" />
                       Create Category
                      </span>{" "}
                    </Link> */}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample3">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading3">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    <span className="d-flex">
                      <MdOutlineBookmarkAdded size={25} className="px-1" />
                      Bookings
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse3"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                   
                      {" "}
                      <Link
                        to="/BookingStatus"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <MdOutlinePending size={25} className="px-1" />
                          Bookings status
                        </span>
                      </Link>
                 

                    <Link
                      to="/assignWork"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <AiOutlineTeam  size={25} className="px-1" />
                        Assign work
                      </span>{" "}
                    </Link>
                  
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample4">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading4">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    <span className="d-flex">
                      <TbBrandUnity size={25} className="px-1" />
                      Provider
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse4"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                 
                      {" "}
                      <Link
                        to="/provider"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbBrandUnity size={25} className="px-1" />
                          Providers
                        </span>
                      </Link>
                  
{/* 
                    <Link
                      to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <MdDomainVerification  size={25} className="px-1" />
                        Verifications
                      </span>{" "}
                    </Link> */}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample5">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading5">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    <span className="d-flex">
                      <TbMoneybag   size={25} className="px-1" />
                      Earring
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse5"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                
                      {" "}
                      {/* <Link
                        to="/categories"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbMoneybag   size={25} className="px-1" />
                          Earrings
                        </span>
                      </Link> */}
                  
                    <Link
                      to="/paymentHistory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <GrMoney size={25} className="px-1" />
                        payments history
                      </span>{" "}
                    </Link>

                    <Link
                      to="/pendingAmount"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <GiTakeMyMoney size={25} className="px-1" />
                        pending amount 
                      </span>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
        
         
            <li>
                      {" "}
                      <Link
                        to="/warrantyStatus"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          < GrStatusUnknown size={25} className="px-1" />
                          Warranty status
                        </span>
                      </Link>
                    </li>


                    <li>
                      {" "}
                      <Link
                        to="/"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <CiLogout size={25} className="px-1" />
                          Logout
                        </span>
                      </Link>
                    </li>

            

              
            

           

           

          
            </ul>{" "}
          </>
        )}
      </div>

      {!isHidden && (
        <div
          id=""
          className="sidebar"
          style={{
            backgroundColor: "white",
            transition: "background-color 0.5s ease",
            zIndex: "99999999999999",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px 20px 30px",
            }}
          >
            <img
              src={require("../assets/images/WhatsApp_Image_2024-03-03_at_11.34.50_AM__1_-removebg-preview.png")}
              width="80%"
              height="auto"
              alt=""
              style={{}}
            />
            <div
              style={{
                backgroundColor: "#24237B",
                padding: "5px 0px 5px 5px",
                borderTopLeftRadius: " 10px",
                borderBottomLeftRadius: "10px",
                cursor: "pointer",
              }}
              onClick={press2}
            >
              <MdOutlineCancel color="white" />
            </div>
          </div>

          <ul className="pb-5">
            <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="fw-semi-bold nav-link active"
                  aria-current="page"
                >
                  {" "}
                  <span className="d-flex">
                    <RxDashboard size={25} className="px-1" />
                    Dashboard
                  </span>
                </Link>
              </li>

              <li>
                      {" "}
                      <Link
                        to="/Customers"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <IoPeopleOutline  size={27} className="px-1" />
                          Customers
                        </span>
                      </Link>
                    </li>

              <li>
                      {" "}
                      <Link
                        to="/country"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbWorldPlus size={25} className="px-1" />
                          Countries
                        </span>
                      </Link>
                    </li>
              
             
              
              <li>
                      {" "}
                      <Link
                        to="/taxes"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <LiaCitySolid size={25} className="px-1" />
                          Taxes
                        </span>
                      </Link>
                    </li>
              
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="headingTwo">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="d-flex">
                      <MdOutlineCategory size={25} className="px-1" />
                      Category
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                  
                      {" "}
                      <Link
                        to="/categories"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <MdOutlineCategory size={25} className="px-1" />
                          Categories
                        </span>
                      </Link>
                  
                      {" "}
                      <Link
                        to="/serviceList"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <CiBoxList size={25} className="px-1" />
                          Services list
                        </span>
                      </Link>
                  
                    
                      {" "}
                      <Link
                        to="/subCategory"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbCategoryPlus size={25} className="px-1" />
                         Sub Category
                        </span>
                      </Link>
                   

                    {/* <Link
                           to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <TbCategoryPlus size={25} className="px-1" />
                       Create Category
                      </span>{" "}
                    </Link> */}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample3">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading3">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="false"
                    aria-controls="collapse3"
                  >
                    <span className="d-flex">
                      <MdOutlineBookmarkAdded size={25} className="px-1" />
                      Bookings
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse3"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                   
                      {" "}
                      <Link
                        to="/BookingStatus"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <MdOutlinePending size={25} className="px-1" />
                          Bookings status
                        </span>
                      </Link>
                 

                    <Link
                      to="/assignWork"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <AiOutlineTeam  size={25} className="px-1" />
                        Assign work
                      </span>{" "}
                    </Link>
                  
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample4">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading4">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="false"
                    aria-controls="collapse4"
                  >
                    <span className="d-flex">
                      <TbBrandUnity size={25} className="px-1" />
                      Provider
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse4"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                 
                      {" "}
                      <Link
                        to="/provider"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbBrandUnity size={25} className="px-1" />
                          Providers
                        </span>
                      </Link>
                  

                    {/* <Link
                      to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <MdDomainVerification  size={25} className="px-1" />
                        Verifications
                      </span>{" "}
                    </Link> */}
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
          

              <div class="accordion" id="accordionExample5">
                <h2 class="accordion-header" style={{lineHeight:"1.5",fontWeight:"400"}} id="heading5">
                  <button
                    class="accordion-button px-2  collapsed fw-semi-bold nav-link active"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="false"
                    aria-controls="collapse5"
                  >
                    <span className="d-flex">
                      <TbMoneybag   size={25} className="px-1" />
                      Earring
                    </span>
                  </button>
                </h2>
                <div
                  id="collapse5"
                  class="accordion-collapse p-0 collapse"
                  aria-labelledby="heading4"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                
                      {" "}
                      {/* <Link
                        to="/categories"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <TbMoneybag   size={25} className="px-1" />
                          Earrings
                        </span>
                      </Link> */}
                  
                    <Link
                      to="/paymentHistory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <GrMoney size={25} className="px-1" />
                        payments history
                      </span>{" "}
                    </Link>

                    <Link
                      to="/pendingAmount"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                        <GiTakeMyMoney size={25} className="px-1" />
                        pending amount 
                      </span>{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </li>
        
         
            <li>
                      {" "}
                      <Link
                        to="/warrantyStatus"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          < GrStatusUnknown size={25} className="px-1" />
                          Warranty status
                        </span>
                      </Link>
                    </li>


                    <li>
                      {" "}
                      <Link
                        to="/"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                          <CiLogout size={25} className="px-1" />
                          Logout
                        </span>
                      </Link>
                    </li>

            

              
            

           

           

          
            </ul>{" "}
        </div>
      )}
    </>
  );
}

export default ScrollableSection;
