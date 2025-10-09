import React, { useEffect, useState } from "react";
import ApiUrl from "../../ApiUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { toast,ToastContainer } from "react-toastify";

function Country() {
  // const [newCountry, setNewCountry] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios.get(`${ApiUrl}/country/get`).then((res) => {
      setCategory(res.data.data);
    }).catch((error) => {
      toast.warning('Please check your internet connection');
    });
  }, []);

  const onDeleteStudent = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      onOk: () => {
        // const params = {
        //   id:id,
        // };
  
        
        axios
          .delete(
            `${ApiUrl}/country/delete/${id}`
          )
          .then((res) => {
            console.log(
              res.data
            );
  
          
      
              axios.get(`${ApiUrl}/country/get`).then((res) => {
                setCategory(res.data.data);
              }).catch((error) => {
                toast.warning('Please check your internet connection');
              });
     
  
       
            toast.success('country is deleted')
          });
  
      },
    });
  };
  
  
  return (
    <>





    <ToastContainer/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <div>
          <h3>County</h3>
        </div>
        <div>
          <Link to="/addCountry">
            <button className="btn btn-primary">Add</button>
          </Link>
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
              <th>Country</th>
              <th>Currency</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((item, index) => {
              return (
                <tr class="table-light">
                  <th>{index + 1}</th>

                  {/* <th>{item.image}</th> */}
                  <th>{item.name}</th>
                  <th>{item.unit}</th>
                  <th>
                    {" "}
                    <div className="actions d-flex">
                
                      <span
                        style={{ fontSize: 21 }}
                        className="px-3"
                        onClick={() => {
                          onDeleteStudent(item?._id);
                        }}
                      >
                        <i class="fa-solid fa-trash" style={{color:"#ce0404"}}></i>
                      </span>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>








    </>
  );
}

export default Country;
