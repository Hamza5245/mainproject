import React, { useEffect, useState } from 'react'
import "../category.css"
import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import ApiUrl from '../../../ApiUrl';
function CreateSubCategory() {
const navigate=useNavigate()
const [country, setCountry] = useState([]);
const [newCategory, setNewCategory] = useState([]);
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

  const sendData = (values) => {
    // Check if image is present
    if (!values.image || !values.image.files || !values.image.files[0]) {
      toast.error('Please select an image.');
      return; // Stop further execution
    }
  
    // Check if fullName is present
    if (!values.fullName || !values.fullName.value) {
      toast.error('Please enter a sub category name.');
      return; // Stop further execution
    }
  
    // Check if newCountry._id is present
    if (!newCountry || !newCountry._id) {
      toast.error('Please select a country.');
      return; // Stop further execution
    }
  
    // Check if fetchCategory._id is present
    if (!fetchCategory || !fetchCategory._id) {
      toast.error('Please select a category.');
      return; // Stop further execution
    }
  
    // All  values are present, proceed with sending the data
    const params = new FormData();
    params.append('image', values.image.files[0]);
    params.append("name", values.fullName.value);
    params.append("countryId", newCountry._id);
    params.append("serviceId", fetchCategory._id);
  
    // Send the data
    axios.post(`${ApiUrl}/category/create`, params)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          toast.success('Subcategory is created');
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
  <div className="ForForm mt-2">
    <header>Add</header>
    <form onSubmit={(e) => {
      e.preventDefault();
      sendData(e.target);
    }}>
      <div className="fo">
        <div className="">

          <div className="field row">
            <div className="input-field  col-md-6" >
              <label>Image</label>
              <input
                type="file"
                className="form-control pt-2"
                name="image"
                placeholder="image"
                
              />
            </div>
            <div className="input-field col-md-6" >
              <label>Sub Category Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                placeholder="name"
                
              />
            </div>
          </div>
          <div className="field row">
            <div className="input-field col-md-6" >
              <label>Country</label>
              <select className="form-control" onChange={handleChange}>
                <option >Select Country</option>
                {country.map((item, index) => (
                  <option key={index} value={`${item._id},${item.name}`}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="input-field col-md-6" >
              <label>Category</label>
              <select className="form-control" onChange={handleCategory}>
                <option >Select Category</option>
                {newCategory.map((item, index) => (
                  <option key={index} value={`${item._id},${item.name}`}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <button className='btn btn-primary w-100 mt-3' type='submit'>Submit</button>
    </form>
  </div>
</div>

    </>
  )
}

export default CreateSubCategory