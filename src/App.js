import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // ✅ only once
import "react-toastify/dist/ReactToastify.css";  // ✅ don't forget the CSS

// Components...
import Master from "./component/Layouts/Master";
import Home from "./component/Pages/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import AdminMaster from "./component/Layouts/AdminMaster";
import AdminHome from "./Admin/AdminHome";
import FeedbackHistory from "./Admin/FeedbackHistory";
import ManageUsers from "./Admin/ManageUsers";
import AdminReply from "./Admin/AdminReply";
import UserMaster from "./component/Layouts/UserMaster";
import UserHome from "./Users/UserHome";
import FeedbackForm from "./Users/FeedbackForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Master />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<AdminMaster />}>
          <Route index element={<AdminHome />} />
          <Route path="feedback" element={<FeedbackHistory />} />
          <Route path="manage" element={<ManageUsers />} />
          <Route path="reply/:id" element={<AdminReply />} />
        </Route>

        <Route path="/user" element={<UserMaster />}>
          <Route index element={<UserHome />} />
          <Route path="feedback" element={<FeedbackForm />} />
        </Route>
      </Routes>

      {/* ✅ Toast container should be rendered once */}
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
