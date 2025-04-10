document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownList = document.getElementById("dropdownList");
    const options = dropdownList.querySelectorAll("li");

    // Toggle dropdown visibility
    dropdownButton.addEventListener("click", () => {
        dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdownButton.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.style.display = "none";
        }
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener("click", () => {
            dropdownButton.textContent = option.textContent;

            // Remove "active" class from all, then add to the selected option
            options.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");

            // Hide dropdown after selection
            dropdownList.style.display = "none";
        });
    });
});
