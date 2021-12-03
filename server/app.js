const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const ListingRoute = require("./Routes/listings");

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-8no50mo4.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://newcareer.co.nz',
  issuer: 'https://dev-8no50mo4.us.auth0.com/',
  algorithms: ['RS256']
});


app.use(cors());
app.use("/listing", ListingRoute);

module.exports = app;
