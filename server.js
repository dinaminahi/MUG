const express = require("express");
const path = require("path");
const http = require("http");
const app = express();

// API file for interacting with MongoDB
const api = require("./server/routes/api");

// Parsers
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist/MUG-project")));

// API location
app.use("/api", api);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/MUG-project/index.html"));
});

//Set Port
const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Connected to port ${port}`));
