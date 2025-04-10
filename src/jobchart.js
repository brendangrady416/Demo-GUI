
import Chart from 'chart.js/auto';

const ctx = document.getElementById('jobops').getContext('2d');

let jobOperationsChart;  // Store chart instance

let chartData = {
    labels: ["1AM", "2AM", "3AM", "4AM", "5AM", "6AM"],
    datasets: [
        { label: "Archive", borderColor: "navy", data: [6, 2, 5, 4, 3, 2], fill: false, tension: 0.3 },
        { label: "Restore", borderColor: "green", data: [3, 4, 2, 5, 6, 3], fill: false, tension: 0.3 },
        { label: "Copy", borderColor: "blue", data: [4, 3, 5, 2, 6, 4], fill: false, tension: 0.3 },
        { label: "Delete", borderColor: "red", data: [2, 3, 4, 3, 5, 4], fill: false, tension: 0.3 },
        { label: "Transcode", borderColor: "orange", data: [5, 4, 6, 3, 2, 5], fill: false, tension: 0.3 }
    ]
};

// Function to initialize or update the chart
function createChart() {
    if (jobOperationsChart) {
        jobOperationsChart.destroy();  // Prevent duplicate charts
    }
    
    jobOperationsChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } },
            scales: { y: { beginAtZero: true, max: 7 } }
        }
    });
}

// Function to update chart data
function updateData(datasetIndex, newData) {
    if (jobOperationsChart) {
        jobOperationsChart.data.datasets[datasetIndex].data = newData;
        jobOperationsChart.update();
    }
}

// Initialize chart
createChart();

// Example update after 5 seconds
// setTimeout(() => {
//     updateData(0, [5, 3, 6, 2, 4, 5]); // Updating "Archive" dataset
// }, 5000);