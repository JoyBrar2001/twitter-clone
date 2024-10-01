const express = require("express");
const { getNotifications, deleteNotifications } = require("../controllers/notification.controller");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

module.exports = router;