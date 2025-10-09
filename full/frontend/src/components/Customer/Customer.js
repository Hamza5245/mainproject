import React, { useEffect, useState } from "react";
import ApiUrl from "../../ApiUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { toast,ToastContainer } from "react-toastify";

function Customer() {
  const [provider, setProvider] = useState([]);
  useEffect(() => {
    axios.get(`${ApiUrl}/user/get`).then((res) => {
        setProvider(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []); 


  
  return (
    <>
    <ToastContainer/>
    <div style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>
      <div>
<h3>Customers</h3>
      </div>
      {/* <div>
        <Link to="/addCategory">
<button className="btn btn-primary">Add</button></Link>
      </div> */}
    </div>
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
      
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Country</th>
          
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {provider?.map((item, index) => {
              return (
                <tr class="table-light">
                  <th>{index + 1}</th>
             
                  {/* <th>{item.image}</th> */}
                  <th>{item?.firstName} {item?.lastName} </th>
                  <th>{item?.email} </th>
                  <th>{item?.phone} </th>
                  <th>{item?.country} </th>
                
                  <th>     
                    <span    style={{ fontSize: 21 }}>
                   <Link to={`/customerView/${item._id}`} > <i class="fa fa-eye"></i></Link>
                    </span>
                    
                      </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customer;
