const express = require("express");
const userRoutes = require("./userRoutes")
const companyRoutes = require("./companyRoutes");

const app = express();
const router = express.Router();

// default route
app.get("/", (req, res) => {
  res.json("Api working fine!");
});

// user Routes
router.use("/user", userRoutes);

router.use("/company", companyRoutes);

module.exports = router;