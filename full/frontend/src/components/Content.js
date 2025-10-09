import React from "react";
import { RxDashboard } from "react-icons/rx";
import { TbBrandAdobe } from "react-icons/tb";
import { Link } from "react-router-dom";

const Content = ({ content }) => {
  return (
    <div className="content-wrapper">
      {/* Render different content based on the value of content prop */}
      {content === "content1" && ( 
        <div className="content1" style={{backgroundColor:"white",position:"absolute",top:"290px",padding:"30px",borderLeft:"1px solid #0E84FD",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>
          {" "}
          <Link
            to="/categories"
            className="fw-semi-bold nav-link active"
            aria-current="page"
          >
            <span className="d-flex">
          
              Categories
            </span>
          </Link>
          <Link
                      to="/serviceList"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                   
                       Service List
                      </span>{" "}
                    </Link>
          <Link
                      to="/subCategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                   
                       Sub Category
                      </span>{" "}
                    </Link>
        </div>
      )}
      {content === "content2" && <div className="content2" style={{backgroundColor:"white",position:"absolute",top:"340px",padding:"30px",borderLeft:"1px solid #0E84FD",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>   <Link
                        to="/BookingStatus"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                        
                          Booking Status
                        </span>
                      </Link>
                      <Link
                      to="/assignWork"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                       
                        Assist Work
                      </span>{" "}
                    </Link>
                      {/* <Link
                      to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                       
                        Schedule Order
                      </span>{" "}
                    </Link> */}
                      
                      </div>}
      {content === "content3" && <div className="content3" style={{backgroundColor:"white",position:"absolute",top:"400px",padding:"30px",borderLeft:"1px solid #0E84FD",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>
      <Link
                        to="/provider"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                         
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
                       
                       Verification
                      </span>{" "}
                    </Link> */}
      
      </div>}
      {content === "content4" && <div className="content3" style={{backgroundColor:"white",position:"absolute",top:"430px",padding:"30px",borderLeft:"1px solid #0E84FD",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}>  
                      <Link
                      to="/paymentHistory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                       
                        Payment History
                      </span>{" "}
                    </Link>
                      
                      <Link
                      to="/pendingAmount"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                       
                        Pending Amount
                      </span>{" "}
                    </Link>
                      
                      
                      </div>}
      {content === "content5" && <div className="content3" style={{backgroundColor:"white",position:"absolute",top:"330px",padding:"30px",borderLeft:"1px solid #0E84FD",boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}}> <Link
                        to="/categories"
                        className="fw-semi-bold nav-link active"
                        aria-current="page"
                      >
                        <span className="d-flex">
                         

                         All Customers
                        </span>
                      </Link>
                      <Link
                      to="/addcategory"
                      className="fw-semi-bold nav-link active"
                      aria-current="page"
                    >
                      {" "}
                      <span className="d-flex">
                       
                       Add Customer
                      </span>{" "}
                    </Link>
                      </div>}
    
      {/* Add more content divs as needed */}
    </div>
  );
};

export default Content;
