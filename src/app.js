import express from "express";
import cors from "cors";
import logger from "./utils/logger";
import connect from "./utils/databaseConnection";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2>Library Mnagement System</h2>");
  next();
});

app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`);
  connect();
});
