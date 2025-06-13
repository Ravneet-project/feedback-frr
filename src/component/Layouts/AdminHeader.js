// src/component/Pages/AdminHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
   const token=sessionStorage.getItem("token")
    const nav=useNavigate()
    const logout=()=>{
      sessionStorage.clear()
      toast.success("Logout successfully")
      nav("/login")
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-2 border-black">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/admin">
          <img
            src="/assets/images/logo1.png"  // ensure this path exists in `public/assets/images/logo1.png`
            alt="Logo"
            width={40}
            height={40}
            className="me-2 rounded-circle"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="fs-4 fw-semibold">Feedback Portal</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="adminNavbar" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/feedback">
                Feedback History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/manage">
                Manage Users
              </Link>
             
            </li>
             <li className="nav-item">
                {token ? (
                  <span onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                    <i className="fa fa-sign-out-alt me-1" /> Logout
                  </span>
                ) : (
                  <Link to="/login" className="nav-link">
                    <i className="fa fa-user me-1" /> Login
                  </Link>
                )}
              </li>
           
            {/* You can conditionally show Login/Register if admin is not authenticated */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
