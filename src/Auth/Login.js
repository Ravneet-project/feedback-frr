import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ApiServices from "../component/Services/ApiServices";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load] = useState(false);
  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    ApiServices.login(loginData)
      .then((res) => {
        if (res.data.success) {
          if (res.data.data.status === true) {
            toast.success(res.data.message);

            const users = res?.data?.data?.userType;

            // ✅ Save all required session data
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userType", res.data.data.userType);
            sessionStorage.setItem("name", res.data.data.name);
            sessionStorage.setItem("email", res.data.data.email);
            sessionStorage.setItem("userId", res.data.data._id);

            // ✅ FIX: Save userId in localStorage as well
            localStorage.setItem("userId", res.data.data._id);

            console.log("Logged in as userType:", users);

            if (users === 1) {
              nav("/admin");
            } else if (users === 2) {
              nav("/user");
            }

          } else {
            toast.error("Account Blocked!! Contact Admin!");
          }

        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <main
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: "url('/assets/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="login-card text-center p-4 bg-dark rounded-3 shadow">
        <img
          src="/assets/cutegif.gif"
          alt="Login Avatar"
          className="login-img mb-3 rounded-circle"
          width={120}
          height={120}
          onError={(e) => (e.target.style.display = "none")}
        />

        <h3 className="mb-4 fw-bold text-white">Welcome Back</h3>

        <form onSubmit={handleForm}>
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-white">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label fw-semibold text-white">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
