import React, { useEffect, useState } from 'react'
import "../ChildCategory/category.css"
import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';

function CreateService() {
const navigate=useNavigate()
const [country, setCountry] = useState([]);
const [newCountry, setNewCountry] = useState({ _id: '', name: '' });
const [selectedOption, setSelectedOption] = useState('');

useEffect(() => {
  axios.get(`${ApiUrl}/category/get`).then((res) => {
      setCountry(res.data.data);
  }).catch((error) => {
    toast.warning('Please check your internet connection');
  });
}, []);




const sendData = (values) => {
  // Check if image is present
  if (!values?.image?.files[0]) {
    toast.error('Please select an image.');
    return; // Stop further execution
  }

  // Check if serviceName is present
  if (!values?.serviceName?.value) {
    toast.error('Please enter a service name.');
    return; // Stop further execution
  }

  // Check if selectedOption is present
  if (!selectedOption) {
    toast.error('Please select a type.');
    return; // Stop further execution
  }

  // Check if warranty is present
  if (!values?.warranty?.value) {
    toast.error('Please enter warranty details.');
    return; // Stop further execution
  }

  // Check if detals is present
  if (!values?.detals?.value) {
    toast.error('Please enter service details.');
    return; // Stop further execution
  }

  // Check if newCountry._id is present
  if (!newCountry._id) {
    toast.error('Please select a category.');
    return; // Stop further execution
  }

  // All  values are present, proceed with sending the data
  const params = new FormData();
  params.append('image', values?.image?.files[0]);
  params.append("name", values?.serviceName?.value);
  params.append("type", selectedOption); 
  params.append("warranty", values?.warranty?.value);
  params.append("about", values?.detals?.value);
  params.append("categoryId", newCountry._id);
  if(values?.price?.value){
    params.append("priceSuggest", values?.price?.value );
  }

  // Send the data
  axios.post(`${ApiUrl}/subCategory/create`, params)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === "ok") {
        toast.success('Service is created');
        setTimeout(() => {
          navigate("/serviceList");
        }, 1000);
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

  const handleType = (event) => {
    setSelectedOption(event.target.value);

  };
//   console.log(selectedOption,"yyyyyyyyyyyyyyyyyyyyyy");
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
              <label>Service Name</label>
              <input
                type="text"
                className="form-control"
                name="serviceName"
                placeholder="name"
                
              />
            </div>
          </div>

          <div className="field row">
            <div className="input-field  col-md-6" >
              <label>Warranty</label>
              <input

                type="number"
                className="form-control"
                name="warranty"
                placeholder="days"
                
              />
            </div>
            <div className="input-field col-md-6" >
              <label>Type</label>
              <div className="form-group">

      <select className="form-control" value={selectedOption} onChange={handleType}>
        <option>Select Type</option>
        <option value="quotation">Quotation</option>
        <option value="suggestPrice">Suggest Price</option>
      </select>
      {selectedOption === 'suggestPrice' && (
        <input
          type="number"
          className="form-control"
          name="price"
          placeholder="price"
          
        />
      )}
    </div>
            </div>
          </div>
          <div className="field row">
          
          <div className="input-field  col-md-6" >
              <label>Detail</label>
              <textarea
               
                className="form-control"
                name="detals"
                placeholder="detail"
                
              />
            </div>

            <div className="input-field col-md-6" >
              <label>Sub Category</label>
              <select className="form-control" onChange={handleChange}>
                <option >Select Sub Category</option>
                {country.map((item, index) => (
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

export default CreateService