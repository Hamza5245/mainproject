import React, { useEffect, useState } from "react";
import ApiUrl from "../../ApiUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { toast,ToastContainer } from "react-toastify";

function Provider() {
  const [provider, setProvider] = useState([]);
  useEffect(() => {
    axios.get(`${ApiUrl}/seller/get`).then((res) => {
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
<h3>Providers</h3>
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
    </>
  );
}

export default Provider;
