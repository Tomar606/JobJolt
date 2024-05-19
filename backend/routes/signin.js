// backend/routes/signin.js
const axios = require('axios')
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { Worker, Hirer, CToken } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const mongoose = require('mongoose');
const { MdOutlineSettingsAccessibility } = require('react-icons/md');


const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: 'Invalid format for email and password'
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

    if (!worker) {
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

    res.status(401).json({
        message: "Incorrect email or password"
    })

});



router.get("/token", async (req, res) => {
    let username = req.header('username');
    try {
        // Check db for existing access_token
        let existingToken = await CToken.findOne({ username: username });
        if (existingToken) {
            return res.json({ access_token: existingToken.access_token });
        }

        // Request token from Weavy environment
        let response = await axios.post(
            `https://ec0233f4681040e6a0e5b1781baf756b.weavy.io/api/users/${username}/tokens`,
            { expires_in: 1577847600 },
            {
                headers: {
                    'Authorization': 'Bearer wys_rAfdZh6veXhf4p10T4l7kSMO0Cc1fn2C4Xio',
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            let data = response.data;
            // Store the new access token in the database
            let newToken = new CToken({
                username: username,
                access_token: data.access_token
            });
            await newToken.save();
            return res.json(data);
        } else {
            return res.status(response.status).json({ message: "Could not get access token from server" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error requesting access token", error: error.message });
    }
});

module.exports = router;
