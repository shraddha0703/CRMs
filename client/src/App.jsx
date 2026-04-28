import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admindashboard from "./Pages/AdminDashboard";
import Userdashboard from "./Pages/UserDashboard";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOTP from "./Components/VerifyOTP";
import MyTasks from "./Pages/MyTask";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import TaskManage from "./Pages/TaskManage";
import Calendar from "./Pages/Calender";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Navbar" element={<Navbar />} />

          {/* ✅ ADMIN ONLY */}
          <Route
            path="/Admindashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Admindashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ManageTask"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TaskManage />
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
            path="/Mytasks"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Calender"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <Calendar />
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
