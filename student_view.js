// Retrieve stored grades from local storage
let grades = JSON.parse(localStorage.getItem('grades')) || [];

// Function to view grades for a specific student
function viewGrade() {
    const studentCode = document.getElementById("studentCode").value.trim();
    const errorMessage = document.getElementById("errorMessage");
    const gradesTable = document.getElementById("gradesTable");
    const tableBody = document.querySelector('#gradesTable tbody');

    // Clear any previous error message and table data
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    tableBody.innerHTML = '';
    gradesTable.style.display = 'none';

    // Check if the student code is entered
    if (!studentCode) {
        displayErrorMessage('Please enter a student code.');
        return;
    }

    // Check if input is a valid number
    if (isNaN(studentCode)) {
        displayErrorMessage('Student code must be a number.');
        return;
    }

    // Find the student by code
    const matchingGrades = grades.filter(g => g.code.toString() === studentCode); // Ensure type consistency

    if (matchingGrades.length > 0) {
        // Sort matching grades by session number ascending
        matchingGrades.sort((a, b) => a.session - b.session);
        
        gradesTable.style.display = 'table';
        gradesTable.setAttribute('aria-hidden', 'false'); // Make table visible to screen readers

        // Insert all matching sessions for that student code
        tableBody.innerHTML = matchingGrades.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.code}</td>
                <td>${student.session}</td>
                <td>${formatScore(student.homework, student.totalHomework)}</td>
                <td>${formatScore(student.classwork, student.totalClasswork)}</td>
                <td>${formatScore(student.exam, student.totalExam)}</td>
                <td>${student.absent ? 'Absent' : 'Present'}</td>
            </tr>
        `).join('');
    } else {
        gradesTable.setAttribute('aria-hidden', 'true'); // Hide table from screen readers
        displayErrorMessage('No grade found for the provided student code.');
    }
}

// Function to display an error message
function displayErrorMessage(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Function to format the score as "achieved/total" or "Not Done"
function formatScore(achieved, total) {
    if (achieved === "Not Done" || total === "Not Done") {
        return "Not Done";
    }
    return `${achieved}/${total}`;
}

// Initial load
window.onload = function() {
    // Any initialization code can go here if needed
};
