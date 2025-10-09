import React, { useEffect, useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import { Modal } from 'antd';
const BookingStatusView = () => {
  const [clickedImage, setClickedImage] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const navigate=useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
      axios.get(`${ApiUrl}/book/get/${id}`).then((res) => {
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
              .delete(`${ApiUrl}/book/delete/${id}`)
              .then((res) => {
                setTimeout(() => {
                    navigate("/BookingStatus");
                }, 1000);
             
                toast.success('booking is deleted');
              })
              .catch((error) => {
                console.error("Error deleting booking:", error);
                toast.error('Something went wrong.');
              });
          },
        });
      };
   
  
      const handleImageClick = (imageSrc) => {
        setClickedImage(imageSrc);
      };

  


  return (
  <>
      <ToastContainer/>

    <div className="container-fluid mt-2">
      
      <div className="card" style={{height:"auto"}}>
        <div className="card-header" style={{display:"flex",justifyContent:"space-between",fontSize:"30px"}}>
          <h5>Booking Status</h5>
          <i class="fa-solid fa-trash" style={{color:"#ce0404",cursor:"pointer"}}   onClick={() => {
                          onDeleteStudent(user?._id);
                        }}></i>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Day:</h6>
              <p>{`${user?.day}`}</p>
              <h6>Year:</h6>
              <p>{user?.year}</p>
   
          
              <h6>Day Name:</h6>
              <p>{user?.dayName}</p>
              <h6>Time:</h6>
              <p>{user?.time}</p>
              <h6>User:</h6>
              <p>{user?.userId?.name}</p>
            </div>
            <div className="col-md-6">
              <h6>Address:</h6>
              <p>{user?.address}</p>
              <h6>Block Date:</h6>
              <p>{user?.bookDate}</p>
              <h6>Information:</h6>
              <p>{user?.info}</p>
              <h6>Category:</h6>
              <p>{user?.categoryId?.name}</p>
              <h6>SubCategory:</h6>
              <p>{user?.subCategoryId?.name}</p>
            </div>
          </div>
          <div className="row">
    
          {user.image1 ?     <div className="col-md-6">
              <h6>Image 1:</h6>
              <img src={user?.image1 }  data-bs-toggle="modal" data-bs-target="#staticBackdrop1" alt="Service Image" style={{maxHeight:"100px"}} className="img-fluid" />
            </div>: null}

            {user.image2 ?      <div className="col-md-6">
              <h6>Image 2:</h6>
              <img src={user?.image2} data-bs-toggle="modal" data-bs-target="#staticBackdrop2" alt="Service Image" style={{maxHeight:"100px"}} className="img-fluid" />
            </div>: null}
         
          </div>
          <div className="row">
    
          {user.image3 ?    <div className="col-md-6">
              <h6>Image 3:</h6>
              <img src={user?.image3} data-bs-toggle="modal" data-bs-target="#staticBackdrop3" alt="Service Image" style={{maxHeight:"100px"}} className="img-fluid" />
            </div> : null}

            {user.image4 ?  
             <div className="col-md-6">
              <h6>Image 4:</h6>
             <img src={user.image4} data-bs-toggle="modal" data-bs-target="#staticBackdrop4" alt="Service Image" style={{maxHeight:"100px"}} className="img-fluid" />

            </div>: null}
         
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
      <img src={user?.image1 } alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
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
      <img src={user?.image2 } alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
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
      <img src={user?.image3 } alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog " >
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src={user?.image4 } alt="Service Image" style={{height:"40vh",width:"auto",objectFit:"contain"}} className="img-fluid" />
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default BookingStatusView;
