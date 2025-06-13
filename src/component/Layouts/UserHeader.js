// src/component/Pages/UserHeader.jsx
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserHeader() {
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
        <Link className="navbar-brand d-flex align-items-center" to="/user">
          <img
            src="/assets/images/logo1.png"  // ensure you have `public/assets/images/logo1.png`
            alt="Logo"
            width={40}
            height={40}
            className="me-2 rounded-circle"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="fs-4 fw-semibold">Feedback&nbsp;Portal</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="userNavbar" className="collapse navbar-collapse">
         <ul className="navbar-nav ms-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/user/feedback">
      Submit Feedback
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
</ul>

        </div>
      </div>
    </nav>
  );
}
