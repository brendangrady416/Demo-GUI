document.addEventListener("DOMContentLoaded", function () {

    // Open Add Key Popup
    document.getElementById("add-key-btn").addEventListener("click", function () {
        document.getElementById("add-key-popup").style.display = "block";
    });

    // Close Add Key Popup
    document.getElementById("close-popup").addEventListener("click", function () {
        document.getElementById("add-key-popup").style.display = "none";
    });

    // Add Key Functionality
    document.getElementById("add-key-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Generate random key format
        function generateKey() {
            return (
                Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                Math.random().toString(36).substring(2, 6).toUpperCase()
            );
        }

        // Get form values
        let owner = document.getElementById("owner").value.trim();
        let permissions = document.getElementById("permissions").value;
        let expiration = document.getElementById("expiration").value;
        let createdDate = new Date().toISOString().split("T")[0];

        if (!owner || !expiration) {
            alert("All fields are required!");
            return;
        }

        let newKey = generateKey();

        // Add new key row
        let table = document.getElementById("keys-list");
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${newKey}</td>
            <td>${owner}</td>
            <td>${permissions}</td>
            <td>${createdDate}</td>
            <td>${expiration}</td>
            <td>
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;

        table.appendChild(row);
        document.getElementById("add-key-popup").style.display = "none";
        document.getElementById("add-key-form").reset();
    });

    // Attach delete event
    row.querySelector(".delete-btn").addEventListener("click", function () {
        row.remove();
    });

    // Attach edit event
    function editUser(row) {
        let cells = row.querySelectorAll("td");
        let editButton = row.querySelector(".edit-btn");

        if (editButton.classList.contains("editing")) {
            // Save new values and exit edit mode
            editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editButton.classList.remove("editing");

            cells.forEach((cell, index) => {
                if (index < 6) {
                    let input = cell.querySelector("input");
                    if (input) cell.innerHTML = input.value;
                }
            });
        } else {
            // Enter edit mode
            editButton.innerHTML = '<i class="fa-solid fa-save"></i>';
            editButton.classList.add("editing");

            cells.forEach((cell, index) => {
                if (index < 6) {
                    let value = cell.innerText;
                    cell.innerHTML = `<input type="text" value="${value}">`;
                }
            });
        }
    }

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            editUser(this.closest("tr"));
        });
    });
    
});
