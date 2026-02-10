import express from "express";
import Meeting from "../model/meeting.model.js";
import  hasConflict  from "../service/meeting.service.js";
import auth from "../../../middlewares/auth.js";

const router = express.Router();


router.post("/", auth, async (req, res) => {
  const { title, startTime, endTime } = req.body;

  if (!title || !startTime || !endTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ message: "startTime must be before endTime" });
  }

  const conflict = await hasConflict({
    userId: req.userId,
    startTime,
    endTime,
  });

  if (conflict) {
    return res.status(400).json({ message: "Time slot already booked" });
  }

  const meeting = await Meeting.create({
    userId: req.userId,
    title,
    startTime,
    endTime,
  });

  res.status(201).json(meeting);
});


router.get("/", async (req, res) => {
  const meetings = await Meeting.findAll({
    order: [["startTime", "ASC"]],
  });
  res.json(meetings);
});


router.get("/:id", async (req, res) => {
  const meeting = await Meeting.findByPk(req.params.id);

  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  res.json(meeting);
});

router.put("/:id", auth, async (req, res) => {
  const meeting = await Meeting.findByPk(req.params.id);

  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  const { title, startTime, endTime } = req.body;

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ message: "Invalid time range" });
  }

  const conflict = await hasConflict({
    userId: meeting.userId,
    startTime,
    endTime,
    excludeId: meeting.id,
  });

  if (conflict) {
    return res.status(400).json({ message: "Time slot already booked" });
  }

  await meeting.update({ title, startTime, endTime });
  res.json(meeting);
});


router.delete("/:id", auth, async (req, res) => {
  const deleted = await Meeting.destroy({
    where: { id: req.params.id },
  });

  if (!deleted) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  res.status(204).send();
});

export default router;
