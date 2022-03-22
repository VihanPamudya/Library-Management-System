import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import config from "./configs";
import logger from "./utils/logger";
import connect from "./utils/databaseConnection";
import "dotenv/config";
import { googleAuth } from "./configs/googleAuth";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(session({
  
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res, next) => {
  res.send("<h2>Library Mnagement System</h2>");
  next();
});

app.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`);
  connect();
  googleAuth(passport);
});
