const app = require("./app");
const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/newcareer";

mongoose.connect(mongoUri);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
