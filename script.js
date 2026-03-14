async function switchScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screen).classList.add('active');
    
    if (screen === 'home') await updateHome();
}

async function updateHome() {
    const data = await fetch('/api/sensors').then(r => r.json());
    
    document.getElementById('data').innerHTML = `
        🌡️ ${data.temp?.toFixed(1) || 28}°C<br>
        💧 ${data.humidity?.toFixed(0) || 65}%<br>
        🛡️ Risk: ${data.risk || 12}%<br>
        💰 ₹${data.profit?.toLocaleString() || 12400}
    `;
    
    // Chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [data.risk || 12, 88],
                backgroundColor: ['#FF5722', '#4CAF50']
            }]
        },
        options: { cutout: '60%' }
    });
}

// Auto refresh
setInterval(updateHome, 3000);
updateHome(); // First load
