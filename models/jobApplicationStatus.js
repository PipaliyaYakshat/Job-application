const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobApplicationStatusSchema = new Schema({
    JobApplicationId: {
        type: Schema.Types.ObjectId,
        ref: 'JobApplication',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'hired', 'rejected'],
        required: [true, 'applied, interviewing, hired, rejected']
    },
});

module.exports = mongoose.model('JobApplicationStatus', jobApplicationStatusSchema);