const { errors } = require("celebrate");
const express = require("express");
const cors = require("cors");
const app = express();

const stripe = require('stripe')('sk_test_51KEVppKt5LTE5iV5cMXB6EHKwUPLztjLuqrUHnZ6hm5GFiwjNfkUHtbT9uoppgmxP8t3ffJ9uYEzC12BBgp9310e009Enwmf6c');

const ApplicationsRoute = require("./Routes/applications");
const ContactRoute = require("./Routes/Contact");
const ListingRoute = require("./Routes/listings");
const UserRoute = require("./Routes/user");

const YOUR_DOMAIN = 'http://localhost:3000';

app.use(cors());

app.use("/applications", ApplicationsRoute);
app.use("/listing", ListingRoute);
app.use("/contact", ContactRoute);
app.use("/user", UserRoute);

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1KHMP1Kt5LTE5iV5bmImCD2K',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/`,
    });
  
    res.redirect(303, session.url);
  });

app.use(errors());
module.exports = app;
