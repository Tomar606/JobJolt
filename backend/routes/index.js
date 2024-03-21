// backend/user/index.js

const express = require('express');
const workerRouter = require('./worker');
const hirerRouter = require('./hirer');

const router = express.Router();

router.use("/worker", workerRouter);
router.use("/hirer", hirerRouter);

module.exports = router;