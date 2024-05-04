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
    dob: {
      type: String,
      maxLength: 10
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

  const savedJobSchema = new mongoose.Schema({
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
  
  const SavedJob = mongoose.model('SavedJob', savedJobSchema);

  const appliedJobSchema = new mongoose.Schema({
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
  
  const AppliedJob = mongoose.model('AppliedJob', appliedJobSchema);
  
  const applications = new mongoose.Schema({
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
    applicants : {
      type: Array,
      required: true
    }

  });

  const Applications = mongoose.model('Applications', applications)


module.exports = {
	Worker,
    Waccount,
    Hirer,
    Haccount,
    Job,
    LikedJob,
    SavedJob,
    AppliedJob,
    Applications
};