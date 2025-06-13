import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/";

class ApiServices {
  login(data) {
    return axios.post(BASE_URL + "login", data);
  }

  register(data) {
    return axios.post(BASE_URL + "register", data);
  }

addFeedback(data) {
  return axios.post(BASE_URL + "addFeedback", data, { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },});
}
sendFeedbackReport(userId) {
  return axios.post(BASE_URL + "send-feedback-report", { userId });
}
  
getSinglecustomer(data) {
  return axios.post(BASE_URL + "getSinglecustomer", data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
}
allFeedback() {
  return axios.post(BASE_URL + "allFeedback", {}, {headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
}
getFeedbackStats() {
  return axios.post(BASE_URL + "feedback/stats", {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
}
allcustomer(){
  return axios.post(BASE_URL + "allcustomer", {headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },});
}
changeStatusFeedback(data){
  return axios.post(BASE_URL+"changeStatusFeedback",data)
}
getSingleFeedback(id){
  return axios.get(BASE_URL + `getSingleFeedback/${id}`);
}
// exportUserSpecificFeedbackPDF(userId) {
//   return axios.get(BASE_URL+`export-feedback-pdf/${userId}`, {
//     responseType: 'blob',
//   });
// }
exportUserSpecificFeedbackPDF(userId) {
  return axios.get(BASE_URL + `export-feedback-pdf/${userId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  });
}

  }




export default new ApiServices();
