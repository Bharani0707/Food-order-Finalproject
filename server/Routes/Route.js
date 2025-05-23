const express = require("express");
const userRoute = require("./UserRoute");
const cartRoute = require("./CartRoute");
const orderRoute = require("./OrderRoute");

const router = express.Router();

// Mount all routes here
router.use("/auth", userRoute);        // -> /api/auth/register
router.use("/cart", cartRoute);
router.use("/order", orderRoute);

module.exports = router;
