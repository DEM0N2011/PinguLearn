// Timetable state
let timetableData = {
    monday: Array(24).fill(''),
    tuesday: Array(24).fill(''),
    wednesday: Array(24).fill(''),
    thursday: Array(24).fill(''),
    friday: Array(24).fill(''),
    saturday: Array(24).fill(''),
    sunday: Array(24).fill('')
};

// Subject colors for timetable
const subjectColors = {
    'Biology': '#d1ff00',
    'Chemistry': '#ff6b6b',
    'Physics': '#4ecdc4',
    'Math': '#45b7d1',
    'Break': '#666666',
    'Free': '#333333'
};

function createTimetable() {
    const timetableContainer = document.getElementById('timetable-container');
    // Clear existing content
    timetableContainer.innerHTML = '';
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Create time headers
    const timeHeader = document.createElement('div');
    timeHeader.className = 'time-header';
    timeHeader.innerHTML = '<div class="time-cell">Time</div>';
    for (let i = 0; i < 24; i++) {
        const timeCell = document.createElement('div');
        timeCell.className = 'time-cell';
        timeCell.textContent = `${i}:00`;
        timeHeader.appendChild(timeCell);
    }
    timetableContainer.appendChild(timeHeader);
    
    // Create rows for each day
    days.forEach(day => {
        const row = document.createElement('div');
        row.className = 'timetable-row';
        
        // Day label
        const dayLabel = document.createElement('div');
        dayLabel.className = 'day-label';
        dayLabel.textContent = day.charAt(0).toUpperCase() + day.slice(1);
        row.appendChild(dayLabel);
        
        // Time slots
        for (let hour = 0; hour < 24; hour++) {
            const cell = document.createElement('div');
            cell.className = 'timetable-cell';
            cell.setAttribute('data-day', day);
            cell.setAttribute('data-hour', hour);
            cell.onclick = () => editTimeSlot(day, hour);
            
            if (timetableData[day][hour]) {
                cell.textContent = timetableData[day][hour];
                cell.style.backgroundColor = subjectColors[timetableData[day][hour]] || '#333333';
            }
            
            row.appendChild(cell);
        }
        
        timetableContainer.appendChild(row);
    });
}

function editTimeSlot(day, hour) {
    const subjects = Object.keys(subjectColors);
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Select Subject for ${day} at ${hour}:00</h3>
            <div class="subject-buttons">
                ${subjects.map(subject => `
                    <button class="subject-btn" style="background-color: ${subjectColors[subject]}"
                            onclick="setTimeSlot('${day}', ${hour}, '${subject}')">
                        ${subject}
                    </button>
                `).join('')}
            </div>
            <button class="clear-btn" onclick="setTimeSlot('${day}', ${hour}, '')">Clear</button>
            <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function setTimeSlot(day, hour, subject) {
    timetableData[day][hour] = subject;
    saveTimetable();
    closeModal();
    createTimetable(); // Refresh the timetable
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function saveTimetable() {
    localStorage.setItem('timetableData', JSON.stringify(timetableData));
}

function loadTimetable() {
    const saved = localStorage.getItem('timetableData');
    if (saved) {
        timetableData = JSON.parse(saved);
    }
}

// Initialize timetable when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTimetable();
    createTimetable();
}); 
