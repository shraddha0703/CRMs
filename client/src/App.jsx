import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admindashboard from "./Pages/AdminDashboard";
import Userdashboard from "./Pages/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Components/VerifyOTP";
import MyTasks from "./Pages/MyTask";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admindashboard" element={<Admindashboard />} />

          <Route path="/Userdashboard" element={<Userdashboard />} />

          <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
      {/* ADMIN cAN ACCESS ONLY */}
      {/* <Route
        path="Admindashborad"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Admindashboard />
          </ProtectedRoute>
        }
      /> */}
      {/* ONLY USERS CAN ACCESS */}
      {/* 
          <Route
            path="/UserDashboard"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          /> */}
      {/* </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />

          {/* ✅ ADMIN ONLY */}
          <Route
            path="/Admindashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Admindashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ USER ONLY */}
          <Route
            path="/Userdashboard"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <Userdashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Mytask"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <MyTasks />
              </ProtectedRoute>
            }
          />

          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
