const { errors } = require("celebrate");
const express = require("express");
const cors = require("cors");
const app = express();

const ListingRoute = require("./Routes/listings");
const EmployerRoute = require("./Routes/employer");

app.use(cors());
app.use("/listing", ListingRoute);
app.use("/employer", EmployerRoute);

app.use(errors());
module.exports = app;
