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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const telemetryRef = ref(database, sentinelDataPath);

console.log("SENTINEL: Connecting to Firebase...");
console.log("Database path:", sentinelDataPath);

onValue(
telemetryRef,
(snapshot) => {
if (!snapshot.exists()) {
console.warn(
"SENTINEL: No telemetry found at",
sentinelDataPath
);
console.log("Check the actual Firebase database path.");
return;
}

```
    const telemetry = snapshot.val();

    console.log("SENTINEL: Live Firebase telemetry received:");
    console.log(telemetry);

    // The exact field-to-dashboard mapping comes next.
},
(error) => {
    console.error("SENTINEL: Firebase read failed:", error);
}
```

);
