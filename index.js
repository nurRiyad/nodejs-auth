const express = require("express");
const morgan = require("morgan");
const dotEnv = require("dotenv");

const authRoute = require("./routes/Auth.route");

// For reading environment variable
dotEnv.config();

const app = express();
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.send("Hello from express");
});

app.use("/auth", authRoute);

// Catch all route
app.use(async (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;

  next(error);
});

// Error handler
app.use(async (err, req, res, next) => {
  res.status = err.status || 5000;
  res.send({
    error: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Start listening at port ${PORT}`);
});
