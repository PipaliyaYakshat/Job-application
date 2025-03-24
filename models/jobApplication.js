const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    JobListingId: {
        type: Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true
    },
    resume: {
        type: [String],
        required: true
    },
    coverLetter: {
        type: [String],
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);