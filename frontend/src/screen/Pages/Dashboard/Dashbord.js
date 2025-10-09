import React, { useEffect, useState } from "react";
// import List from "./Table";
import { Progress } from "antd";
import { TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import Table from "../../../components/Table/Table";
// import MyLineChart from "../../../components/Chart";
import { CiMoneyCheck1 } from "react-icons/ci";
import { CiBookmarkPlus } from "react-icons/ci";
import { PiHandshakeLight } from "react-icons/pi";
import { PiUserPlusLight } from "react-icons/pi";
import axios from "axios";
import ApiUrl from "../../../ApiUrl";
import { toast,ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
function DashMain() {
  const [newBook, setNewBook] = useState([]);
  const [provider, setProvider] = useState([]);
  const [earn, setEarn] = useState(null);
  const [user, setUser] = useState([]);
    const headers = ['Order Id', 'Prodcuts', 'Date', 'Customer','Amount','Payment by',<p style={{textAlign:"center",margin:"0",padding:"0"}}>Status</p>];
    const data = [
      ['#543455',  <img src={require("../../../assets/images/download (3).png")} alt="Mark" style={{width:"35px"}}/>, '2/05/2023', 'Wade Warren','62.99$','Paypal',<p style={{backgroundColor:"#E1F4E9",borderRadius:"5px",padding:"5px 20px 5px 20px",margin:"0",color:"#27B093",textAlign:"center"}}>Done</p>],

      ['#543455',  <img src={require("../../../assets/images/download (3).png")} alt="Mark" style={{width:"35px"}}/>, '2/05/2023', 'Wade Warren','62.99$','Paypal',<p style={{backgroundColor:"#E1F4E9",borderRadius:"5px",textAlign:"center",padding:"5px 20px 5px 20px",margin:"0",color:"#27B093"}}>Done</p>],

      ['#543455',  <img src={require("../../../assets/images/download (3).png")} alt="Mark" style={{width:"35px"}}/>, '2/05/2023', 'Wade Warren','62.99$','Paypal',<p style={{backgroundColor:"#E1F4E9",borderRadius:"5px",textAlign:"center",padding:"5px 20px 5px 20px",margin:"0",color:"#27B093"}}>Done</p>]
    ];


    function formatPrice(price) {
      if (isNaN(price)) {
          return "Invalid input";
      }
  
      if (price >= 1000000000) {
          return (price / 1000000000).toFixed(2) + "b";
      } else if (price >= 1000000) {
          return (price / 1000000).toFixed(2) + "m";
      } else if (price >= 1000) {
          return (price / 1000).toFixed(2) + "k";
      } else {
          return price.toFixed(2);
      }
  }

   
    useEffect(() => {
      axios.get(`${ApiUrl}/book/get`).then((res) => {
          setNewBook(res.data.data.length);

          const totalDepositBonus = res.data.data?.reduce(
            (accumulator, currentValue) =>
              parseInt(accumulator) + parseInt(currentValue?.totalBill?currentValue?.totalBill:0),
            0
          )


          setEarn(formatPrice(totalDepositBonus))

      }).catch((error) => {
        toast.warning('Please check your internet connection');
      });
    }, []); 

    useEffect(() => {
      axios.get(`${ApiUrl}/seller/get`).then((res) => {
          setProvider(res.data.data);
 
      }).catch((error) => {
        toast.warning('Please check your internet connection');
      });
    }, []); 

    useEffect(() => {
      axios.get(`${ApiUrl}/user/get`).then((res) => {
          setUser(res.data.data.length);
      }).catch((error) => {
        toast.warning('Please check your internet connection');
      });
    }, []); 
  return (
    <>
    <ToastContainer/>
      <div className="container-fluid p-3">
        <div className="row mt-4">
          <div className="col-md-3 mt-2">
            <div
              className="dash6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "space-around",
                alignItems: "center",
               
              }}
            >
              <p className="mt-3">
                <span style={{ fontSize: "25px", fontWeight: "600" }}>
                  {newBook}
                </span>{" "}
                {/* <br />
                <span style={{ color: "#0E84FD", fontWeight: "700" }}>
                  <TbArrowsDiagonalMinimize2 />
                  +3.5%
                </span> */}
                <br />
                <span style={{ opacity: "0.7", fontWeight: "700" }}>
                Total Bookings
                </span>
              </p>
              <CiBookmarkPlus size={60} color="white"/>
              {/* <Progress
                type="circle"
                percent={11.3}
                size={80}
                style={{ fontWeight: "500" }}
              /> */}
            </div>
          </div>
          <div className="col-md-3 mt-2">
            <div
              className="dash6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "space-around",
                alignItems: "center",
               
              }}
            >
              <p className="mt-3">
                <span style={{ fontSize: "25px", fontWeight: "600" }}>
                  ${earn}
                </span>{" "}
               
                {/* <br />
                <span style={{ color: "#EF62AA", fontWeight: "700" }}>
                  <TbArrowsDiagonalMinimize2 />
                  +3.5%
                </span> */}
                <br />
                <span style={{ opacity: "0.7", fontWeight: "1000"}}>
                Total earnings <br/>(After taxes)
                </span>
              </p>
              <CiMoneyCheck1 size={60} color="white"/>
              {/* <Progress
                type="circle"
                strokeColor="#EF62AA"
                percent={34.6}
                size={80}
                style={{ fontWeight: "500" }}
              /> */}
            </div>
          </div>
          <div className="col-md-3 mt-2 ">
            <div
              className="dash6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "space-around",
                alignItems: "center",
               
              }}
            >
              <p className="mt-3">
                <span style={{ fontSize: "25px", fontWeight: "600" }}>
                  {provider.length}
                </span>{" "}
                {/* <br />
                <span style={{ color: "#27AE60", fontWeight: "700" }}>
                  <TbArrowsDiagonalMinimize2 />
                  +3.5%
                </span> */}
                <br />
                <span style={{ opacity: "0.7", fontWeight: "700" }}>
                Providers
                </span>
              </p>
              <PiHandshakeLight size={60} color="white" />
              {/* <Progress
                type="circle"
                strokeColor="#27AE60"
                percent={54.2}
                size={80}
                style={{ fontWeight: "500" }}
              /> */}
            </div>
          </div>
          <div className="col-md-3 mt-2">
            <div
              className="dash6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "space-around",
                alignItems: "center",
               
              }}
            >
              <p className="mt-3">
                <span style={{ fontSize: "25px", fontWeight: "600" }}>
                  {user}
                </span>{" "}
                {/* <br />
                <span style={{ color: "#9B51E0", fontWeight: "700" }}>
                  <TbArrowsDiagonalMinimize2 />
                  +3.5%
                </span> */}
                <br />
                <span style={{ opacity: "0.7", fontWeight: "700" }}>
                 Total Customers
                </span>
              </p>
              <PiUserPlusLight  size={60} color="white"/>
              {/* <Progress
                type="circle"
                strokeColor="#9B51E0"
                percent={77.5}
                size={80}
                style={{ fontWeight: "500" }}
              /> */}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-9">{/* <MyLineChart/> */}</div>
          <div className="col-md-3">{/* <MyLineChart/> */}</div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            
            
          <div
        className="table-responsive"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "10px",
          padding: "10px",
          margin: "5px",
        }}
      >
        <table className="table">
          <thead>
            <tr class="table-light">
              <th>id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Country</th>
          
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {provider?.map((item, index) => {
              return (
                <tr class="table-light">
                  <th>{index + 1}</th>
                  <th>
                    {" "}
                    <img src={item?.image} style={{height:"35px",width:"35px",borderRadius:"100px"}} alt="" />
                  </th>

                  {/* <th>{item.image}</th> */}
                  <th>{item?.firstName} {item?.lastName} </th>
                  <th>{item?.categoryId?.name} </th>
                  <th>{item?.serviceId?.name} </th>
                  <th>{item?.country} </th>
                
                  <th>     
                    <span    style={{ fontSize: 21 }}>
                   <Link to={`/viewSeller/${item._id}`} > <i class="fa fa-eye"></i></Link>
                    </span>
                    
                      </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
          
          
          </div>
        </div>
      </div>
    </>
  );
}

export default DashMain;
