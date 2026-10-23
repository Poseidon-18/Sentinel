# SENTINEL | GNSS Integrity Monitor System

**SENTINEL** is an embedded systems project designed to monitor Global Navigation Satellite System (GNSS) signal integrity and identify potentially suspicious navigation conditions, including signal jamming, spoofing, and signal loss.

The system uses an ESP32 microcontroller, a GNSS receiver, and an MPU6050 inertial measurement unit (IMU) to monitor navigation data and compare satellite-based movement with sensor-based motion information. The project also aims to provide alerts, record events, and support short-term motion monitoring when GNSS signals become unreliable.

##  Key Features

* **GNSS Signal Monitoring:** Monitors satellite signal availability and quality.
* **Jamming Detection:** Identifies conditions that may indicate GNSS interference.
* **Spoofing Detection:** Checks for inconsistencies between GNSS navigation data and IMU measurements.
* **Signal Loss Detection:** Identifies when GNSS navigation data becomes unavailable.
* **IMU-Based Monitoring:** Uses acceleration and gyroscope measurements to observe movement.
* **Alert System:** Integrates LED, buzzer, and LCD outputs for local notifications.
* **Event Logging:** Designed to record navigation events and system alerts.
* **Web Dashboard:** Provides a visual interface for monitoring system status, telemetry, and simulated threat scenarios.
* **Firebase Integration:** Intended to support backend data storage and communication.
* **Cellular Connectivity:** An EC200U LTE module is planned for remote event transmission.
* 
  ## Technologies Used
* **Embedded Hardware:** ESP32, GNSS receiver, MPU6050 IMU
* **Programming:** Arduino/C++ for embedded firmware, HTML, CSS, and JavaScript for the frontend
* **Backend:** Firebase
* **Communication:** UART, I2C, and planned LTE connectivity
* **Development Tools:** Arduino IDE, Visual Studio Code, Git, and GitHub
* **Deployment:** Vercel for the web frontend

 ##Project Objective
The primary objective of SENTINEL is to develop a low-cost GNSS integrity monitoring prototype that can identify potentially unreliable navigation conditions by combining satellite navigation information with inertial sensor data.
The project explores how embedded systems, sensor fusion, and web-based monitoring can contribute to more reliable navigation systems.
tem performance under controlled test conditions.

