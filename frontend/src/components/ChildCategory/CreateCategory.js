import React from 'react'
import "./category.css"
import axios from 'axios'
import ApiUrl from '../../ApiUrl'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function CreateCategory() {
const navigate=useNavigate()
  const sendData = (values) => {


    const params = new FormData();
    params.append('image', values.image.files[0]);
    params.append("name", values.fullName.value);


    
    // Code for sending data (e.g., using Axios)
    axios.post(`${ApiUrl}/service/create`, params)
    .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
            toast.success('Category is created');
            setTimeout(() => {
                navigate("/categories");
            }, 1000); // Navigating after 2 seconds (adjust the delay as needed)
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
    <ToastContainer/>
    <div className="container-fluid mt-3">
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title  mb-4" style={{color:"#45484D"}}>Add Category</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            sendData(e.target);
          }}>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter category name"
                required
              />
            </div>
            <button className="btn btn-primary btn-block mt-3 w-100" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default CreateCategory