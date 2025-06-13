import React, { useEffect, useState } from "react";
import ApiServices from "../component/Services/ApiServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Pagination,{limit} from "../Utilities/Pagination";

export default function ManageUsers() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [exportingId, setExportingId] = useState(null);
  const[totalPages,setTotalPages]=useState(1);
 const[currentPage, setCurrentPage]=useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedback();
  }, [currentPage]);

  const fetchFeedback = () => {
    setLoading(true);
    let data = {
       limit: limit,
        currentPage: currentPage
     };
   
    ApiServices.allFeedback(data)
      .then((res) => {
        if (res.data.success === true) {
           const total = res.data.total;
           setTotalPages(Math.ceil(total / limit));
          setFeedback(res.data.data);
          console.log("Feedback Data:", res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  // ✅ Correct Export PDF Function
  // const exportPDF = async (userId) => {
  //   try {
  //     const res = await ApiServices.get(`/admin/export-feedback-pdf/${userId}`);
  //     if (res.data.success) {
  //       toast.success("PDF exported successfully!");
  //     } else {
  //       toast.error("PDF export failed.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Server error exporting PDF");
  //   }
  // };
// const exportPDF = async (userId) => {
//   setExportingId(userId);

//   try {
//     const res = await ApiServices.exportUserSpecificFeedbackPDF(userId);
//     console.log("API response:", res);  // 👀 Check what comes back

    
//       if (res?.data?.success) {
//   toast.success(res.data.message); // Shows: "PDF exported and emailed to ..."
// } else {
//   toast.error(res.data.message);
// }
//   } catch (err) {
//     console.error("Export PDF Error:", err);
//     toast.error(err.message);
//   } finally {
//     setExportingId(null);
//   }
// };
const exportPDF = async (userId) => {
  setExportingId(userId);

  try {
    const res = await ApiServices.exportUserSpecificFeedbackPDF(userId);
    console.log("API response:", res);

    if (res?.data?.success) {
      toast.success(
        <>
          PDF emailed!{" "}
          <a
            href={res.data.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            View PDF
          </a>
        </>
      );
    } else {
      toast.error("Failed to export or email PDF.");
    }
  } catch (err) {
    console.error("Export PDF Error:", err);
    toast.error("Server error while exporting PDF.");
  } finally {
    setExportingId(null);
  }
};


  return (
    <div className="wrapper p-4">
      <h2 className="text-center mb-4 text-xl font-bold">Manage Users Feedback</h2>
      <div className="container mt-5">
        <table className="table table-striped w-full text-sm text-left border">
          <thead className="table-dark bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">S.no</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {feedback.length > 0 ? (
              feedback.map((fb, index) => (
                <tr key={index} className="bg-white border hover:bg-gray-100">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{fb.user?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{fb.user?.email || "N/A"}</td>
                  <td className="px-4 py-2 border">{fb.message || fb.feedback || "N/A"}</td>
                  <td style={{ textAlign: "center", padding: "12px" }}>
                    <Link
                      to={`/admin/reply/${fb._id}`}
                      style={{
                        marginRight: "10px",
                        background: "#3498db",
                        color: "white",
                        padding: "8px 14px",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        transition: "0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.background = "#217dbb")}
                      onMouseOut={(e) => (e.target.style.background = "#3498db")}
                    >
                      Update
                    </Link>
                  </td>
                  <td>
                  <button
  className="btn btn-sm btn-success flex items-center gap-2"
  onClick={() => exportPDF(fb.user?._id)}
  disabled={exportingId === fb.user?._id}
>
  {exportingId === fb.user?._id ? (
    <>
      
      Sending...
    </>
  ) : (
    "Export Feedback PDF"
  )}
</button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No feedback found.
                </td>
              </tr>
            )}
          </tbody>
          <tr>
              <td colSpan={9} style={{ textAlign: "center", padding: "20px" }}>
                 <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                   </td>
          </tr>
        </table>
      </div>
    </div>
  );
}
