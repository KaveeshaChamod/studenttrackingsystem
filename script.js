window.onload = () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2000);
};

document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const name = document.getElementById('name');
    const school = document.getElementById('school');
    const grade = document.getElementById('grade');
    const achievements = document.getElementById('achievements');
    const extracurricular = document.getElementById('extracurricular');

    function validateField(field, minLength, message) {
        const errorMessage = field.nextElementSibling;
        if (field.value.trim().length < minLength) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            field.style.border = '2px solid red';
            isValid = false;
        } else {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            field.style.border = '1px solid #ccc';
        }
    }

    validateField(name, 3, "Name must be at least 3 characters");
    validateField(school, 2, "School name is required");
    validateField(grade, 1, "Grade must be between 1-13");
    validateField(achievements, 5, "Enter at least 5 characters");
    validateField(extracurricular, 5, "Enter at least 5 characters");

    if (!isValid) return; // Stop form submission if invalid

    // Create a new row in the table
    const tableBody = document.getElementById("student-table-body");
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = name.value;
    newRow.insertCell(1).textContent = school.value;
    newRow.insertCell(2).textContent = grade.value;
    newRow.insertCell(3).textContent = achievements.value;
    newRow.insertCell(4).textContent = extracurricular.value;

    // Clear the form after successful submission
    document.getElementById('student-form').reset();

    alert(`Student Information Submitted:\n\nName: ${name.value}\nGrade: ${grade.value}\nAchievements: ${achievements.value}\nExtracurricular: ${extracurricular.value}`);
});

// Sort table by column index
function sortTable(columnIndex) {
    let table = document.getElementById("student-table");
    let rows = Array.from(table.rows).slice(1); // Exclude header

    let isAscending = table.dataset.sortOrder !== "asc";
    table.dataset.sortOrder = isAscending ? "asc" : "desc";

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].innerText.toLowerCase();
        let cellB = rowB.cells[columnIndex].innerText.toLowerCase();
        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    rows.forEach(row => table.appendChild(row)); // Reorder rows
}

// Filter student table
function filterTable() {
    let filter = document.getElementById("filter-input").value.toLowerCase();
    let tableBody = document.getElementById("student-table-body");
    let rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
        let nameCell = row.cells[0]; // First column (Name)
        if (nameCell) {
            let name = nameCell.textContent.toLowerCase();
            row.style.display = name.includes(filter) ? "" : "none";
        }
    }
}

// Load student data on page load
window.addEventListener("DOMContentLoaded", loadStudentData);