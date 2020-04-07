const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const app = express();

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
// API file for interacting with MongoDB
const api = require("./server/routes/api");

// Parsers
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

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

server.listen(port, () => console.log(`Running on localhost:${port}`));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://vic-horodnychyy.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:4200",
  issuer: "https://vic-horodnychyy.eu.auth0.com/",
  algorithms: ["RS256"],
});
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});
