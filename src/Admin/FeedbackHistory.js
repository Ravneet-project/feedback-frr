import { useEffect, useRef, useState } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ApiServices from "../component/Services/ApiServices";

Chart.register(
  PieController,
  BarController,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export default function FeedbackHistory() {
  const categoryRef = useRef(null);
  const priorityRef = useRef(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFeedbacks: 0,
    priorities: { High: 0, Medium: 0, Low: 0 },
  });

  useEffect(() => {
    ApiServices.getFeedbackStats()
      .then((res) => {
        setStats(res.data);
        renderPieChart(res.data.priorities);
        renderBarChart(res.data.priorities);
      })
      .catch((err) => {
        console.error("Failed to fetch stats", err);
      });
  }, []);

  const renderPieChart = (priorityData) => {
    if (!categoryRef.current) return;
    new Chart(categoryRef.current, {
      type: "pie",
      data: {
        labels: ["High", "Medium", "Low"],
        datasets: [
          {
            data: [
              priorityData.High,
              priorityData.Medium,
              priorityData.Low,
            ],
            backgroundColor: [
              "rgba(220,53,69,0.8)",
              "rgba(255,193,7,0.8)",
              "rgba(25,135,84,0.8)",
            ],
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "white",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  };

  const renderBarChart = (priorityData) => {
    if (!priorityRef.current) return;
    new Chart(priorityRef.current, {
      type: "bar",
      data: {
        labels: ["High", "Medium", "Low"],
        datasets: [
          {
            label: "Count",
            data: [
              priorityData.High,
              priorityData.Medium,
              priorityData.Low,
            ],
            backgroundColor: [
              "rgba(220,53,69,0.8)",
              "rgba(255,193,7,0.8)",
              "rgba(25,135,84,0.8)",
            ],
            borderRadius: 10,
            barThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "white",
              font: {
                size: 13,
                weight: "bold",
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
              font: {
                size: 13,
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
      },
    });
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center mb-4">📊 Admin Analytics Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="p-4 shadow-lg rounded card-custom-glow text-center">
            <i className="bi bi-people-fill fs-2 text-info mb-2"></i>
            <h5>Total Users</h5>
            <h3 className="fw-bold">{stats.totalUsers}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="p-4 shadow-lg rounded card-custom-glow text-center">
            <i className="bi bi-chat-dots-fill fs-2 text-warning mb-2"></i>
            <h5>Total Feedbacks</h5>
            <h3 className="fw-bold">{stats.totalFeedbacks}</h3>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="p-4 shadow-lg rounded chart-card">
            <h5 className="text-center mb-3">📈 Feedback Priority (Pie)</h5>
            <canvas ref={categoryRef} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="p-4 shadow-lg rounded chart-card">
            <h5 className="text-center mb-3">📊 Feedback Priority (Bar)</h5>
            <canvas ref={priorityRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
