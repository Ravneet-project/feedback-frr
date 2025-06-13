import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ApiServices from "../component/Services/ApiServices";

export default function FeedbackForm() {
const[data,setData]=useState("");
const[category,setCategory]=useState("");
const[priority,setPriority]=useState("");
const[message,setMessage]=useState("");
const[customerid, setCustomerId]=useState("");

  const nav = useNavigate();

  useEffect(()=>{
    fetchSingleCustomer();
  },[]);
   const fetchSingleCustomer = () => {
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    toast.error("User not logged in.");
    return;
  }

  const data = { userId };
  ApiServices.getSinglecustomer(data)
    .then((res) => {
      console.log("Customer response:", res.data);
      if (res.data.success && res.data.data) {
        setCustomerId(res.data.data._id);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Customer not found.");
      }
    })
    .catch((err) => {
      toast.error(err.message || "Error fetching customer.");
    });
};


  function handleForm(e) {
    e.preventDefault();
    const data={
      category:category,
      message:message,
      priority:priority,
     user: customerid
    };

    ApiServices.addFeedback(data)
  .then((res) => {
    if (res.data.message) {
      toast.success("Feedback Added Successfully");
      setCategory("");
      setPriority("");
      setMessage("");
      nav("/user");
    } else {
      toast.error(res.data.message);
    }
  })

  .catch((err) => {
    toast.error(err.message);
  });   
} 
  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center">
      <div className="login-card portal-card shadow p-4">
        <h2 className="text-center mb-4 text-white">Welcome to Your Dashboard</h2>
        <h5 className="mb-3 text-white">Submit Feedback</h5>

        <form id="feedbackForm" onSubmit={handleForm}>
          {/* Category */}
          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <select
              className="form-select"
              name="category"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Product">Product</option>
              <option value="Service">Service</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="form-label text-white">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={priority}
              onChange={(e)=> setPriority(e.target.value)}
              required
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label text-white">Feedback</label>
            <textarea
              className="form-control"
              name="message"
              rows={4}
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success w-100">
            Submit Feedback
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </main>
  );
}
