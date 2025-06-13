// src/Auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiServices from "../component/Services/ApiServices";

export default function Register() {
  const navigate = useNavigate();

 const[data, setData]=useState("");
 const[name, setName]=useState("");
 const[email,setEmail]=useState("");
 const[password, setPassword]=useState("");
 const nav=useNavigate()
  
function handleForm(e) {
  e.preventDefault();

  const data = {
    name: name,
    email: email,
    password: password,
  };

  ApiServices.register(data)
    .then((res) => {
      if (res.data.success) {
        toast.success("User registered successfully!", {
       
        });
         nav("/login");

        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(res.data.message); // backend message: "User already exists with the same email"
      }
    })
    .catch((err) => {
      toast.error(err.message);
    });
}


  return (
    <>
      {/* MAIN REGISTER SECTION */}
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="register-card text-center shadow p-4">
          <img
            src="/assets/images/cutegif.gif"
            alt="Cartoon"
            className="register-img mb-3"
            onError={(e) => (e.target.style.display = "none")}
          />
          <h3 className="mb-4 fw-bold text-white">Create Your Account</h3>

          <form onSubmit={handleForm}>
            {/* Name */}
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label fw-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 text-start">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </main>

      {/* ToastContainer with top‐right position */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
