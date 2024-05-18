const mongoose = require('mongoose');
const { array } = require('zod');
mongoose.connect("mongodb+srv://Tomar606:Tomar606@jobjolt.udtlr0d.mongodb.net/")


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
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  jobTitle: String,
  skills: [String],
  experience: String,
  qualifications: String,
  hobbies: String,
  portfolioLinks: [String],
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
      type: String, // Assuming you will store a URL to the logo image
      default: null
  }
});

const haccountSchema = new mongoose.Schema({
    hirerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Worker model
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
      ref: 'Worker', // Reference to the Worker model
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to the Job model
      required: true
    }
  });
  
  const LikedJob = mongoose.model('LikedJob', likedJobSchema);

  const savedJobsSchema = new mongoose.Schema({
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker", // Reference to the Worker model
      required: true,
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // Reference to the Job model
      },
    ],
  });
  
  const SavedJobs = mongoose.model("SavedJobs", savedJobsSchema);

  const appliedJobSchema = new mongoose.Schema({
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker', // Reference to the Worker model
      required: true
    },
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
        required: true
      }
    ]
  });
  
  const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);
  
  const applicationsSchema = new mongoose.Schema({
    hirerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hirer', // Reference to the Hirer model
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to the Job model
      required: true
    },
    applicants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker' // Reference to the Worker model
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    }],
  });
  
  const Watchlist = mongoose.model("Watchlist", WatchlistSchema);

  const CTokenSchema = new mongoose.Schema({
    username: {
      type: String,
      trim: true
    },
    access_token: {
      type: String,
      trim: true
    }
  })

  const CToken = mongoose.model("CToken", CTokenSchema);

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