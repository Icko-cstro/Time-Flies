document.addEventListener("DOMContentLoaded", function () {
    // Get references to elements
    const timeDisplay = document.querySelector(".time");
    const unitDisplay = document.querySelector(".unit");
    const radioButtons = document.querySelectorAll(".choice-circle");

    // Define the starting timestamp (February 15, 2022, 2:30 AM PST)
    const startTime = new Date("2022-02-15T02:30:30+08:00").getTime();

    // Function to update time based on selected unit
    function updateTime() {
        const now = new Date();
        const philippinesTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" })); // Convert to PST
        const elapsedMilliseconds = philippinesTime.getTime() - startTime; // Calculate elapsed time

        let timeValue, unitText;

        // Determine the selected radio button
        const selectedRadio = document.querySelector(".choice-circle:checked");
        if (selectedRadio) {
            switch (selectedRadio.value) {
                case "one": // Seconds
                    timeValue = Math.floor(elapsedMilliseconds / 1000);
                    unitText = "seconds";
                    break;
                case "two": // Minutes
                    timeValue = Math.floor(elapsedMilliseconds / (1000 * 60));
                    unitText = "minutes";
                    break;
                case "three": // Hours
                    timeValue = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
                    unitText = "hours";
                    break;
                case "four": // Days
                    timeValue = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
                    unitText = "days";
                    break;
                case "five": // Months
                    const elapsedYears = elapsedMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
                    timeValue = Math.floor(elapsedYears * 12); // Convert years to months and remove decimals
                    unitText = "months";
                    break;
                default:
                    timeValue = 0;
                    unitText = "unknown";
            }
        }

        // Adjust font size dynamically
        if (timeValue >= 100000) {
            timeDisplay.style.fontSize = "12vw"; // Smaller font size for 6+ digits
        } else {
            timeDisplay.style.fontSize = "18vw"; // Default font size
        }

        // Update the display
        timeDisplay.textContent = timeValue;
        unitDisplay.textContent = unitText;
    }

    // Listen for changes in radio buttons
    radioButtons.forEach(button => {
        button.addEventListener("change", updateTime);
    });

    // Update time every second
    setInterval(updateTime, 1000);

    // Initial call to display correct time on load
    updateTime();
});
