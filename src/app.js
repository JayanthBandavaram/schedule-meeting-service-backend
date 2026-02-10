import express from "express";
import userRoutes from "./modules/user/routes/user.routes.js";
import meetingRoutes from "./modules/meetings/routes/meeting.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});


app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);

export default app;
