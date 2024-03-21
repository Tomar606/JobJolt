// backend/routes/worker.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { Worker, Waccount } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const existingWorker = await Worker.findOne({
        username: req.body.username
    })

    if (existingWorker) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const worker = await Worker.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const workerId = worker._id;

    await Waccount.create({
        workerId
    })

    const token = jwt.sign({
        workerId
    }, JWT_SECRET);

    res.json({
        message: "Worker created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        })
    }

    const worker = await Worker.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (worker) {
        const token = jwt.sign({
            workerId: worker._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await Worker.updateOne(req.body, {
        id: req.workerId
    })

    res.json({
        message: "Updated successfully"
    })
})

module.exports = router;