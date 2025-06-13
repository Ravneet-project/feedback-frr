import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Header() {
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
        <Link className="navbar-brand d-flex align-items-center" to="#">
          <img
            src="/assets/images/logo1" // be sure logo is in public/assets/images
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
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <div className="d-flex justify-content-end">
            
              {
                !!token?
              <>
              
             
              <a href="#" onClick={logout} className="btn login mr-2">
              <span className="fa fa-user" /> Logout
              </a>
              </>
              :
              <>
              <Link to="/login" className="btn login mr-2">
                <span className="fa fa-user" /> login
              </Link>
              <Link to={"/register"} className="small btn btn-primary px-4 py-2 rounded-0 ml-3">
                  <span className="icon-users" /> Register
                </Link>
              </>
}

               
              </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}