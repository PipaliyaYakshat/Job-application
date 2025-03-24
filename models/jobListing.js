const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobListingSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        enum: ['backend-developer', 'fortnite-developer-part-time', 'flutter-developer', 'web-designer'],
        required: [true, 'backend-developer, fortnite-developer-part-time, flutter-developer, or web-designer.']
    },
    location: {
        type: String,
        required: true
    },
    salaryRange: {
        type: String
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'freelance'],
        required: [true, 'full-time, part-time, contract, freelance']
    }
});

module.exports = mongoose.model('JobListing', jobListingSchema);
