// backend/user/index.js

const express = require('express');
const workerRouter = require('./worker');
const hirerRouter = require('./hirer');
const signinRouter = require('./signin');

const router = express.Router();

router.use("/worker", workerRouter);
router.use("/hirer", hirerRouter);
router.use("/signin", signinRouter);

module.exports = router;