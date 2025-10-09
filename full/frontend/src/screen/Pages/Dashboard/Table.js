// import "../Dashboard/style.css";
// import "../Dashboard/secondTable.css";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// const List = () => {
//   const rows = [
//     {
//       product: "Ali",
//    id:"#543455",
//       revenue: "2222",
//       conversion: "666666",
//       status: "Shaheen Chemist",
//       class: "short",
//       report:"",
//       injury:"Nose Bleeding",
//       total:"Rs 15000",
//       action:"",
//       img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//     },
//     {
//       product: "Hassan",
//       id:"#543455",
//       revenue: "3333333",
//       conversion: "777777",
//       status: "Plus Pharmacy",
//       class: "inStock",
//       injury:"Nose Bleeding",
//       total:"Rs 15000" ,
//       action:"",
//       img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//     },
//     {
//       id:"#543455",
//       product: "Qasim",
//       total:"Rs 15000",
//       revenue: "4444444444",
//       conversion: "888888",
//       status: "Habib Chemist",
//       class: "coming",
//       injury:"Nose Bleeding" ,
//       action:"",
//       img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
//     },
//   ];
//   return (
//     <section className="section">
   
//       <TableContainer component={Paper} className="table">
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow style={{ background: "#F5F5F7" }}>
//               <TableCell className="tableHeadCell">Order Id</TableCell>
//               <TableCell className="tableHeadCell">Products</TableCell>
//               <TableCell className="tableHeadCell">Date</TableCell>
//               <TableCell className="tableHeadCell">Customer</TableCell>
//               <TableCell className="tableHeadCell">Amount</TableCell>
//               <TableCell className="tableHeadCell">Payment by</TableCell>
//               <TableCell className="tableHeadCell">Status</TableCell>
      
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row, i) => (
//               <TableRow key={i} className="tableRow">
//                  <TableCell className="tableCell">{row.id}</TableCell>
//                 <TableCell className="tableCell">
//                   <div className="cellWrapper">
//                   <img src={row.img} alt="" className="image" />
//                   </div>
//                 </TableCell>
//                 {/* <TableCell className="tableCell">{row.product}</TableCell> */}
//                 <TableCell className="tableCell">
//                   <span className={`status ${row.status}`}>{row.status}</span>
//                 </TableCell>
//                 <TableCell className="tableCell">{row.revenue}</TableCell>
//                 <TableCell className="tableCell">{row.conversion}</TableCell>
//                   <TableCell className="tableCell">{row.conversion}</TableCell>
                 
//                  <TableCell className="tableCell"> <p style={{backgroundColor:"#E1F4E9",color:"#27AE60",borderRadius:"5px",textAlign:"center",padding:"5px"}}>Done</p></TableCell>
               
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </section>
//   );
// };

// export default List;
