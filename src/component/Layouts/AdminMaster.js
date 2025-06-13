// src/component/Layouts/AdminMaster.jsx
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

export default function AdminMaster() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 1) Navbar */}
      <AdminHeader />

      {/* 2) Page content */}
      <div className="flex-grow-1">
        <Outlet />
      </div>

      {/* 3) Footer */}
      <AdminFooter />
    </div>
  );
}
