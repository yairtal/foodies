const express = require('express');
const cors = require('cors');
require("./utils/db");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(8081, () => console.log("Server started on port 8081"));
