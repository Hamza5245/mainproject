import React, { useEffect, useState } from 'react'
import "../ChildCategory/category.css"
import axios from 'axios'
import ApiUrl from '../../ApiUrl'
import { ToastContainer, toast } from "react-toastify";
function Taxes(){

const [forTax, setForTax] = useState([]);

useEffect(() => {
  axios.get(`${ApiUrl}/tax/get`)
    .then((res) => {
      setForTax(res.data.data);
     
    })
    .catch((error) => {
      toast.warning('Please check your internet connection');
    });
}, []);

console.log(forTax,"----------------------")
  const sendData = (values) => {


    const params = {
      code: values.code.value,
      codeDiscount: values.codeDiscount.value,
      gst: values.gst.value,
      plentyTax: values.plentyTax.value,
      adminTax: values.adminTax.value,
      platformTax: values.platformTax.value,
      serviceTax: values.serviceTax.value,
    };

    
    // Code for sending data (e.g., using Axios)
    axios.post(`${ApiUrl}/tax/create`, params)
    .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
            toast.success('Tax Updated');
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
      <div className="card shadow" style={{height:"auto"}}>
        <div className="card-body" >
          <h5 className="card-title  mb-4" style={{color:"#45484D"}}>Add Taxes</h5>
          <form onSubmit={(e) => {
            e.preventDefault();
            sendData(e.target);
          }}>
        
            <div className="form-group mt-3">
              <label htmlFor="fullName">code</label>
              <input
                type="text"
                className="form-control"
         defu
                name="code"
                placeholder="Enter Code"
                required
                defaultValue={forTax[0]?.code}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">Code Discount (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.codeDiscount}
                name="codeDiscount"
                placeholder="%"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">GST (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.gst}
              name="gst"
              placeholder="%"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">Plenty Tax (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.plentyTax}
                name="plentyTax"
                placeholder="%"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">Admin Tax (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.
                  adminTax
                  }
                name="adminTax"
                placeholder="%"
                required
              />
            </div>


            <div className="form-group mt-3">
              <label htmlFor="fullName">Platform Tax (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.
                  platformTax
                  }
                name="platformTax"
                placeholder="%"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="fullName">Service Tax (%)</label>
              <input
                type="number"
                className="form-control"
                defaultValue={forTax[0]?.
                  serviceTax
                  }
                name="serviceTax"
                placeholder="%"
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

export default Taxes