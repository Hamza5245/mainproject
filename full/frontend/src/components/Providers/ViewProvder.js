import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { Modal } from 'antd';

const ViewProvider = () => {
  
    const [isVerified, setIsVerified] = useState(false);
    const navigate=useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
      axios.get(`${ApiUrl}/seller/get/${id}`).then((res) => {
          setUser(res.data.data);
      }).catch((error) => {
        toast.warning('Please check your internet connection');
      });
    }, [id]); 
    console.log(user,"0000000000000000000000");


    const onDeleteStudent = (id) => {
        console.log(id,"--------------------------9999999999999");
        Modal.confirm({
          title: "Are you sure you want to delete?",
          onOk: () => {
            axios
              .delete(`${ApiUrl}/seller/delete/${id}`)
              .then((res) => {
                setTimeout(() => {
                    navigate("/provider");
                }, 1000);
             
                toast.success('Provider is deleted');
              })
              .catch((error) => {
                console.error("Error deleting category:", error);
                toast.error('Something went wrong.');
              });
          },
        });
      };
      const onVerify = (id) => {
        // Check if already verified to prevent multiple clicks
        if (isVerified) {
            return;
        }
    
        Modal.confirm({
            title: "Are you sure you want to Verify this Seller?",
            onOk: () => {
                const params = new FormData();
                params.append("verify", true); // Assuming verification is always true when this function is called
    
                axios.put(`${ApiUrl}/seller/update/${id}`, params)
                    .then((res) => {
                        if (res.data.status === "ok") {
                            setIsVerified(true);
                            toast.success('Provider Successfully Verified');
                              axios.get(`${ApiUrl}/seller/get/${id}`).then((res) => {
          setUser(res.data.data);
      }).catch((error) => {
        toast.warning('Please check your internet connection');
      });
                        } else {
                            toast.error('Something went wrong');
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },
        });
    };
  
      

  


  return (
  <>
      <ToastContainer/>

    <div className="container-fluid mt-2">
      
      <div className="card" style={{height:"auto"}}>
        <div className="card-header" style={{display:"flex",justifyContent:"space-between",fontSize:"30px"}}>
          <h5>Seller Details</h5>
          <i class="fa-solid fa-trash" style={{color:"#ce0404",cursor:"pointer"}}   onClick={() => {
                          onDeleteStudent(user?._id);
                        }}></i>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Name:</h6>
              <p>{`${user?.firstName} ${user?.lastName}`}</p>
              <h6>Email:</h6>
              <p>{user?.email}</p>
              <h6>Phone:</h6>
              <p>{user?.phone}</p>
          
              <h6>Category:</h6>
              <p>{user?.categoryId?.name}</p>
              <h6>Sub Category:</h6>
              <p>{user?.serviceId?.name}</p>
            </div>
            <div className="col-md-6">
              <h6>Address:</h6>
              <p>{user?.address}</p>
              <h6>Country:</h6>
              <p>{user?.country}</p>
              <h6>ID Card Number:</h6>
              <p>{user?.idCardNumber}</p>
              <h6>Gender:</h6>
              <p>{user?.gender}</p>
              <h6>Verification Status:</h6>
              <div className="d-flex ">
                  <span>
                    {/* <p>{user?.verify ? 'Verified' : 'Not Verified'}</p> */}
                  </span>
                  <span>
                    <div className="">
               <button className="btn btn-primary" name='verifyUser' id="flexSwitchCheckDefault" checked={isVerified}  onClick={() => {
                          onVerify(user?._id);
                        }} >
  {user?.verify ? 'Verified' : 'Not Verified'}
</button>
                    </div>
                  </span>
                </div>
            </div>
          </div>
          <div className="row">
    
            <div className="col-md-6">
              <h6>Service Image:</h6>
              <img src={user?.image} data-bs-toggle="modal" data-bs-target="#staticBackdrop1" alt="Service Image" style={{maxHeight:"100px"}} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h6>ID Card Images:</h6>
              <div>
                <img src={user?.frontImage} data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt="Front ID Card" style={{maxHeight:"100px"}} className="img-fluid mr-2 px-1" />
                <img src={user?.backImage} data-bs-toggle="modal" data-bs-target="#staticBackdrop3" alt="Back ID Card" style={{maxHeight:"100px"}} className="img-fluid px-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog " >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src={user?.image} alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog " >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src={user?.frontImage} alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog " >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src={user?.backImage} alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ViewProvider;
