document.addEventListener("DOMContentLoaded", function () {
    // === Dummy User Data ===
    const users = [
        {
            username: "willowh",
            group: "harbor",
            homeDirectory: ["/cache/home/willowh"],
            permissions: "Moderator",
            addedBy: "",
            dateAdded: ""
        },
        {
            username: "evanh",
            group: "harbor",
            homeDirectory: ["/cache/home/harbor/Backup/Evan"],
            permissions: "InfiniDisc-Restricted User",
            addedBy: "",
            dateAdded: ""
        },
        {
            username: "charliez",
            group: "summit",
            homeDirectory: ["/cache/home/summit"],
            permissions: "InfiniDisc-Administrator",
            addedBy: "techops",
            dateAdded: "2025-01-05"
        },
        {
            username: "lucask",
            group: "testing",
            homeDirectory: ["/cache/home/testing", "/cache/home/summit"],
            permissions: "Administrator",
            addedBy: "techops",
            dateAdded: "2025-01-12"
        },
        {
            username: "naomib",
            group: "testing",
            homeDirectory: ["/cache/home/vortex/Naomi"],
            permissions: "InfiniDisc-User",
            addedBy: "techops",
            dateAdded: "2025-03-03"
        },
        {
            username: "acmelead",
            group: "acme",
            homeDirectory: ["/cache/home/acme/LeadDocs", "/cache/home/acme/Reports"],
            permissions: "Admin",
            addedBy: "willowh",
            dateAdded: "2025-01-07"
        }
    ];

    // === Render Users to Table ===
    function renderUsers() {
        const table = document.getElementById("users-list");
        table.innerHTML = ""; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.group}</td>
                <td>${user.homeDirectory}</td>
                <td>${user.permissions}</td>
                <td>${user.addedBy}</td>
                <td>${user.dateAdded}</td>
                <td>
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            addRowListeners(row);
            table.appendChild(row);
        });
    }

    // === Add Event Listeners to Edit/Delete Buttons ===
    function addRowListeners(row) {
        row.querySelector(".delete-btn").addEventListener("click", () => {
            row.remove();
        });

        row.querySelector(".edit-btn").addEventListener("click", () => {
            editUser(row);
        });
    }

    // === Inline Edit User ===
    function editUser(row) {
        const cells = row.querySelectorAll("td");
        const editButton = row.querySelector(".edit-btn");

        if (editButton.classList.contains("editing")) {
            // Save values
            editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editButton.classList.remove("editing");

            cells.forEach((cell, index) => {
                if (index < 6) {
                    const input = cell.querySelector("input");
                    if (input) cell.textContent = input.value;
                }
            });
        } else {
            // Enter edit mode
            editButton.innerHTML = '<i class="fa-solid fa-save"></i>';
            editButton.classList.add("editing");

            cells.forEach((cell, index) => {
                if (index < 6) {
                    const val = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${val}">`;
                }
            });
        }
    }

    // === Add New User Form Handling ===
    document.getElementById("add-user-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const group = document.getElementById("group").value.trim();
        const homeDirectory = document.getElementById("home-directory").value.trim();
        const permissions = document.getElementById("permissions").value.trim();
        const addedBy = document.getElementById("added-by").value.trim();
        const dateAdded = new Date().toISOString().split("T")[0];

        if (!username || !group || !homeDirectory || !permissions || !addedBy) {
            alert("All fields are required!");
            return;
        }

        const user = {
            username,
            group,
            homeDirectory: [homeDirectory],
            permissions,
            addedBy,
            dateAdded
        };

        users.push(user);
        renderUsers();
        document.getElementById("add-user-popup").style.display = "none";
        document.getElementById("add-user-form").reset();
    });

    // === Popup Handling ===
    document.getElementById("add-user-btn").addEventListener("click", () => {
        document.getElementById("add-user-popup").style.display = "block";
    });

    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("add-user-popup").style.display = "none";
    });

    // === Logout Handling ===
    document.querySelectorAll("#logout-button").forEach(button => {
        button.addEventListener("click", () => {
            localStorage.removeItem("authenticated");
            window.location.href = "login.html";
        });
    });

    // === Init ===
    renderUsers();
});
