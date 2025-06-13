// src/Admin/AdminHome.jsx
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <h2 className="text-center mb-5 text-white">
          Welcome to the <span className="text-info">Admin Dashboard</span>
        </h2>
        <div className="row g-4 justify-content-center">
          {/* Card 1: Link to Feedback History */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow portal-card border-0 animate-fade-in">
              <div className="card-body text-center">
                <i className="bi bi-chat-left-text fs-1 text-primary mb-3" />
                <h5 className="card-title">User Feedback History</h5>
                <p className="card-text">
                  View and manage feedback submitted by users.
                </p>
                <Link to="/admin/feedback" className="btn btn-primary w-100">
                  View Feedback
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Link to Manage Users */}
          <div className="col-md-6 col-lg-5">
            <div className="card shadow portal-card border-0 animate-fade-in">
              <div className="card-body text-center">
                <i className="bi bi-people fs-1 text-secondary mb-3" />
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">View registered users and manage access.</p>
                <Link to="/admin/manage" className="btn btn-secondary w-100">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
