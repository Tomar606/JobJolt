// backend/routes/worker.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { Hirer } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
})

router.post("/hsignup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const existingHirer = await Hirer.findOne({
        husername: req.body.husername
    })

    if (existingHirer) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const hirer = await Hirer.create({
        husername: req.body.husername,
        hpassword: req.body.hpassword,
        hfirstName: req.body.hfirstName,
        hlastName: req.body.hlastName,
    })
    const hirerId = hirer._id;

    const token = jwt.sign({
        hirerId
    }, JWT_SECRET);

    res.json({
        message: "Hirer created successfully",
        token: token
    })
})

const signinBody = zod.object({
    husername: zod.string().email(),
    hpassword: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        })
    }

    const hirer = await Hirer.findOne({
        husername: req.body.husername,
        hpassword: req.body.hpassword
    });

    if (hirer) {
        const token = jwt.sign({
            hirerId: worker._id
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
    hpassword: zod.string().optional(),
    hfirstname: zod.string().optional(),
    hlastname: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await Hirer.updateOne(req.body, {
        id: req.hirerId
    })

    res.json({
        message: "Updated successfully"
    })
})

module.exports = router;