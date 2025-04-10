document.addEventListener("DOMContentLoaded", () => {
  const reportTableBody = document.getElementById("reports-body");
  const modal = document.getElementById("report-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalDetails = document.getElementById("modal-details");
  const closeBtn = document.querySelector(".close-btn");
  const dateInput = document.getElementById("report-date");

  // Set default to today
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  // Report dataset across multiple months
  const reportData = [
    // JANUARY
    { date: "2025-01-01", title: "Daily Migration Summary", summary: "Migrated 3TB to tape", details: "Migrated 3TB to tape. Backlog: 400 files.", aiRecommendation: "High file backlog detected. Consider scheduling additional migration windows or enabling load-based triggers." },
    { date: "2025-01-02", title: "File Purge Report", summary: "Purged 1,000 files", details: "Purged 1,000 expired files and freed 600GB.", aiRecommendation: "Regular purging is working well. Consider expanding expiration policies to include older low-access files." },
    { date: "2025-01-03", title: "Virtual Growth", summary: "System grew 220TB", details: "Total storage increased by 220TB in January 2025.", aiRecommendation: "Storage is expanding quickly. Evaluate tiering strategies or budget for hardware/cloud expansion." },

    // FEBRUARY
    { date: "2025-02-10", title: "System Status Report", summary: "1 hang, 3 reboots", details: "System hang occurred. Three reboots logged. 2 open tickets.", aiRecommendation: "Investigate root causes of instability. Apply system health monitoring and automate reboot alerting." },
    { date: "2025-02-14", title: "Backup Completion Report", summary: "Completed 5TB backup", details: "5TB backup completed to cloud archive.", aiRecommendation: "Review cloud costs and validate data integrity. Set alerts for incomplete backup jobs." },

    // MARCH
    { date: "2025-03-01", title: "Daily Migration Summary", summary: "Migrated 5TB to tape", details: "Migrated 5TB to tape. Backlog: 200 files. All systems healthy.", aiRecommendation: "Backlog is manageable. Maintain schedule and enable anomaly detection for sudden spikes." },
    { date: "2025-03-03", title: "File Purge Report", summary: "Purged 2,000 files", details: "Purged 2,000 expired files and freed 1.2TB.", aiRecommendation: "Purge volume is increasing. Assess if archives are aging faster and adjust retention cycles." },
    { date: "2025-03-05", title: "Backup Completion Report", summary: "Completed 10TB backup", details: "Scheduled backup completed: 10TB to tape storage.", aiRecommendation: "Large backups may delay operations. Stagger backup jobs or optimize deduplication strategies." },
    { date: "2025-03-08", title: "System Status Report", summary: "2 crashes, 4 reboots", details: "Reported 2 crashes, 4 reboots, and 3 open tickets.", aiRecommendation: "Persistent failures suggest deeper hardware or software issues. Escalate logs for vendor analysis." },
    { date: "2025-03-10", title: "Virtual Growth", summary: "System grew 180TB", details: "Total storage usage increased by 180TB in March 2025.", aiRecommendation: "Plan storage allocation for the next quarter. Growth trend indicates need for scalable storage policies." },

    // APRIL
    { date: "2025-04-01", title: "Daily Migration Summary", summary: "Migrated 6TB to tape", details: "Migrated 6TB to tape. Backlog: 150 files.", aiRecommendation: "Consider reducing migration backlog by adding an extra migration slot or automating priority tagging."},
    { date: "2025-04-02", title: "File Purge Report", summary: "Purged 3,500 files", details: "Purged 3,500 expired files and freed 2.3TB.", aiRecommendation: "Continue regular purging to optimize space. Evaluate automating retention policies for older media." },
    { date: "2025-04-03", title: "Backup Completion Report", summary: "Completed 12TB backup", details: "Backed up 12TB to tape and verified integrity.", aiRecommendation: "Set up automated validation alerts to ensure all backups complete and verify successfully." },
    { date: "2025-04-04", title: "System Status Report", summary: "1 reboot, 1 patch", details: "Reboot occurred after patch update. No issues reported.", aiRecommendation: "Monitor post-patch system performance to detect regressions or emerging errors early." },
    { date: "2025-04-05", title: "Virtual Growth", summary: "System grew 240TB", details: "Total storage usage increased by 240TB in April 2025.", aiRecommendation: "Evaluate whether new growth requires additional storage hardware or cloud extension to avoid saturation." },
    { date: "2025-04-06", title: "System Status Report", summary: "1 crash", details: "Unexpected crash on storage node HQ-Storage2.", aiRecommendation: "Investigate node HQ-Storage2 logs for potential disk failures or I/O bottlenecks. Increase monitoring frequency." }
  ];

  function loadReportsByMonth() {
    const selectedDate = new Date(dateInput.value);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const filtered = reportData.filter(report => {
      const reportDate = new Date(report.date);
      return (
        reportDate.getMonth() === selectedMonth &&
        reportDate.getFullYear() === selectedYear
      );
    });

    reportTableBody.innerHTML = "";

    if (filtered.length === 0) {
      reportTableBody.innerHTML = `<tr><td colspan="3">No reports found for this month.</td></tr>`;
      return;
    }

    filtered.forEach(report => {
      const row = document.createElement("tr");
      row.classList.add("report-entry");
      row.innerHTML = `
        <td>${report.title}</td>
        <td>${report.summary}</td>
        <td>${report.date}</td>
      `;

        const modalAI = document.getElementById("modal-ai");

        row.addEventListener("click", () => {
        modalTitle.textContent = report.title;
        modalDate.textContent = report.date;
        modalDetails.textContent = report.details;
        modalAI.textContent = report.aiRecommendation || "No recommendation available.";
        modal.style.display = "flex";
        });

      reportTableBody.appendChild(row);
    });
  }

  document.getElementById("load-reports").addEventListener("click", loadReportsByMonth);
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

  // Auto load current month on page load
  loadReportsByMonth();
});
