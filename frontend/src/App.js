import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import CustomerHome from "./pages/CustomerHome";
import LoanApplicationForm from "./pages/LoanApplicationForm";
import DealerHome from "./pages/DealerHome";

import Reminder from "./pages/Reminder";
import Profile from "./pages/Profile";
import TrainingPolicies from "./pages/TrainingPolicies";
import NewApplication from "./pages/NewApplication";
import CustomerLoanDetail from "./pages/CustomerLoanDetail";
import Collection from "./pages/Collection";
import Enquiry from "./pages/Enquiry";
import FieldInspection from "./pages/FieldInspection";
import AdminHome from "./pages/AdminHome";
import NewApplicationUpload from "./pages/NewApplicationUpload";
import Chassis from "./pages/Chassis";
import Battery from "./pages/Battery";
import CustomerVehicle from "./pages/CustomerVehicle";
import Insurance from "./pages/Insurance";
import Invoice from "./pages/Invoice";
import Motor from "./pages/motor";
import Rc from "./pages/Rc";
import Passbook from "./pages/Passbook";
import VehicleDispatch from "./pages/VehicleDispatch";
import Nach from "./pages/Nach";
import LoanDocumentUpload from "./pages/LoanDocumentUpload";
import Pan from "./pages/Pan";
import AadharFront from "./pages/AadharFront";
import AAdharBack from "./pages/AAdharBack";
import ProfilePic from "./pages/ProfilePic";
import AdminLoans from "./pages/AdminLoans";
import AdminDealerProfile from "./pages/AdminDealerProfile";
import AdminCreateDealer from "./pages/AdminCreateDealer";
import AdminDocument from "./pages/AdminDocument";
import ProtectedRoute from "./pages/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const userType = localStorage.getItem("userType"); // Retrieve userType from localStorage

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />

          {/* Customer Routes */}
          <Route
            element={<ProtectedRoute allowedUserTypes={["customer"]} userType={userType} />}
          >
            <Route path="/customer-home" element={<CustomerHome />} />
            <Route
              path="/customer-home/apply-loan"
              element={<LoanApplicationForm />}
            />
            <Route
              path="/customer-home/upload-doc"
              element={<LoanDocumentUpload />}
            />
            <Route path="/customer-home/upload/pan" element={<Pan />} />
            <Route
              path="/customer-home/upload/aadhar-front"
              element={<AadharFront />}
            />
            <Route
              path="/customer-home/upload/aadhar-back"
              element={<AAdharBack />}
            />
            <Route
              path="/customer-home/upload/profile-pic"
              element={<ProfilePic />}
            />
          </Route>

          {/* Dealer Routes */}
          <Route
            element={<ProtectedRoute allowedUserTypes={["dealer"]} userType={userType} />}
          >
            <Route path="/dealer-home" element={<DealerHome />} />
            <Route path="/dealer-home/reminder" element={<Reminder />} />
            <Route path="/dealer-home/profile" element={<Profile />} />
            <Route
              path="/dealer-home/training-policies"
              element={<TrainingPolicies />}
            />
            <Route path="/dealer-home/new-application" element={<NewApplication />} />
            <Route
              path="/dealer-home/new-application/upload"
              element={<NewApplicationUpload />}
            />
            {/* Document upload routes */}
            <Route
              path="/dealer-home/new-application/upload/chassis"
              element={<Chassis />}
            />
            <Route
              path="/dealer-home/new-application/upload/motor"
              element={<Motor />}
            />
            <Route
              path="/dealer-home/new-application/upload/battery"
              element={<Battery />}
            />
            <Route
              path="/dealer-home/new-application/upload/passbook"
              element={<Passbook />}
            />
            <Route
              path="/dealer-home/new-application/upload/customer"
              element={<CustomerVehicle />}
            />
            <Route
              path="/dealer-home/new-application/upload/invoice"
              element={<Invoice />}
            />
            <Route
              path="/dealer-home/new-application/upload/nach"
              element={<Nach />}
            />
            <Route
              path="/dealer-home/new-application/upload/insurance"
              element={<Insurance />}
            />
            <Route
              path="/dealer-home/new-application/upload/dispatch"
              element={<VehicleDispatch />}
            />
            <Route
              path="/dealer-home/new-application/upload/rc"
              element={<Rc />}
            />
            <Route
              path="/dealer-home/customer-loan-detail"
              element={<CustomerLoanDetail />}
            />
            <Route path="/dealer-home/collection" element={<Collection />} />
            <Route path="/dealer-home/enquiry" element={<Enquiry />} />
            <Route path="/dealer-home/field-inspection" element={<FieldInspection />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={<ProtectedRoute allowedUserTypes={["admin"]} userType={userType} />}
          >
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/admin-home/loans" element={<AdminLoans />} />
            <Route
              path="/admin-home/dealer-profile"
              element={<AdminDealerProfile />}
            />
            <Route
              path="/admin-home/create-dealer"
              element={<AdminCreateDealer />}
            />
            <Route
              path="/admin-home/new-application/document"
              element={<AdminDocument />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;