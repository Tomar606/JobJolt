// backend/routes/worker.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { Hirer, Haccount, Job, Applications, } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { hauthMiddleware } = require("../middleware");

const signupBody = zod.object({
    husername: zod.string(),
    hfirstName: zod.string(),
    hlastName: zod.string(),
    hpassword: zod.string(),
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

    let hfirstName = req.body.hfirstName;
    
    const hirer = await Hirer.create({
        husername: req.body.husername,
        hpassword: req.body.hpassword,
        hfirstName: req.body.hfirstName,
        hlastName: req.body.hlastName,
    })
    const hirerId = hirer._id;

    await Haccount.create({
        hirerId
    })


    const htoken = jwt.sign({
        hirerId
    }, JWT_SECRET);

    res.json({
        message: "Hirer created successfully",
        htoken: htoken,
        hfname: hfirstName
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
        const htoken = jwt.sign({
            hirerId: hirer._id
        }, JWT_SECRET);

        res.json({
            htoken: htoken,
            redirectTo: '/hdashboard',
            hirerId: hirer._id
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    hpassword: zod.string().optional(),
    hfirstName: zod.string().optional(),
    hlastName: zod.string().optional(),
})

router.put("/", hauthMiddleware, async (req, res) => {
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

router.post('/post-job', async (req, res) => {
  
    try {
        const { hirerId, title, description, eligibilityRequirements, salary, experience, jobType, postedDate, company, location } = req.body;

      // Create a new job
      const newJob = new Job({
        hirerId,
        title,
        description,
        eligibilityRequirements,
        salary,
        experience,
        jobType,
        postedDate,
        company,
        location
      });
  
      // Save the job to the database
      await newJob.save();
  
      res.status(201).json(newJob);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/jobs',  async (req, res) => {
    try {
      const jobs = await Job.find({ IdOfHirer: req.hirerId});
      console.log("Jobs found:", jobs);
      res.json(jobs);
      console.log("Fetching jobs for hirerId:", req.hirerId);

    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.post('/applications', async (req, res) => {
    try { 
        const {hirerId, jobId, workerId} = req.body;
        
        const newApplication = new Applications({
            hirerId,
            jobId,
            workerId
        });

        await newApplication.save();

        res.status(201).json(newApplication);
    }catch (error){
        console.error('error accessing applications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/applications', async (req, res) => {
    try {
      const { workerId } = req.body;

  
      const application = await Applications.findOne({ jobId });
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      application.workerIds.push(workerId);
  
      await application.save();
  
      res.json({ message: 'Application updated successfully' });
    } catch (error) {
      console.error('Error updating application:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

module.exports = router; 