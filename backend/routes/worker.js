// backend/routes/worker.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { Worker, Waccount, Job, LikedJob, AppliedJob, SavedJobs } = require("../db");
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

router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, jobTitle, skills, experience, qualifications, hobbies, portfolioLinks } = req.body;
    let profilePicture;
    if (req.file) {
      profilePicture = req.file.filename; // Get the filename of the uploaded file
    }  
    // Update the worker's profile information
    const updatedProfile = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      jobTitle,
      skills,
      experience,
      qualifications,
      hobbies,
      portfolioLinks,
      profilePicture,
    };

    // Save updated profile information to the database
    const worker = await Worker.findByIdAndUpdate(req.params.workerId, updatedProfile, { new: true });

    res.json({ message: 'Profile updated successfully', worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  

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

  router.get('/profile/:workerId', async (req, res) => {
    try {
      const { workerId } = req.params;
      console.log('Worker ID :', workerId);
      // Fetch profile details from the database based on user's ID
      const worker = await Worker.findById(workerId);
      if (!worker) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Return profile details in the response
      res.json({
        username: worker.username,
        firstName: worker.firstName,
        lastName: worker.lastName,
        dateOfBirth: worker.dob, // Make sure this matches the field name in your schema
        jobTitle: worker.jobTitle,
        skills: worker.skills,
        experience: worker.experience,
        qualifications: worker.qualifications,
        hobbies: worker.hobbies,
        portfolioLinks: worker.portfolioLinks,
        // Add other profile fields here
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.post('/like-job/:jobId', async (req, res) => {
    try {
      // Check if user is authenticated
      if (!req._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const workerId = req.user._id; // Access _id from req.user
      console.log("found!!")
      const { jobId } = req.params;
  
      // Update worker's liked jobs
      await LikedJob.create({ workerId, jobId });
  
      res.json({ message: 'Job liked successfully' });
    } catch (error) {
      console.error('Error liking job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  


  router.get("/saved-jobs/:workerId", async (req, res) => {
    try {
      const savedJobs = await SavedJobs.findOne({ workerId: req.params.workerId });
      const jobIds = savedJobs.savedJobs;
      const sjobs = await Job.find({ _id: { $in: jobIds } });
      res.json(sjobs);
    } catch (error) {
      console.log("error");
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Route to save a job for a worker
  router.post("/saved-jobs", async (req, res) => {
    try {
      const { workerId, jobId } = req.body;
      const savedJobs = await SavedJobs.findOneAndUpdate(
        { workerId },
        { $addToSet: { savedJobs: jobId } }, // Add jobId to the savedJobs array if it's not already present
        { upsert: true, new: true }
      );
      res.json(savedJobs);
    } catch (error) {
      console.error("Error saving job:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/saved-jobs/:workerId/:jobId", async (req, res) => {
    try {
      const { workerId, jobId } = req.params;
      const savedJobs = await SavedJobs.findOne({ workerId });
      if (!savedJobs) {
        return res.status(404).json({ message: "Saved jobs not found" });
      }
      const updatedSavedJobs = savedJobs.savedJobs.filter((id) => id.toString() !== jobId);
      savedJobs.savedJobs = updatedSavedJobs;
      await savedJobs.save();
      res.json({ message: "Job unsaved successfully" });
    } catch (error) {
      console.error("Error unsaving job:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  
  
  

module.exports = router;