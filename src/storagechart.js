import Chart from 'chart.js/auto';

const storageCtx = document.getElementById('storageChart').getContext('2d');
new Chart(storageCtx, {
    type: 'doughnut',
    data: {
        labels: ["Cache", "LTO", "AWS Cloud", "OSS Cloud"],
        datasets: [{
            data: [674, 1128,278,1928],
            backgroundColor: ["#2F3E9E"," #3AA5E6", "#F4A024","#2EAA67"],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: { enabled: true }
        }
    }
});