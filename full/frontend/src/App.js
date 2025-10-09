import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashin from "./components/Dashin";
import Dashboard from "./screen/Pages/Dashboard/Dashbord";
import AllCategory from "./components/ChildCategory/AllCategory";
import CreateCategory from "./components/ChildCategory/CreateCategory";
// import Login from "./components/Auth/Login";
import Login2 from "./components/Auth/Login2";
import Chat from "./components/Chat/Chat";
import Country from "./components/Country/Country";
import AddCountry from "./components/Country/AddCountry";
import UpdateCategory from "./components/ChildCategory/UpdateCategory";
import CreateSubCategory from "./components/ChildCategory/SubCategory/CreateSubCategory";
import SubCategory from "./components/ChildCategory/SubCategory/SubCategory";
import UpdateSubCategory from "./components/ChildCategory/SubCategory/UpdateSubCategory";
import CreateService from "./components/ServiceList/CreateServiceList";
import ServiceList from "./components/ServiceList/ServiceList";
import UpdateService from "./components/ServiceList/UpdateServiceList";
import Taxes from "./components/Taxes/Taxes";
import Provider from "./components/Providers/Provider";
import ViewProvider from "./components/Providers/ViewProvder";
import Customer from "./components/Customer/Customer";

import BookingStatus from "./components/Booking/BookingStatus";
import CustomerView from "./components/Customer/CustomerView";
import BookingStatusView from "./components/Booking/BookingStatusView";
import AssignWork from "./components/Booking/AssistWork";
import Login from "./components/Auth/Login";
import WarrantyStatus from "./components/WarrantyStatus/WarrantyStatus";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";
import PendingAmount from "./components/PendingAmount/PendingAmount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Dashin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<AllCategory />} />
            <Route path="/addCategory" element={<CreateCategory />} />
            <Route path="/country" element={<Country />} />
            <Route path="/addCountry" element={<AddCountry />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/updateCategory/:id" element={<UpdateCategory />} />
            <Route path="/updateSubCategory/:id" element={<UpdateSubCategory />} />
            <Route path="/viewSeller/:id" element={<ViewProvider />} />
            <Route path="/createSubCategory" element={<CreateSubCategory />} />
            <Route path="/subCategory" element={<SubCategory />} />
            <Route path="/createServiceList" element={<CreateService />} />
            <Route path="/serviceList" element={<ServiceList />} />
            <Route path="/updateServiceList/:id" element={<UpdateService />} />

            <Route path="/taxes" element={<Taxes />} />viewSeller
            <Route path="/provider" element={<Provider />} />
            <Route path="/Customers" element={<Customer />} />
            <Route path="/customerView/:id" element={<CustomerView />} />
            <Route path="/viewBookingStatus/:id" element={<BookingStatusView />} />
            <Route path="/BookingStatus" element={<BookingStatus />} />
            <Route path="/warrantyStatus" element={<WarrantyStatus />} />
            <Route path="/paymentHistory" element={<PaymentHistory />} />
            <Route path="/pendingAmount" element={<PendingAmount />} />
            <Route path="/assignWork" element={<AssignWork />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
