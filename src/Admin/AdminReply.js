import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiServices from "../component/Services/ApiServices";
import { toast } from "react-toastify";
import * as qs from "qs";

export default function AdminReply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState("open");
  const [reply, setReply] = useState("");
  
  useEffect(() => {
    fetchSingleFeedback();
  }, []);

  const fetchSingleFeedback = () => {
    ApiServices.getSingleFeedback(id)
      .then((res) => {
        if (res.data.success) {
          setFeedback(res.data.data);
          setStatus(res.data.data.status || "open");
            setReply(res.data.data.reply || "");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { _id: id, status, reply };

    ApiServices.changeStatusFeedback(qs.stringify(data))
      .then((res) => {
        if (res.data.success) {
          toast.success("Feedback updated successfully!");
          navigate("/admin/manage");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div
        className="card p-4 shadow-lg text-white"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "550px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        <div
          className="card-header text-white text-center mb-4 rounded"
          style={{
            backgroundColor: "#2a2a2a",
            boxShadow: "0 0 10px rgba(255,255,255,0.05)",
            borderRadius: "12px"
          }}
        >
          <h4 className="fw-bold mb-0">💬 Reply to Feedback</h4>
        </div>

        {feedback ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-light fw-semibold"> User Name:</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={feedback.user?.name || "N/A"}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light fw-semibold"> Feedback:</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={feedback.message || "N/A"}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light fw-semibold"> Status:</label>
              <select
                className="form-select bg-dark text-white border-secondary"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-light fw-semibold"> Admin Reply:</label>
              
              <textarea
                className="form-control bg-dark text-white border-secondary"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows="4"
                placeholder="Write your reply here..."
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: "#1f1f1f",
                  color: "#fff",
                  border: "1px solid #444",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.05)",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#2c2c2c";
                  e.target.style.boxShadow = "0 0 12px rgba(255, 255, 255, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#1f1f1f";
                  e.target.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.05)";
                }}
              >
                 Update Feedback
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-muted">Loading feedback...</p>
        )}
      </div>
    </div>
  );
}
