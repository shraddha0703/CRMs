const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", require("./Routes/Login"));
app.use("/", require("./Routes/Register"));
app.use("/", require("./Routes/ForgotPass"));
app.use("/", require("./Routes/VerifyOTP"));
app.use("/", require("./Routes/MyTasks"));

app.listen(process.env.PORT, () => {
  console.log(`Server Running On PORT : ${process.env.PORT}`);
});
