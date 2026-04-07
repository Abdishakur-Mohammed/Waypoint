import express from "express"
import { createApplication, getAllApplications, UpdateApplication, deleteApplication } from "../controllers/applicationController.js"
import protect from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/", protect, createApplication)
router.get("/", protect, getAllApplications)
router.put("/:id", protect, UpdateApplication)
router.delete("/:id", protect, deleteApplication)

export default router;