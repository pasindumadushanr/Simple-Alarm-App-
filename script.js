document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll("nav button");
    const tabs = document.querySelectorAll(".tab");

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabs.forEach(tab => tab.classList.remove("active"));

            button.classList.add("active");
            document.querySelector(`#${button.id.replace("tab-", "")}`).classList.add("active");
        });
    });

    const alarmsList = document.getElementById("alarms-list");
    const setAlarmButton = document.getElementById("set-alarm");
    const stopAlarmButton = document.getElementById("stop-alarm");
    const alarmSound = new Audio("alarm.mp3");

    setAlarmButton.addEventListener("click", () => {
        const date = document.getElementById("date").value;
        const hours = document.getElementById("hours").value;
        const minutes = document.getElementById("minutes").value;
        const seconds = document.getElementById("seconds").value;

        if (!date || hours === "" || minutes === "" || seconds === "") {
            alert("Please enter all values.");
            return;
        }

        const alarmTime = `${date} ${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;

        const listItem = document.createElement("li");
        const alarmText = document.createElement("span");
        alarmText.textContent = alarmTime;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => listItem.remove());

        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => {
            const newDate = prompt("Enter new date (YYYY-MM-DD):", date);
            const newHours = prompt("Enter new hours (0-23):", hours);
            const newMinutes = prompt("Enter new minutes (0-59):", minutes);
            const newSeconds = prompt("Enter new seconds (0-59):", seconds);

            if (newDate && newHours && newMinutes && newSeconds) {
                alarmText.textContent = `${newDate} ${newHours.padStart(2, '0')}:${newMinutes.padStart(2, '0')}:${newSeconds.padStart(2, '0')}`;
            } else {
                alert("Invalid update.");
            }
        });

        listItem.appendChild(alarmText);
        listItem.appendChild(updateButton);
        listItem.appendChild(deleteButton);
        alarmsList.appendChild(listItem);

        const checkAlarmInterval = setInterval(() => {
            const now = new Date();
            const alarmDate = new Date(alarmTime);
            if (now >= alarmDate) {
                clearInterval(checkAlarmInterval);
                alarmSound.play();
                alert("Alarm ringing!");
            }
        }, 1000);
    });

    stopAlarmButton.addEventListener("click", () => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    });

    const countdownButton = document.getElementById("start-countdown");
    const countdownDisplay = document.getElementById("countdown-display");

    countdownButton.addEventListener("click", () => {
        const countdownHours = parseInt(document.getElementById("countdown-hours").value, 10) || 0;
        const countdownMinutes = parseInt(document.getElementById("countdown-minutes").value, 10) || 0;
        const countdownSeconds = parseInt(document.getElementById("countdown-seconds").value, 10) || 0;

        let totalSeconds = countdownHours * 3600 + countdownMinutes * 60 + countdownSeconds;

        if (totalSeconds <= 0) {
            alert("Please enter a valid countdown time.");
            return;
        }

        const interval = setInterval(() => {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            countdownDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;

            if (totalSeconds <= 0) {
                clearInterval(interval);
                countdownDisplay.textContent = "Time's up!";
                alarmSound.play();
            }

            totalSeconds -= 1;
        }, 1000);
    });
});