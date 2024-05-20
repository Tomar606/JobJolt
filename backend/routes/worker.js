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
const fs = require("fs");


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

router.put('/profile/:workerId', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), async (req, res) => {
  try {
    const { workerId } = req.params;
    const worker = await Worker.findByIdAndUpdate(workerId, req.body, { new: true });

    // Handle file upload for resume if a file is present
    if (req.files && req.files.resume) {
      worker.resume = {
        data: req.files.resume[0].buffer,
        contentType: req.files.resume[0].mimetype
      };
    }

    // Handle file upload for profile picture if a file is present
    if (req.files && req.files.profilePicture) {
      const profilePictureData = req.files.profilePicture[0].buffer.toString('base64'); // Convert buffer to Base64 string
      const profilePictureContentType = req.files.profilePicture[0].mimetype;
      worker.profilePicture = {
        data: profilePictureData,
        contentType: profilePictureContentType
      };
      console.log(worker.profilePicture)
    }

    await worker.save();

    res.json({ message: 'Profile updated successfully', worker });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/profile/:workerId', async (req, res) => {
  try {
    const { workerId } = req.params;
    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Add debug logging
    console.log('Worker found:', worker);

    // Manually create the formatted worker response
    const formattedWorker = worker.toObject();
    if (worker.profilePicture && worker.profilePicture.data) {
      formattedWorker.profilePicture = {
        data: worker.profilePicture.data.toString('base64'),
        contentType: worker.profilePicture.contentType
      };
    }
    if (worker.resume && worker.resume.data) {
      formattedWorker.resume = {
        data: worker.resume.data.toString('base64'),
        contentType: worker.resume.contentType
      };
    }

    // Add debug logging for formatted worker data
    console.log('Formatted worker data:', formattedWorker);

    res.json(formattedWorker);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Internal server error' });
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

  const base64Encode = (buffer) => {
    return Buffer.from(buffer).toString('base64');
  };
    
  

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

  // worker can apply to jobs and acess the jobs he has applied to


  router.post('/apply', async (req, res) => {
    try {
      const { workerId, jobId } = req.body;
  
      // Check if the worker has already applied to this job
      const existingApplication = await AppliedJob.findOne({ workerId });
  
      if (existingApplication) {
        // If the worker has already applied to this job, update the existing document
        existingApplication.jobs.push(jobId);
        await existingApplication.save();
        res.status(200).json({ message: 'Job application updated successfully' });
      } else {
        // If the worker hasn't applied to any job yet, create a new document
        const newApplication = new AppliedJob({
          workerId,
          jobs: [jobId]
        });
        await newApplication.save();
        res.status(201).json({ message: 'Job application created successfully' });
      }
    } catch (error) {
      console.error('Error applying for a job:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/applied-jobs/:workerId', async (req, res) => {
    try {
      const appliedJobs = await AppliedJob.findOne({ workerId: req.params.workerId });
      const jobIds = appliedJobs.jobs;
      const sappliedjobs = await Job.find({ _id: { $in: jobIds}})
      res.json(sappliedjobs);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete("/applied-jobs/:workerId/:jobId", async (req, res) => {
    try {
      const { workerId, jobId } = req.params;
      const appliedJob = await AppliedJob.findOne({ workerId });
      if (!appliedJob) {
        return res.status(404).json({ message: "Applied job not found" });
      }
      const updatedJobs = appliedJob.jobs.filter((id) => id.toString() !== jobId);
      appliedJob.jobs = updatedJobs;
      await appliedJob.save();
      res.json({ message: "Application withdrawn successfully" });
    } catch (error) {
      console.error("Error withdrawing application:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

module.exports = router;