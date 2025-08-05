const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API route to serve prayer times JSON
app.get("/api/prayer-times", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "prayer_times.json"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
