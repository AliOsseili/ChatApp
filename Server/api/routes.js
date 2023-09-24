import { Router } from "express";
import Rooms from "../models/Rooms.js";

const router = new Router();

router.get("/rooms", async (req, res) => {
    const rooms = await Rooms.find();
    res.json({ rooms });
});

export default router;
