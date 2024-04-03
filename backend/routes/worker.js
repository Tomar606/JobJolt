// backend/routes/worker.js
const express = require('express');const router = express.Router();
const multer = require('multer');
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { Worker, Waccount, Job} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const upload = multer();

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

// profile picture upload

router.post('/pfp', upload.single('pfp'), async (req, res) => {
    try {
        const { workerId } = req.body;
        const worker = await Worker.findById(workerId);

        if (!worker){
            return res.status(404).json({ error: "User not found" })
        }

        if (!req.file) {
            return res.status(400).json({error: "No file uploaded" });
        }

        worker.pfp = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        await worker.save();

        res.json({ message: 'Profile picture uploaded successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
})

router.get('/jobs', async (req, res) => {
    const { page } = req.query;
    const pageSize = 10; // Number of jobs per page
    const skip = (page - 1) * pageSize;
  
    try {
      // Fetch paginated jobs from the database
      const jobs = await Job.find()
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 }); // Assuming jobs are sorted by creation date
  
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;