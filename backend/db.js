require('dotenv').config();


const { access } = require('fs');
const mongoose = require('mongoose');
const { array } = require('zod');

const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error: ', err));

const workerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  aboutMe: {
    type: String,
    maxLength: 700,
    trim: true
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  jobTitle: String,
  skills: [String],
  education : {
    type: Array
  },
  experience: {
    type: String
  },
  qualifications: String,
  hobbies: String,
  portfolioLinks: [String],
  languages: {
    type: Array
  },
  resume: {
    data: Buffer,
    contentType: String
  },
  profilePicture: {
    data: Buffer,
    contentType: String
  }
});





const waccountSchema = new mongoose.Schema({
    workerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Worker model
        ref: 'Worker',
        required: true
    }
});

const hirerSchema = new mongoose.Schema({
  husername: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30
  },
  hpassword: {
      type: String,
      required: true,
      minLength: 6
  },
  hfirstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
  hlastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
  gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: null
  },
  dateOfBirth: {
      type: Date,
      default: null
  },
  companyName: {
      type: String,
      trim: true,
      maxLength: 100,
      default: null
  },
  companyLogo: {
      type: String,
      default: null
  }
});

const haccountSchema = new mongoose.Schema({
    hirerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hirer',
        required: true
    }
});

const Waccount = mongoose.model('Waccount', waccountSchema);
const Worker = mongoose.model('Worker', workerSchema);

const Hirer = mongoose.model('Hirer', hirerSchema);
const Haccount = mongoose.model('Haccount', haccountSchema);

const jobSchema = new mongoose.Schema({
  hirerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hirer', required: true },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    eligibilityRequirements: {
      type: Array,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      required: true
    },
    postedDate: {
      type: Date,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  });

  const Job =  mongoose.model("Job", jobSchema)

  const likedJobSchema = new mongoose.Schema({
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    }
  });
  
  const LikedJob = mongoose.model('LikedJob', likedJobSchema);

  const savedJobsSchema = new mongoose.Schema({
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  });
  
  const SavedJobs = mongoose.model("SavedJobs", savedJobsSchema);

  const appliedJobSchema = new mongoose.Schema({
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
      }
    ]
  });
  
  const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);
  
  const applicationsSchema = new mongoose.Schema({
    hirerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hirer',
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker'
    }]
  });
  
  const Applications = mongoose.model('Applications', applicationsSchema);

  const WatchlistSchema = new mongoose.Schema({
    hirer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hirer",
      required: true,
    },
    applicants: [{
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
      },
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      }
    }],
  });
  
  
  const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

  const CTokenSchema=new mongoose.Schema({
    username : {
      type: String
    },
    access_token:{
      type: String
    }
  })

  const CToken= mongoose.model("CTokens", CTokenSchema)

module.exports = {
	Worker,
    Waccount,
    Hirer,
    Haccount,
    Job,
    LikedJob,
    SavedJobs,
    AppliedJob,
    Applications,
    Watchlist,
    CToken
};