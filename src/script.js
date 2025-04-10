document.addEventListener("DOMContentLoaded", function () {
    // Systems Status Data
    const systemsData = [
        { name: "HQ-Storage1", type: "Storage Node", location: "Site HQ", ip: "192.168.1.10", status: "Up" },
        { name: "HQ-Storage2", type: "Storage Node", location: "Site HQ", ip: "192.168.1.11", status: "Up" },
        { name: "Tape-Library1", type: "Tape Library", location: "Site HQ", ip: "192.168.1.12", status: "Up" },
        { name: "Remote-Backup1", type: "Cloud Gateway", location: "NY Office", ip: "10.0.1.10", status: "Maintenance" },
        { name: "Remote-Backup2", type: "Cloud Gateway", location: "LA Office", ip: "10.0.1.11", status: "Maintenance" },
        { name: "HQ-Database", type: "Database Server", location: "Database Room", ip: "192.168.1.20", status: "Up" },
        { name: "HQ-WebServer", type: "Web Server", location: "Room 05", ip: "192.168.1.30", status: "Down" },
        { name: "Remote-Archive1", type: "Cloud Storage", location: "AWS", ip: "172.16.1.01", status: "Up" },
        { name: "HQ-MediaServer", type: "Media Server", location: "Media Room", ip: "192.168.1.40", status: "Unknown" }
    ];

    // Requests Status Data
    const requestsData = [
        { id: "90878", task: "Backup", status: "Completed", "%": "100%", priority: "High", start: "2025-06-01", end: "2025-06-01", asset: "HQ-Storage1", ip: "192.168.1.10", owner: "John Doe" },
        { id: "90879", task: "Restore", status: "In Progress", "%": "75%", priority: "Medium", start: "2025-06-02", end: "2025-06-02", asset: "HQ-Storage2", ip: "192.168.1.11", owner: "Jane Smith" },
        { id: "90880", task: "Archive", status: "Pending", "%": "0%", priority: "Low", start: "2025-06-03", end: "2025-06-03", asset: "Tape-Library1", ip: "192.168.1.12", owner: "Alice Johnson" },
        { id: "90881", task: "Backup", status: "Completed", "%": "100%", priority: "High", start: "2025-06-04", end: "2025-06-04", asset: "Remote-Backup1", ip: "10.0.1.10", owner: "Bob Brown" },
        { id: "90882", task: "Restore", status: "Failed", "%": "50%", priority: "High", start: "2025-06-05", end: "2025-06-05", asset: "Remote-Backup2", ip: "10.0.1.11", owner: "Charlie Davis" },
        { id: "90883", task: "Archive", status: "Completed", "%": "100%", priority: "Medium", start: "2025-06-06", end: "2025-06-06", asset: "HQ-Database", ip: "192.168.1.20", owner: "Diana Evans" },
        { id: "90884", task: "Backup", status: "In Progress", "%": "60%", priority: "Low", start: "2025-06-07", end: "2025-06-07", asset: "HQ-WebServer", ip: "192.168.1.30", owner: "Evan Foster" },
        { id: "90885", task: "Restore", status: "Pending", "%": "0%", priority: "Medium", start: "2025-06-08", end: "2025-06-08", asset: "Remote-Archive1", ip: "172.16.1.01", owner: "Fiona Green" },
    ];

    function getPercentColorClass(percent, status) {
        const value = parseInt(percent);
        if (status.toLowerCase() === "failed") return "percent-failed";
        if (value === 100) return "percent-complete";
        if (value > 0) return "percent-progress";
        return "";
    }  

    // Populate Table Function
    function populateTable(id, data, columns) {
        const tableBody = document.getElementById(id);
        tableBody.innerHTML = "";
    
        // Separate active and completed rows
        const active = data.filter(d => d["%"] !== "100%");
        const completed = data.filter(d => d["%"] === "100%");
        const combined = [...active, ...completed];
        combined.forEach(item => {
            let row = document.createElement("tr");
            // Make active rows draggable
            if (item["%"] !== "100%") {
                row.setAttribute("draggable", true);
                row.classList.add("draggable-row");
            }
            columns.forEach(column => {
                const cell = document.createElement("td");
                // Safely get value
                const value = item[column] || "";
                // Apply text
                cell.textContent = value;
                // Apply coloring only to the "%" column
                if (column === "%") {
                    const className = getPercentColorClass(value, item.status || "");
                    if (className) {
                        cell.classList.add(className);
                    }
                }
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
        enableRowDrag(id); // call drag logic
    }    

    function enableRowDrag(tableId) {
        const table = document.getElementById(tableId);
        let draggingRow = null;  
        table.querySelectorAll(".draggable-row").forEach(row => {
            row.addEventListener("dragstart", (e) => {
                draggingRow = row;
                row.style.opacity = "0.5";
            });
            row.addEventListener("dragover", (e) => {
                e.preventDefault();
            });   
            row.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggingRow !== row) {
                    const rows = Array.from(table.querySelectorAll(".draggable-row"));
                    const draggingIndex = rows.indexOf(draggingRow);
                    const dropIndex = rows.indexOf(row);
    
                    if (draggingIndex < dropIndex) {
                        row.after(draggingRow);
                    } else {
                        row.before(draggingRow);
                    }
                }
            });
            row.addEventListener("dragend", () => {
                draggingRow.style.opacity = "1";
                draggingRow = null;
            });
        });
    }    

    // Status Mapping for UI Colors
    function getStatusClass(status) {
        switch (status.toLowerCase()) {
            case "up": return "status-up";
            case "down": return "status-down";
            case "maintenance": return "status-maintenance";
            case "unknown": return "status-maintenance";
            case "Completed": return "status-up";
            default: return "";
        }
    }

    function populateSystemStatus() {
        const tableBody = document.getElementById("systems-status-data");
        tableBody.innerHTML = "";
        systemsData.forEach(item => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.location}</td>
                <td>${item.ip}</td>
                <td class="${getStatusClass(item.status)}">${item.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Populate Data Tables
    populateSystemStatus();
    populateTable("requests-status-data", requestsData, ["id", "task", "status", "%", "priority", "start", "end", "asset", "ip", "owner"]);

    // Generate Chart Placeholders (Replace with real charts if using Chart.js)
    function createChartPlaceholder(id, text) {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `<div class="graph-placeholder">${text}</div>`;
        }
    }

    createChartPlaceholder("job-operations-chart", "Job Operations Chart");
    createChartPlaceholder("storage-distribution-chart", "Storage Distribution Chart");
    createChartPlaceholder("resource-utilization-chart", "Resource Utilization Chart");
});

// Systems Pop Up Modal
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("system-modal");
    const modalContent = modal.querySelector(".modal-content");
    const closeBtn = modal.querySelector(".close-btn");

    // System Lifecycle Data
    const systemDetails = {
        "HQ-Storage1": { location: "Site HQ", ip: "192.168.1.10", purchase: "2022-06-15", warranty: "2027-06-15", os: "Linux 5.10", firmware: "v3.2.1", eol: "Active" },
        "HQ-Storage2": { location: "Site HQ", ip: "192.168.1.11", purchase: "2023-01-10", warranty: "2028-01-10", os: "Linux 5.12", firmware: "v3.4.0", eol: "Active" },
        "Tape-Library1": { location: "Site HQ", ip: "192.168.1.12", purchase: "2021-03-22", warranty: "2026-03-22", os: "N/A", firmware: "v2.9.1", eol: "Expiring Soon" },
        "Remote-Backup1": { location: "NY Office", ip: "10.0.1.10", purchase: "2020-11-05", warranty: "2025-11-05", os: "Windows Server 2019", firmware: "v2.7.5", eol: "Expiring Soon" },
        "Remote-Backup2": {location: "LA Office", ip: "10.0.1.11", purchase: "2019-08-30", warranty: "2024-08-30", os: "Windows Server 2016", firmware: "v2.5.0", eol: "Expired" },
        "HQ-Database": {location: "Database Room", ip: "192.168.1.20", purchase: "2024-02-14", warranty: "2029-02-14", os: "Windows Server 2022", firmware: "v3.0.0", eol: "Active" },
        "HQ-WebServer": {location: "Room 05", ip: "192.168.1.30", purchase: "2023-09-18", warranty: "2028-09-18", os: "Ubuntu 22.04", firmware: "v3.1.0", eol: "Active" },
        "Remote-Archive1": {location: "AWS", ip: "172.16.1.01", purchase: "2020-05-30", warranty: "2025-05-30", os: "N/A", firmware: "v2.8.0", eol: "Expiring Soon" },
        "HQ-MediaServer": {location: "Media Room", ip: "192.168.1.40", purchase: "2022-12-01", warranty: "2027-12-01", os: "Windows Server 2022", firmware: "v3.0.0", eol: "Active" }
    };

    // Ensure modal starts hidden
    modal.style.display = "none";

    // Add event listeners to table rows
    document.querySelectorAll("#systems-status-data tr").forEach(row => {
        row.addEventListener("click", () => {
            let systemName = row.cells[0].textContent.trim(); // Get system name from first column

            if (systemDetails[systemName]) {
                let details = systemDetails[systemName];

                // Populate modal content
                document.getElementById("modal-title").textContent = systemName;
                document.getElementById("modal-location").textContent = details.location;
                document.getElementById("modal-ip").textContent = details.ip;
                document.getElementById("modal-purchase").textContent = details.purchase;
                document.getElementById("modal-warranty").textContent = details.warranty;
                document.getElementById("modal-os").textContent = details.os;
                document.getElementById("modal-firmware").textContent = details.firmware;
                document.getElementById("modal-eol").textContent = details.eol;

                // Show modal
                modal.style.display = "flex";
                modalContent.style.position = "absolute";
                modalContent.style.top = "50%";
                modalContent.style.left = "50%";
                modalContent.style.transform = "translate(-50%, -50%)";
            }
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of the content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const detailsButton = document.getElementById("details-button");
    const detailsPanel = document.getElementById("details-panel");
    const closeDetails = document.getElementById("close-details");

    // Show the details panel when clicking the button
    detailsButton.addEventListener("click", function () {
        detailsPanel.style.display = "flex";
    });

    // Close the panel when clicking the close button
    closeDetails.addEventListener("click", function () {
        detailsPanel.style.display = "none";
    });

    // Close the panel when clicking outside of it
    detailsPanel.addEventListener("click", function (event) {
        if (event.target === detailsPanel) {
            detailsPanel.style.display = "none";
        }
    });
});

// Login Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Hardcoded Whitelist Users
    const users = {
        "techops": "password",
        "sales": "ownyourproblem2025",
        "charleswells": "password"
    };

    // Handle Login Form Submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (users[username] && users[username] === password) {
                localStorage.setItem("authenticated", "true");
                window.location.href = "index.html";
            } else {
                document.getElementById("error-message").textContent = "Invalid credentials!";
            }
        });
    }

    // Redirect Unauthenticated Users
    if (!localStorage.getItem("authenticated") && window.location.pathname.includes("index.html")) {
        window.location.href = "login.html";
    }

    // Logout Functionality
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("authenticated");
            window.location.href = "login.html";
        });
    }
});

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7ZUOfIrgKZsItBTlOfcxkZ0EPPY-vQK0",
    authDomain: "oss-demo-gui.firebaseapp.com",
    projectId: "oss-demo-gui",
    storageBucket: "oss-demo-gui.firebasestorage.app",
    messagingSenderId: "524959926393",
    appId: "1:524959926393:web:8e3d5725c7ed9c8d3f6ca8",
    measurementId: "G-H1RCMXP4T7"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
function fetchAllUsers() {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      console.log("Registered users:", users);
    });
    // window.location.href = "index.html";
  }
  
  // Email/Password Login
  export function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      localStorage.setItem("authenticated", "true");
      fetchAllUsers();
    //   window.location.href = "index.html";
    });
  }
  
  // Registration
  export async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
  
      await setDoc(doc(db, "users", userEmail), { email: userEmail, password });
      localStorage.setItem("authenticated", "true");
  
      await fetchAllUsers(); // wait for log
      window.location.href = "index.html";
    } catch (error) {
      console.error("Registration error:", error);
    }
  }
  
  // Google Sign-in
  export async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
  
      const email = result.user.email;
      await setDoc(doc(db, "users", email), { email });
  
      localStorage.setItem("authenticated", "true");
      await fetchAllUsers();
  
      window.location.href = "index.html";
    } catch (error) {
      console.error("Google login error:", error);
    }
  }
  
  
  // Microsoft Sign-in
  export function loginWithMicrosoft() {
    const provider = new OAuthProvider("microsoft.com");
    return signInWithPopup(auth, provider).then((result) => {
      const email = result.user.email;
      setDoc(doc(db, "users", email), { email });
      localStorage.setItem("authenticated", "true");
      fetchAllUsers();
    //   window.location.href = "index.html";
    });
  }


// Google and Microsoft Login Simulation
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Email/Password Login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

       loginUser(email, password)
    });
    

    // Google Sign In
    document.getElementById("google-login").addEventListener("click", () => {
        loginWithGoogle()
    });
    

    // Microsoft Sign In
    document.getElementById("microsoft-login").addEventListener("click", () => {
        loginWithMicrosoft()
    }
    );
    
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegister = document.getElementById("show-register");
    const errorMessage = document.getElementById("error-message");
    const registerMessage = document.getElementById("register-message");
    const extraLogin = document.getElementById("extra-login");

    // Toggle to show register form
    showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        extraLogin.style.display = "none";
    });

    // Handle Register Form
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        registerUser(email, password)
    });
    
});





document.addEventListener("DOMContentLoaded", function () {
    const lightModeButton = document.getElementById("light_mode");
    const body = document.body;

    // Check local storage for mode preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    // Toggle Light/Dark Mode
    lightModeButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

//System Health
function updateSystemHealth() {
    document.getElementById("iops").textContent = Math.floor(Math.random() * 15000) + 5000;
    document.getElementById("throughput").textContent = (Math.random() * 500 + 100).toFixed(2) + " MB/s";
    document.getElementById("latency").textContent = (Math.random() * 10).toFixed(2) + " ms";
}

setInterval(updateSystemHealth, 5000); // Update every 5 seconds


// Files Table 
document.addEventListener("DOMContentLoaded", function () {
    const filesTable = document.querySelector(".files-table tbody");

    if (filesTable) {
        filesTable.addEventListener("click", function (event) {
            let row = event.target.closest("tr");
            if (!row) return;

            let username = localStorage.getItem("authenticatedUser") || "OSS Sales";
            let accessedByCell = row.cells[4]; // 5th column (index 4)

            if (accessedByCell) {
                accessedByCell.textContent = username;
            }

            // Store last accessed user for each file in localStorage (optional)
            let fileName = row.cells[1].textContent.trim(); 
            localStorage.setItem(`lastAccessedBy_${fileName}`, username);
        });
    }
});

// EOL Systetms Alerts 
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".eol-status").forEach(cell => {
        let warrantyDate = new Date(cell.previousElementSibling.textContent);
        let today = new Date();
        let remainingMonths = (warrantyDate - today) / (1000 * 60 * 60 * 24 * 30);

        if (remainingMonths < 6) {
            cell.textContent = "Expiring Soon";
            cell.style.color = "red";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoModal = document.getElementById("video-modal");
    const videoPlayer = document.getElementById("video-player");
    const videoClose = document.getElementById("video-close");
    const filesTable = document.querySelector(".files-table tbody");

    if (filesTable) {
        filesTable.addEventListener("click", function (event) {
            const row = event.target.closest("tr");
            if (!row) return;

            const fileName = row.cells[1].textContent.trim();
            if (fileName.toLowerCase().endsWith(".mp4")) {
                // Set source (you can customize based on filename)
                videoPlayer.src = "public/sample.mp4";
                videoModal.style.display = "flex";
                videoPlayer.play();
            }
        });
    }

    videoClose.addEventListener("click", () => {
        videoModal.style.display = "none";
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    // Optional: click outside to close
    videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = "none";
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const descriptions = {
        "System Health": "Displays real-time performance metrics like IOPS, latency, throughput, and storage health across this system.",
        "Systems Status": "Shows the status of all active systems, including their type, location, IP address, and operational status.",
        "Job Operations": "Visualizes operations in progress like archives, restores, copies, deletes, and transcoding. Useful for workload tracking.",
        "Requests Status": "Tracks ongoing and completed user requests with progress, priorities, and ownership info as well as allows for users to reorder their request queue.",
        "Storage Distribution": "Shows the storage usage split across different tiers or systems (e.g., cache, cloud, LTO).",
        "Resource Utilization": "Charts CPU, memory, network usage across systems to help you spot bottlenecks.",
    };

    const descModal = document.getElementById("description-modal");
    const descTitle = document.getElementById("desc-title");
    const descBody = document.getElementById("desc-body");
    const descClose = document.getElementById("desc-close-btn");

    document.querySelectorAll(".cnTitle i.fa-ellipsis-vertical").forEach(icon => {
        icon.style.cursor = "pointer";
        icon.addEventListener("click", () => {
            const title = icon.closest(".grid-item").querySelector("h3").textContent.trim();
            descTitle.textContent = title;
            descBody.textContent = descriptions[title] || "No description available.";
            descModal.style.display = "flex";
        });
    });

    descClose.addEventListener("click", () => {
        descModal.style.display = "none";
    });

    descModal.addEventListener("click", (e) => {
        if (e.target === descModal) {
            descModal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.querySelector(".sidebar");

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
    // Close sidebar when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });

  });
