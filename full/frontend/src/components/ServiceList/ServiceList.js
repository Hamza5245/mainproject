import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { toast,ToastContainer } from "react-toastify";
import ApiUrl from "../../ApiUrl";


function ServiceList() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`${ApiUrl}/subCategory/get`).then((res) => {
      setCategory(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);

  const onDeleteStudent = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      onOk: () => {
        axios
          .delete(`${ApiUrl}/subCategory/delete/${id}`)
          .then((res) => {
            console.log(res.data);
            axios.get(`${ApiUrl}/subCategory/get`).then((res) => {
              setCategory(res.data.data);
            });
            toast.success('Service List is deleted');
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            toast.error('Something went wrong.');
          });
      },
    });
  };
  
  return (
    <>
    <ToastContainer/>
    <div style={{display:"flex",justifyContent:"space-between",margin:"10px"}}>
      <div>
<h4>Services</h4>
      </div>
      <div>
        <Link to="/createServiceList">
<button className="btn btn-primary">Add</button></Link>
      </div>
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
              <th>Type</th>
              <th>SubCategory</th>
              <th>Details</th>
              <th>Warranty</th>
              <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {category?.map((item, index) => {
              return (
                <tr class="table-light">
                  <th>{index + 1}</th>
                  <th>
                    {" "}
                    <img src={item?.image} style={{height:"35px",width:"35px",borderRadius:"100px"}} alt="" />
                  </th>
                
                  <th>{item.name}</th>
                  <th>{item.type}</th>
                  <th>{item.categoryId?.name}</th>
                  <th>{item.about}</th>
                  <th>{item.warranty} Days</th>
            
                 
                  <th>     
                    <span    style={{ fontSize: 21 }}>
                   <Link to={`/updateServiceList/${item._id}`} > <i class="fa-regular fa-pen-to-square px-1"></i></Link>
                    </span>
                    
                         <span
                        style={{ fontSize: 21 ,cursor:"pointer"}}
                        
                        onClick={() => {
                          onDeleteStudent(item?._id);
                        }}
                      >
                        <i class="fa-solid fa-trash px-1" style={{color:"#ce0404"}}></i>
                      </span></th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ServiceList;
