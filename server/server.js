const app = require("./app");
require('dotenv').config();

const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
