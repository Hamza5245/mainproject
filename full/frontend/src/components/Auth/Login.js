import React from 'react'
import { FcGoogle } from "react-icons/fc";
import "./login.css";
import { FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Login() {
    const borderRadiusStyle = {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
  margin:"0",
  padding: "0px",
        backgroundColor:"#0A82FD",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      };
    const borderRadiusStyle2 = {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        backgroundColor:"#ffff",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
padding:"100px"

      };
  return (
   <>
   <div className='container'>
   <div className='row mt-5 mb-5'>
   <div className='col-md-6 forNewResponsive' style={borderRadiusStyle}>
<div>
<img src={require("../../assets/images/WhatsApp_Image_2024-03-03_at_11.34.50_AM-removebg-preview.png")} style={{margin:"40px",maxHeight:"70px"}} />
</div>

<img src={require("../../assets/images/welcome-vector-ad0638ec.png")} style={{height:"auto",width:"100%",   borderBottomLeftRadius: '10px',}}/>
</div>
   <div className='col-md-6 forResponsivelogin' style={borderRadiusStyle2}>
<div><h4>Login</h4>
<div className="fields">      
              <div className="input-field mt-4">        
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field mt-4" >
          
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
{/* <p style={{display:"flex",justifyContent:"space-between"}}><span>Remember Me</span> <span>Forgot Password?</span></p> */}

<Link to="/dashboard"><button className='btn btn-primary w-100'>Get Started</button></Link>
{/* <p className='mt-3' style={{textAlign:"center",opacity:"0.5"}}>or login with</p> */}

<div className='d-flex ' style={{justifyContent:"space-between"}}>
{/* <button className='btn btn-light' style={{minWidth:"49%"}}><FcGoogle size={22}/> Google</button>
<button className='btn btn-light' style={{minWidth:"49%"}}><FaApple size={22}/> Apple</button> */}


</div>
{/* <p className='mt-2'>Dont’t have an account ?<span><a href=''>Get Started</a></span></p> */}
</div>
</div>
</div>
   </div>
   
   </>
  )
}

export default Login