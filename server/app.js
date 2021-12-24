const { errors } = require("celebrate");
const express = require("express");
const cors = require("cors");
const app = express();

const ListingRoute = require("./Routes/listings");
const EmployerRoute = require("./Routes/employer");
const ApplicationsRoute = require("./Routes/applications");
const UserRoute = require("./Routes/user");

app.use(cors());

app.use("/applications", ApplicationsRoute);
app.use("/employer", EmployerRoute);
app.use("/listing", ListingRoute);
app.use("/user", UserRoute);

app.use(errors());
module.exports = app;
