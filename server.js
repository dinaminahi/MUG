const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const cors = require("cors");
const bodyParser = require("body-parser");

// Parsers
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//Set Port
const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

// const port = process.env.PORT || 8080;

// API file for interacting with MongoDB
const api = require("./server/routes/api");

// -- implement a JWT middleware 
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://vic-horodnychyy.eu.auth0.com/.well-known/jwks.json",
  }),
  // This is the identifier we set when we created the API
  audience: "http://localhost:4200", // '{YOUR-API-AUDIENCE-ATTRIBUTE}',
  issuer: "https://vic-horodnychyy.eu.auth0.com/", // e.g., https://you.auth0.com/  -- "{YOUR-AUTH0-DOMAIN}", 
  algorithms: ["RS256"],
});
app.use(jwtCheck);


// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist/MUG-project")));

// API location
app.use("/api", api);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/MUG-project/index.html"));
});

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

// app.listen(3000);
// console.log("Listening on localhost:3000");

// from example 

// app.get('/api/deals/public', (req, res)=>{
//   let deals = [
//     // Array of public deals
//   ];
//   res.json(deals);
// })

// For the private route, we'll add this authCheck middleware
// app.get('/api/deals/private', authCheck, (req,res)=>{
//   let deals = [
//     // Array of private deals
//   ];
//   res.json(deals);
// })

// For the private route, we'll add this authCheck middleware
app.get('/api/user-profile', authCheck, (req, res) => {
  let user = [
    // Array of user
  ];
  res.json(user);
})
