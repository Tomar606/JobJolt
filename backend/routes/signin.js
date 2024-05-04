// backend/routes/signin.js

const express = require('express');
const router = express.Router();
const zod = require("zod");
const { Worker, Hirer} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/", async (req, res) => {
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
        const wtoken = jwt.sign({
            workerId: worker._id
        }, JWT_SECRET);

        res.json({
            wtoken: wtoken,
            redirectTo: "/dashboard",
            wfname: worker.firstName,
            workerId: worker._id
        })
        return;
    }

    if(!worker) {
        const hirer = await Hirer.findOne({
            husername: req.body.username,
            hpassword: req.body.password
        });

        if (hirer) {
            const htoken = jwt.sign({
                hirerId: hirer._id
            }, JWT_SECRET);

            res.json({
                htoken: htoken,
                redirectTo: "/hdashboard",
                hfname: hirer.hfirstName,
                hirerId: hirer._id
            })
            return;
        }
    };

    res.status(411).json({
        message: "Error while logging in"
    })

});

module.exports = router;