

// export default new ApiServices();
import axios from "axios";

// Local backend base URL
export const BASE_URL = "https://feedback-bk-qiaw.vercel.app/api/";


// Utility class for API requests
class ApiServices {
  // Returns auth token in headers
  getToken() {
    const token = sessionStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  }

  // Determines path based on userType: 1 (admin), 2 (user)
  getPath() {
    const userType = sessionStorage.getItem("userType");
    const USER_URL = userType == 1 ? "admin/" : "user/";
    return BASE_URL + USER_URL;
  }

  // Auth
  login(data) {
    return axios.post(BASE_URL + "user/login", data);
  }

  register(data) {
  return axios.post(BASE_URL + "user/register", data, {
    headers: sessionStorage.getItem("token") ? this.getToken() : {}
  });
}


  // Feedback - User
 addFeedback(data) {
  return axios.post(BASE_URL + "user/addFeedback", data, {
    headers: this.getToken(),
  });
}

  // Admin - get all feedback
  allFeedback() {
    return axios.post(BASE_URL + "admin/allFeedback", {}, {
      headers: this.getToken(),
    });
  }

  // Admin - get feedback stats
  getFeedbackStats() {
    return axios.post(BASE_URL + "admin/feedback/stats", {}, {
      headers: this.getToken(),
    });
  }

  // Admin - change feedback status
  changeStatusFeedback(data) {
    return axios.post(BASE_URL + "admin/changeStatusFeedback", data, {
      headers: this.getToken(),
    });
  }

  // Admin - get single feedback (by ID)
  getSingleFeedback(id) {
    return axios.get(BASE_URL + `admin/getSingleFeedback/${id}`, {
      headers: this.getToken(),
    });
  }

  // Admin - get all customers
  allcustomer() {
    return axios.post(BASE_URL + "admin/allcustomer", {}, {
      headers: this.getToken(),
    });
  }

  // Admin - get single customer
  getSinglecustomer(data) {
    return axios.post(BASE_URL + "admin/getSinglecustomer", data, {
      headers: this.getToken(),
    });
  }

  // Export PDF (available for both user & admin)
  exportUserSpecificFeedbackPDF(userId) {
    return axios.get(BASE_URL + `admin/export-feedback-pdf/${userId}`, {
      headers: this.getToken(),
      responseType: 'blob', // So it handles the PDF as a file
    });
  }

  // Send feedback report to user
  sendFeedbackReport(userId) {
    return axios.post(BASE_URL + "admin/send-feedback-report", { userId }, {
      headers: this.getToken(),
    });
  }
}

export default new ApiServices();
