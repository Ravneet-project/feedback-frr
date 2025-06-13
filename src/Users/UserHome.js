// src/Users/UserHome.jsx
import { Link } from "react-router-dom";

export default function UserHome() {
  return (
    <main
      className="d-flex align-items-center justify-content-center text-center"
      style={{ height: "85vh" }}
    >
      <div>
        <h1 className="mb-3">
          Welcome to <strong>DCInfoTech Feedback Portal</strong>
        </h1>
        <p className="lead mb-4">
          Submit and manage your feedback with ease and efficiency.
        </p>
        <Link to="/user/feedback" className="btn btn-primary me-2">
          Submit Feedback
        </Link>
       
      </div>
    </main>
  );
}
