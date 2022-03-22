import { authenticate } from "../middleware/authMiddleware";
const routesInit = (app, passport) => {

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", successRedirect: "/user" }),
    (req, res) => {
      console.log("User authenticated");
    }
  );

  app.get("/test", authenticate, (req,res)=>{
    res.send("<h4>User is authenticated</h4>")
  })
};

export { routesInit };
