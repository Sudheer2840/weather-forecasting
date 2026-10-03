const form = document.getElementById("weatherForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    loading.style.display = "block";
    result.style.display = "none";

    const minTemp = Number(document.getElementById("min_temp").value);
const maxTemp = Number(document.getElementById("max_temp").value);

if (minTemp > maxTemp) {
    alert("Minimum temperature cannot be greater than maximum temperature.");
    loading.style.display = "none";
    return;
}
const windSpeed = Number(document.getElementById("wind_speed").value);
const elevation = Number(document.getElementById("elevation").value);

if (windSpeed < 0) {
    alert("Wind speed cannot be negative.");
    loading.style.display = "none";
    return;
}

if (elevation < 0) {
    alert("Elevation cannot be negative.");
    loading.style.display = "none";
    return;
}
const month = Number(document.getElementById("month").value);

if (month < 1 || month > 12) {
    alert("Month must be between 1 and 12.");
    loading.style.display = "none";
    return;
}
const tempRange = Number(document.getElementById("temp_range").value);
const expectedTempRange = maxTemp - minTemp;

if (Math.abs(tempRange - expectedTempRange) > 0.1) {
    alert(
        `Temperature range should be ${expectedTempRange.toFixed(1)}°C.`
    );
    loading.style.display = "none";
    return;
}
const seasonCode = Number(
    document.getElementById("season_code").value
);

let expectedSeason;

if (month === 12 || month === 1 || month === 2) {
    expectedSeason = 0; // Winter
} else if (month >= 3 && month <= 5) {
    expectedSeason = 1; // Summer
} else if (month >= 6 && month <= 9) {
    expectedSeason = 2; // Monsoon
} else {
    expectedSeason = 3; // Post-monsoon
}

if (seasonCode !== expectedSeason) {
    alert("The selected season does not match the selected month.");
    loading.style.display = "none";
    return;
}


    const data = {
        avg_temp: Number(document.getElementById("avg_temp").value),
        min_temp: Number(document.getElementById("min_temp").value),
        max_temp: Number(document.getElementById("max_temp").value),
        wind_speed: Number(document.getElementById("wind_speed").value),
        air_pressure: Number(document.getElementById("air_pressure").value),
        elevation: Number(document.getElementById("elevation").value),
        latitude: Number(document.getElementById("latitude").value),
        longitude: Number(document.getElementById("longitude").value),
        month: Number(document.getElementById("month").value),
        season_code: Number(document.getElementById("season_code").value),
        temp_range: Number(document.getElementById("temp_range").value)
    };

    try {

        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const prediction = await response.json();

        if (!response.ok) {
            throw new Error(prediction.error || "Prediction failed");
        }

        document.getElementById("rainfall").textContent =
            prediction.predicted_rainfall.toFixed(2) + " mm";

        document.getElementById("probability").textContent =
            prediction.rain_probability.toFixed(0) + "%";

         const probabilityBar = document.getElementById("probabilityBar");

         probabilityBar.style.width =
         prediction.rain_probability + "%";
document.getElementById("condition").textContent =
    prediction.weather_condition;

// Prediction summary
const summary = document.getElementById("summary");

if (prediction.rain_probability >= 50) {
    summary.textContent =
        `🌧️ Rain is likely. The model predicts ${prediction.predicted_rainfall.toFixed(2)} mm rainfall with an ${prediction.rain_probability.toFixed(0)}% probability of rain.`;
} else {
    summary.textContent =
        `☀️ Rain is unlikely. The model predicts ${prediction.predicted_rainfall.toFixed(2)} mm rainfall with an ${prediction.rain_probability.toFixed(0)}% probability of rain.`;
}

result.style.display = "block";

    } catch (error) {

        alert("Error: " + error.message);

    } finally {

        loading.style.display = "none";

    }

});
// Reset button
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {

    document.getElementById("weatherForm").reset();

    document.getElementById("result").style.display = "none";

    document.getElementById("summary").textContent =
        "🌧️ Rain is likely based on the AI prediction.";

    document.getElementById("probabilityBar").style.width = "0%";

});