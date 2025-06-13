// src/component/Layouts/UserMaster.jsx
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

export default function UserMaster() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 1) Navbar at top */}
      <UserHeader />

      {/* 2) Content (Outlet will render UserHome, FeedbackForm, or UserStatus here) */}
      <div className="flex-grow-1">
        <Outlet />
      </div>

      {/* 3) Footer at bottom */}
      <UserFooter />
    </div>
  );
}
