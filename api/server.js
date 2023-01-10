const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const routes = require("./routes");
const models = require("./models");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: "http://localhost:5174" }));

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});
