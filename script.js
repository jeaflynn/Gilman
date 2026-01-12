document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const resetBtn = document.getElementById('reset-btn');

    // Load saved progress from localStorage
    loadProgress();

    // Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Toggle completed class on parent
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }

            // Save progress and update display
            saveProgress();
            updateProgress();
        });
    });

    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all tasks? This cannot be undone.')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.task-item').classList.remove('completed');
            });
            saveProgress();
            updateProgress();
        }
    });

    // Update progress bar and text
    function updateProgress() {
        const total = checkboxes.length;
        const completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = (completed / total) * 100;

        progressFill.style.width = percentage + '%';
        progressText.textContent = `${completed}/${total} tasks complete`;
    }

    // Save progress to localStorage
    function saveProgress() {
        const progress = {};
        checkboxes.forEach(checkbox => {
            progress[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('stemStudyAbroadProgress', JSON.stringify(progress));
    }

    // Load progress from localStorage
    function loadProgress() {
        const savedProgress = localStorage.getItem('stemStudyAbroadProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            checkboxes.forEach(checkbox => {
                if (progress[checkbox.id]) {
                    checkbox.checked = true;
                    checkbox.closest('.task-item').classList.add('completed');
                }
            });
        }
        updateProgress();
    }

    // Initial progress update
    updateProgress();
});
