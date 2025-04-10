import Chart from 'chart.js/auto';

const resourceCtx = document.getElementById('resourceChart').getContext('2d');
new Chart(resourceCtx, {
    type: 'bar',
    data: {
        labels: ["Cloud API", "Transcoders", "Tape Drives", "Servers"],
        datasets: [
            {
                label: "Peak",
                data: [78, 18, 42, 90], 
                backgroundColor: "#142F86"
            },
            {
                label: "Average",
                data: [41, 5, 20, 70], 
                backgroundColor: "#3AA5E6"
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: { beginAtZero: true, max: 100 }
        },
        plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true }
        }
    }
});