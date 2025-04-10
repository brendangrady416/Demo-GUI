document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('policies-form');
    const lowWaterInput = document.getElementById('low-water');
    const highWaterInput = document.getElementById('high-water');
    const lowWaterValue = document.getElementById('low-water-value');
    const highWaterValue = document.getElementById('high-water-value');

    // Update % display when user changes range
    lowWaterInput.addEventListener('input', () => {
        lowWaterValue.textContent = lowWaterInput.value + "%";
    });

    highWaterInput.addEventListener('input', () => {
        highWaterValue.textContent = highWaterInput.value + "%";
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page refresh

        const settings = {
            migrationFrequency: document.getElementById('migration-frequency').value,
            lowWaterLevel: lowWaterInput.value,
            highWaterLevel: highWaterInput.value,
            notificationPreference: document.getElementById('notification-preference').value
        };

        console.log("User Settings Saved:", settings);
        alert("Your settings have been saved!");
    });
});