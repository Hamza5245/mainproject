import React, { useEffect, useState } from 'react'
import "../ChildCategory/category.css"
import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import ApiUrl from '../../ApiUrl';

function UpdateService() {
    const { id } = useParams();
const navigate=useNavigate()
const [country, setCountry] = useState([]);
const [newCountry, setNewCountry] = useState({ _id: '', name: '' });
const [selectedOption, setSelectedOption] = useState('1');
const [category, setCategory] = useState([]);
const [imagePreview, setImagePreview] = useState('');
const [imageFile, setImageFile] = useState(null);
useEffect(() => {
    setImagePreview(category.image);
  }, [category.image]);

useEffect(() => {
  axios.get(`${ApiUrl}/category/get`).then((res) => {
      setCountry(res.data.data);
  }).catch((error) => {
    toast.warning('Please check your internet connection');
  });
}, []);

useEffect(() => {
    axios.get(`${ApiUrl}/subCategory/get/${id}`).then((res) => {
      setCategory(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, [id]);


  const sendData = (values) => {

    const params = new FormData();

    params.append('image', values?.image?.files[0]);
    params.append("name", values?.serviceName?.value);
    params.append("type", selectedOption); 
    params.append("warranty", values?.warranty?.value);
    params.append("about", values?.details?.value);
    params.append("priceSuggest", values?.price?.value);
    params.append("categoryId", newCountry._id);
    if(values?.price?.value){
      params.append("priceSuggest", values?.price?.value !== undefined);
    }

//   console.log(params,"11111111111111111111111111111111");

    axios.put(`${ApiUrl}/subCategory/update/${id}`, params)
    .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
            toast.success('Service is Updated');
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
  return (
    <>
    <ToastContainer/>
    <div className="container-fluid">
  <div className="card mt-2" style={{height:"auto"}}>
    <div className="card-header">
      <h5>Update Service</h5>
    </div>
    <div className="card-body">
      <form onSubmit={(e) => {
        e.preventDefault();
        sendData(e.target);
      }}>
        <div className="form-group row mt-3">
          <label htmlFor="image" className="col-sm-2 col-form-label">Image:</label>
          <div className="col-sm-10 position-relative">
            {imageFile && (
              <button className="btn btn-secondary position-absolute top-0 end-0 m-2 p-2" onClick={handleCancelImage}>X</button>
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
          <label htmlFor="serviceName" className="col-sm-2 col-form-label">Service Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="serviceName"
              name="serviceName"
              placeholder="Enter service name"
              required
              defaultValue={category.name}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label htmlFor="warranty" className="col-sm-2 col-form-label">Warranty:</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="warranty"
              name="warranty"
              placeholder="Enter warranty in days"
              required
              defaultValue={category.warranty}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label htmlFor="type" className="col-sm-2 col-form-label">Type:</label>
          <div className="col-sm-10">
            <select className="form-control" required value={selectedOption} onChange={handleType}>

              <option >Select Type</option>
              <option value="quotation">Quotation</option>
              <option value="suggestPrice">Suggest Price</option>
            </select>
            {selectedOption === 'suggestPrice' && (
              <input
                type="number"
                className="form-control mt-2"
                id="price"
                name="price"
                placeholder="Enter suggested price"
                required
                defaultValue={category.priceSuggest}
              />
            )}
          </div>
        </div>
        <div className="form-group row mt-3">
          <label htmlFor="details" className="col-sm-2 col-form-label">Details:</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="details"
              name="details"
              placeholder="Enter service details"
              required
              defaultValue={category.about}
            />
          </div>
        </div>
        <div className="form-group row mt-3">
          <label htmlFor="country" className="col-sm-2 col-form-label">Sub Category:</label>
          <div className="col-sm-10">
            <select className="form-control" onChange={handleChange}>
              <option >Select Sub Category</option>
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

export default UpdateService