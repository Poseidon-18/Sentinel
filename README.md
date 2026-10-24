SENTINEL : https://sentinel-sigma-ecru.vercel.app/

Satellite Electronic Navigation Threat Intelligence and Navigation Emergency Link

SENTINEL is an end-to-end GNSS integrity monitoring and alert system designed for defense vehicles, convoy logistics, and rescue operations. Standard GPS receivers cannot differentiate between genuine satellite signals and spoofed or jammed signals. SENTINEL solves this by cross-checking satellite navigation data against inertial motion sensors at the edge, classifying threat levels in real time, and alerting both the vehicle operator and the base command center.

Key Features

Cross-Sensor Signal Verification: Fuses data from a NEO-6M GNSS receiver and an MPU6050 IMU on an ESP32 microcontroller to verify if reported satellite motion aligns with actual physical acceleration.

4-State Threat Classification: Real-time state detection for:

NORMAL: GNSS and IMU motion data agree.

DEGRADED: High HDOP / fix drift detected while stationary.

SUSPECTED SPOOFING: GNSS reports high speed while IMU senses zero physical acceleration.

GNSS BLACKOUT: Complete loss of satellite signal; captures last known fix.

Multi-Layer Emergency Alerts:

On-Device: Local LCD display, LED status indicators, and audio buzzer alerts.

Out-of-Band SMS: Transmits immediate threat state and coordinates via EC200U LTE module even during web outages.

Cloud Sync: Telemetry and event logs synced to Firebase in real time.

Base Command Web Console: Web application with secure login to monitor fleet status, track vehicle location on a live map, and inspect detailed diagnostic telemetry (HDOP, satellite count, IMU delta, speed).

Hardware Architecture & Pinout

Module

Interface

ESP32 Pins

Function

NEO-6M GNSS

UART2

GPIO16 (RX), GPIO17 (TX)

Satellite position, speed, HDOP, satellite count

MPU6050 IMU

I²C (0x68)

GPIO21 (SDA), GPIO22 (SCL)

6-axis acceleration & angular velocity

16x2 LCD

I²C (Shared)

GPIO21 (SDA), GPIO22 (SCL)

On-vehicle status updates

EC200U LTE

UART1

GPIO26 (RX), GPIO27 (TX)

Emergency SMS & cellular data transport

Buzzer / LEDs

GPIO

GPIO2, GPIO4

Local visual and sound alarms

Tech Stack

Embedded Firmware: C++ / Arduino Framework on ESP32

Database & Cloud: Firebase Realtime Database / Firestore & Firebase Authentication

Frontend Web Console: React / Modern JS Web App with interactive mapping components

How Threat Detection Works

                     +-----------------------+
                     |  NEO-6M GNSS Module   |
                     | (Speed, HDOP, Sats)   |
                     +-----------+-----------+
                                 |
                                 v
+------------------+     +-------+-------+     +------------------------+
|  MPU6050 IMU     | --> | ESP32 Fusion  | --> | Classification Engine  |
| (Accel & Motion) |     |    Engine     |     |  (Normal, Degraded,    |
+------------------+     +---------------+     |   Spoofed, Blackout)   |
                                               +-----------+------------+
                                                           |
                                 +-------------------------+-------------------------+
                                 |                         |                         |
                                 v                         v                         v
                       +-------------------+     +-------------------+     +-------------------+
                       | Local Alerts      |     | LTE Module (SMS)  |     | Firebase Console  |
                       | (LCD, LED, Sound) |     | (Direct to Base)  |     | (Web Map & Logs)  |
                       +-------------------+     +-------------------+     +-------------------+
