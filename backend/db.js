const mongoose = require('mongoose');
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

const pfpSchema = new mongoose.Schema({
    pfp: {
        data: Buffer,
        contentType: String
    }
})

const PFP = mongoose.model('pfp', pfpSchema);


module.exports = {
	Worker,
    Waccount,
    Hirer,
    Haccount,
    PFP
};