
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

import {
    firebaseConfig,
    sentinelDataPath
} from "./firebase-config.js";

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Prevent demo telemetry from overwriting live data.
window.SENTINEL_LIVE_MODE = true;

const telemetryRef = ref(database, sentinelDataPath);

console.log("SENTINEL: Connecting to Firebase...");
console.log("Live telemetry path:", sentinelDataPath);

function setText(id, value) {
    const element = document.getElementById(id);

    if (element && value !== undefined && value !== null) {
        element.textContent = String(value);
    }
}

function updateDashboard(data) {
    console.log("Live telemetry received:", data);

    const status = String(data.status ?? "GPS_ACQUIRING");
    const satellites = Number(data.sats ?? 0);
    const speed = Number(data.gpsSpeed ?? 0);
    const hdop = data.hdop;
    const acceleration = data.accelMag;
    const gyro = data.gyroMag;

    // Update status labels.
    setText("signalState", status);
    setText("satState", satellites + " satellites");
    setText("speedState", "Live ESP32 reading");
    setText("accelState", "Live IMU reading");
    setText("gyroState", "Live IMU reading");

    // Update dashboard values.
    setText("workSignal", status);
    setText("workSats", satellites);
    setText("workSpeed", speed.toFixed(2) + " km/h");

    setText(
        "workHdop",
        hdop == null ? "Unavailable" : Number(hdop).toFixed(2)
    );

    setText(
        "workAccel",
        acceleration == null
            ? "Unavailable"
            : Number(acceleration).toFixed(3) + " m/s²"
    );

    setText(
        "workGyro",
        gyro == null
            ? "Unavailable"
            : Number(gyro).toFixed(3) + " rad/s"
    );

    // Update GPS coordinates.
    if (data.lat != null && data.lon != null) {
        setText(
            "coords",
            `GNSS ${Number(data.lat).toFixed(6)}, ${Number(data.lon).toFixed(6)}`
        );
    } else {
        setText("coords", "GNSS position unavailable");
    }

    // Update the status indicator.
    const isAbnormal = [
        "GNSS_DEGRADED",
        "SUSPECTED_SPOOFING",
        "GNSS_BLACKOUT"
    ].includes(status);

    const statusElement = document.getElementById("navStatus");

    if (statusElement) {
        statusElement.textContent = status;
        statusElement.className = "pill" + (isAbnormal ? " warn" : "");
    }

    const alertLamp = document.getElementById("jammingLamp");

    if (alertLamp) {
        alertLamp.classList.toggle("active", isAbnormal);
    }

    const threatText = document.getElementById("threatText");

    if (threatText) {
        threatText.textContent =
            "LIVE ESP32 STATUS: " + status +
            " | Satellites: " + satellites +
            " | Data received from Firebase Realtime Database.";
    }

    // Log the telemetry timestamp.
    if (data.ts != null) {
        console.log(
            "Last telemetry timestamp:",
            new Date(Number(data.ts)).toLocaleString()
        );
    }
}

// Listen for real-time Firebase updates.
onValue(
    telemetryRef,
    (snapshot) => {
        if (!snapshot.exists()) {
            console.warn(
                "No live telemetry found at:",
                sentinelDataPath
            );

            setText(
                "threatText",
                "Waiting for ESP32 telemetry at " + sentinelDataPath
            );

            return;
        }

        updateDashboard(snapshot.val());
    },
    (error) => {
        console.error("Firebase listener error:", error);

        setText(
            "threatText",
            "Firebase connection error: " + error.message
        );
    }
);


