import React, { useState } from "react";
import ScrollableSection from "./DashMain";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Content from "./Content";

function Dashin({children}) {
  const [togg,setTogg]=useState(false)
  // const [showContent, setShowContent] = useState(false);
  const changeTogg=()=>{
    setTogg(!togg)
  }

  const [isHidden, setIsHidden] = useState(true);

  const toggleDiv = () => {
    setIsHidden(!isHidden);
  };



  const [content, setContent] = useState(null);

  const handleIconClick = (clickedContent) => {
    if (content === clickedContent) {
      // If the clicked icon is already selected, hide the content
      setContent(null);
    } else {
      // Otherwise, show the content associated with the clicked icon
      setContent(clickedContent);
    }
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div className="">
          <div className="">
            
            <ScrollableSection onIconClick={handleIconClick}   isHidden={isHidden} press2={toggleDiv}  press={changeTogg} left={togg?'-12%':'0'}/>
          </div>

          <div className="" id="common_bar" style={{marginLeft:togg?'85px':'250px'}} >
          <Nav press={changeTogg} press2={toggleDiv}/>
              <Outlet />
            
        
              <Content content={content}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashin;
