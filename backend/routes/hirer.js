// backend/routes/worker.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { Hirer, Haccount, Job, Applications, Watchlist, AppliedJob} = require("../db");
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
        hfname: hfirstName,
        hirerId: hirerId
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

router.get('/posted-jobs/:hirerId', async (req, res) => {
    try {
        const hirerId = req.params.hirerId;
        const jobs = await Job.find({ hirerId });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching posted jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  
router.post('/application', async (req, res) => {
    try {
      const { workerId, jobId, hirerId } = req.body;
  
      // Check if the hirer has already applications
      let application = await Applications.findOne({ hirerId, jobId });
  
      if (!application) {
        // If the hirer has no applications for this job, create a new document
        application = new Applications({
          hirerId,
          jobId,
          applicants: [workerId]
        });
        await application.save();
        res.status(201).json({ message: 'Application created successfully' });
      } else {
        // If the hirer has applications for this job, update the existing document
        if (!application.applicants.includes(workerId)) {
          application.applicants.push(workerId);
          await application.save();
          res.status(200).json({ message: 'Application updated successfully' });
        } else {
          res.status(400).json({ error: 'Worker already applied to this job' });
        }
      }
    } catch (error) {
      console.error('Error creating application:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/applications/:jobId', async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const applications = await Applications.findOne({ jobId }).populate('applicants', 'firstName lastName username gender hobbies experience ');
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/watchlist/:hirerId', async (req, res) => {
    const { hirerId } = req.params;
    const { applicantId } = req.body;
  
    try {
      let watchlist = await Watchlist.findOne({ hirer: hirerId });
  
      if (!watchlist) {
        watchlist = new Watchlist({ hirer: hirerId });
      }
  
      // Check if applicant is already in the watchlist
      if (watchlist.applicants.includes(applicantId)) {
        return res.status(400).json({ error: 'Applicant already in watchlist' });
      }
  
      watchlist.applicants.push(applicantId);
      await watchlist.save();
  
      res.status(201).json(watchlist);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
  
  router.get('/watchlist/:hirerId', async (req, res) => {
    const { hirerId } = req.params;
    const applicant = await Watchlist.findOne({hirer:hirerId});

    if (!applicant) {
      return res.status(404).json({message: 'Applicant not found'});
    }
    res.json(applicant.applicants)
  

  });

  // Delete an applicant from the hirer's watchlist
router.delete("/watchlist/:hirerId/:workerId", async (req, res) => {
  try {
    const { hirerId, workerId } = req.params;

    // Remove applicant from hirer's watchlist
    await Watchlist.findOneAndUpdate(
      { hirer: hirerId },
      { $pull: { applicants: workerId } }
    );

    // Remove job application from worker's applied jobs
    await AppliedJob.findOneAndUpdate(
      { workerId : workerId },
      { $pull: { jobs : { hirer: hirerId } } }
    );

    res.status(200).json({ message: "Applicant removed from watchlist" });
  } catch (error) {
    console.error("Error removing applicant from watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/update-profile', async (req, res) => {
  try {
      const { hirerId, gender, dateOfBirth, companyName, companyLogo } = req.body;
      const updatedHirer = await Hirer.findByIdAndUpdate(
          hirerId,
          { gender, dateOfBirth, companyName, companyLogo },
          { new: true, runValidators: true }
      );

      if (!updatedHirer) {
          return res.status(404).json({ message: 'Hirer not found' });
      }

      res.status(200).json(updatedHirer);
  } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
  }
});

router.get('/profile/:hirerId', async (req, res) => {
  try {
    const hirerId = req.params.hirerId;
    const hirer = await Hirer.findById(hirerId);

    if (!hirer) {
      return res.status(404).json({ message: 'Hirer not found' });
    }

    res.json({
      hfirstName: hirer.hfirstName,
      hlastName: hirer.hlastName,
      gender: hirer.gender,
      dateOfBirth : hirer.dateOfBirth,
      companyName: hirer.companyName,
      companyLogo: hirer.companyLogo
    });
  } catch (error) {
    console.error('Error fetching hirer profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  

module.exports = router; 