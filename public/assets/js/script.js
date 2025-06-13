
document.addEventListener('DOMContentLoaded', () => {
  console.log("Website Loaded Successfully!");
});
function handleLogin() {
      const role = document.getElementById("role").value;
      if (role === "admin") {
        window.location.href = "admin-home.html";
      } else if (role === "user") {
        window.location.href = "user-home.html";
      } else {
        alert("Please select a role.");
      }
    }
    
    new Chart(document.getElementById('categoryChart'), {
      type: 'pie',
      data: {
        labels: ['Bug', 'Feature', 'UI'],
        datasets: [{
          label: 'Feedback Categories',
          data: [10, 5, 3],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: 'white' }
          }
        }
      }
    });

    new Chart(document.getElementById('priorityChart'), {
      type: 'bar',
      data: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
          label: 'Priority Count',
          data: [8, 4, 6],
          backgroundColor: ['#dc3545', '#ffc107', '#198754']
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { ticks: { color: 'white' } },
          y: { ticks: { color: 'white' } }
        },
        plugins: {
          legend: {
            labels: { color: 'white' }
          }
        }
      }
    });
 

    document.getElementById("feedbackForm").addEventListener("submit", function(event) {
      event.preventDefault();
      // Optional: add validation or save logic
      window.location.href = "index.html";
    });

  function fillExportForm(email) {
    document.getElementById('emailInput').value = email;
  }

  document.getElementById('exportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    alert(`Email with password-protected PDF would be sent to ${email} with password: ${password}`);
    const modal = bootstrap.Modal.getInstance(document.getElementById('exportModal'));
    modal.hide();
  });
