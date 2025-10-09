import React, { useState } from 'react'
import "./category.css"
import axios from 'axios'
import ApiUrl from '../../ApiUrl'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
function UpdateCategory() {
    const { id } = useParams();
const navigate=useNavigate()

const [category, setCategory] = useState([]);
const [imagePreview, setImagePreview] = useState('');
const [imageFile, setImageFile] = useState(null);
useEffect(() => {
  axios.get(`${ApiUrl}/service/get/${id}`).then((res) => {
    setCategory(res.data.data); 
  }).catch((error) => {
    toast.warning('Please check your internet connection');
  });
}, [id]);

useEffect(() => {
    setImagePreview(category.image);
  }, [category.image]);

  const sendData = (values) => {
    const params = new FormData();
    params.append('image', values.image.files[0]);
    params.append("name", values.fullName.value);  


    
    // Code for sending data (e.g., using Axios)
    axios.put(`${ApiUrl}/service/update/${id}`, params)
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

const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setImagePreview(category.image);
    setImageFile(null);
    document.getElementById('fileInput').value = ''; // Reset file input
  };

console.log(category,"-------------------");
  return (
    <>
    <ToastContainer/>
    <div className="container-fluid">
      <div className="card mt-2">
        <div className="card-header">
          <h5>Update Category</h5>
        </div>
        <div className="card-body">
          <form onSubmit={(e) => {
            e.preventDefault();
            sendData(e.target);
          }}>
            <div className="form-group row mt-3">
              <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
              <div className="col-sm-10">
              {imageFile && (
                  <button className="btn btn-secondary position-absolute top-1 end-0 mx-2 p-2" onClick={handleCancelImage}>X</button>
                )}
                <label htmlFor="fileInput">
                    
                  <img src={imagePreview} alt="Preview" style={{ maxHeight: "200px", maxWidth: "200px", cursor: "pointer" }} />
                </label>
                <input
                  type="file"
                  className="form-control-file mt-3"
                  id="fileInput"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
            
              </div>
            </div>
            <div className="form-group row mt-3">
              <label htmlFor="fullName" className="col-sm-2 col-form-label">Category Name:</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter category name"
                  defaultValue={category.name}
                  required
                />
              </div>
            </div>
            <div className="form-group row mt-3">
              <div className="col-sm-10 offset-sm-2">
                <button className="btn btn-primary w-100" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default UpdateCategory