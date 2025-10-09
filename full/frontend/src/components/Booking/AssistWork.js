import React, { useEffect, useState } from "react";
import ApiUrl from "../../ApiUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";

function AssignWork() {

  const [provider, setProvider] = useState([]);
  const [provider2, setProvider2] = useState([]);
  const [newAssign, setNewAssign] = useState([]);

  useEffect(() => {
    axios.get(`${ApiUrl}/book/get`).then((res) => {
      setProvider(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);



  useEffect(() => {
    axios.get(`${ApiUrl}/seller/get`).then((res) => {

      setProvider2(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);


  const onAssign = (item) => {

    setNewAssign(item)
  }
  const UpdateData = (id) => {


    const param = {
      assignTo: id,
      state: "ClientAssigned"
    }


    axios.put(`${ApiUrl}/book/assignWeb/${newAssign._id}`, param)
      .then((res) => {
        if (res.data.status === "ok") {
          axios.get(`${ApiUrl}/seller/get`).then((res) => {
            setProvider2(res.data.data);
          }).catch((error) => {
            toast.warning('Please check your internet connection');
          });
          window.location.reload();
          toast.success('Successfully Assigned');

        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }






  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div>
          <h3>Assign Work</h3>
        </div>
        <div>

          {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Assign</button> */}
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
              <th>SubCategory</th>
              <th>BookDate</th>
              <th>Address</th>



              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {provider.slice().reverse()?.map((item, index) => {
              return (
                <tr class="table-light">
                  <th>{index + 1}</th>
                  <th>
                    {" "}
                    <img src={item?.subCategoryId?.image} style={{ height: "35px", width: "35px", borderRadius: "100px" }} alt="" />
                  </th>
                  {/* <th>{item.image}</th> */}
                  <th>{item?.subCategoryId?.name} </th>
                  <th>{item?.bookDate} </th>
                  <th>{item?.address} </th>
                  <th>

                    <span style={{ fontSize: 21, cursor: "pointer", color: "#0A58CA" }} >
                      <i class="px-1 fa-solid fa-person-walking-arrow-loop-left" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                        onAssign(item)
                      }}></i>
                      {/* <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Assign</button> */}
                    </span>

                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>




      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog " >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Assign Work</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0">
              <div
                className="table-responsive"
                style={{
                  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  borderRadius: "10px",
                }}
              >
                <table className="table">

                  <tbody>
                    {provider2?.map((item, index) => {
                      if(item?.categoryId?._id===newAssign?.categoryId?._id)
                      {return (
                        <tr class="">

                          <th>
                            {" "}
                            <img src={item?.image} style={{ height: "35px", width: "35px", borderRadius: "100px" }} alt="" />
                          </th>

                          {/* <th>{item.image}</th> */}
                          <th style={{ textAlign: "left" }}>{item?.firstName} <br /><div style={{ opacity: "0.5" }}>{item?.categoryId?.name}</div> </th>
                          <th> </th>


                          <th>

                            {newAssign.state?.toString().length>3?<button className={newAssign.assignTo?._id === item._id ? "btn btn-success" : "btn btn-primary w-75"} disabled={true} onClick={() => {
                              UpdateData(item?._id)
                            }}>{newAssign.assignTo?._id === item._id ?"Already Assign":'Assign'}</button>:<button className={newAssign.assignTo?._id === item._id ? "btn btn-success" : "btn btn-primary w-75"} disabled={newAssign.assignTo?._id === item._id ?true:false} onClick={() => {
                              UpdateData(item?._id)
                            }}>{newAssign.assignTo?._id === item._id ?"Already Assign":'Assign'}</button>}
                          </th>
                        </tr>
                      );}
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignWork;
