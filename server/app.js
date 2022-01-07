const { errors } = require("celebrate");
const express = require("express");
const cors = require("cors");
const app = express();

const ApplicationsRoute = require("./Routes/applications");
const ContactRoute = require("./Routes/Contact");
const ListingRoute = require("./Routes/listings");
const UserRoute = require("./Routes/user");

app.use(cors());

app.use("/applications", ApplicationsRoute);
app.use("/listing", ListingRoute);
app.use("/contact", ContactRoute);
app.use("/user", UserRoute);

app.use(errors());
module.exports = app;
