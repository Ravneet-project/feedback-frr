// src/component/Layouts/Master.jsx
import { Outlet, Link } from "react-router-dom";

export default function Master() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* header */}
      <header className="bg-dark text-white py-2">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="text-white text-decoration-none">
            <h4>DCInfoTech ‐ Feedback Portal</h4>
          </Link>
          <div>
            <Link to="/login" className="text-white me-3">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* rendered “public” content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        © 2025 DCInfoTech Pvt Ltd
      </footer>
    </div>
  );
}
