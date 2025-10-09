import React, { useState } from 'react'
import "../category.css"
import axios from 'axios'
import ApiUrl from '../../../ApiUrl'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
function UpdateSubCategory() {
    const { id } = useParams();
const navigate=useNavigate()
const [newCategory, setNewCategory] = useState([]);
const [category, setCategory] = useState([]);
const [country, setCountry] = useState([]);
const [imagePreview, setImagePreview] = useState('');
const [imageFile, setImageFile] = useState(null);
const [newCountry, setNewCountry] = useState({ _id: '', name: '' });
const [fetchCategory, setFetchCategory] = useState({ _id: '', name: '' });

useEffect(() => {
  axios.get(`${ApiUrl}/country/get`).then((res) => {
      setCountry(res.data.data);
  }).catch((error) => {
    toast.warning('Please check your internet connection');
  });
}, []);


useEffect(() => {
    axios.get(`${ApiUrl}/service/get`).then((res) => {
      setNewCategory(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);
useEffect(() => {
  axios.get(`${ApiUrl}/category/get/${id}`).then((res) => {
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
    params.append("countryId", newCountry._id);
    params.append("serviceId", fetchCategory._id);


  
    // Code for sending data (e.g., using Axios)
    axios.put(`${ApiUrl}/category/update/${id}`, params)
    .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
            toast.success('Subcategory is Updated');
            setTimeout(() => {
                navigate("/subCategory");
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

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const [_id, name] = selectedValue.split(',');
    // Now 'id' contains the ID of the selected country
    // and 'name' contains the name of the selected country

    setNewCountry({ _id, name });
  };
const handleCategory = (event) => {
    const selectedValue = event.target.value;
    const [_id, name] = selectedValue.split(',');
    // Now 'id' contains the ID of the selected country
    // and 'name' contains the name of the selected country

    setFetchCategory({ _id, name })
  };
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
                    
                  <img src={imagePreview} alt="Preview" style={{ maxHeight: "120px", maxWidth: "200px", cursor: "pointer" }} />
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
              <label htmlFor="fullName" className="col-sm-2 col-form-label">Sub Category :</label>
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
              <label htmlFor="fullName" className="col-sm-2 col-form-label">Category:</label>
              <div className="col-sm-10">
              <select className="form-control" onChange={handleCategory} >
  <option>Select Country</option>
  {newCategory.map((item, index) => (
    <option key={index} value={`${item._id},${item.name}`}>{item.name}</option>
  ))}
</select>
              </div>
            </div>

            <div className="form-group row mt-3">
              <label htmlFor="fullName" className="col-sm-2 col-form-label">Country :</label>
              <div className="col-sm-10">
              <select className="form-control" onChange={handleChange}>
  <option disabled>Select Country</option>
  {country.map((item, index) => (
    <option key={index} value={`${item._id},${item.name}`}>{item.name}</option>
  ))}
</select>

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

export default UpdateSubCategory