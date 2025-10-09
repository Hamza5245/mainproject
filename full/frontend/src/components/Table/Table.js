import React from 'react';

function Table({ headers, data }) {
  return (
    <>
      
      <div className="table-responsive" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:"10px",padding:"10px",margin:"5px"}}>
    
        <table className="table" >
       
          <thead >
            <tr class="table-light">
              {headers.map((header, index) => (
                <th key={index} scope="col">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody >
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>

 
        </table>
      </div>

    </>
  );
}

export default Table;
