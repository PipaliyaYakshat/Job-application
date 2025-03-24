const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InformationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        , required: true
    },
    ProfileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    CompanyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    JobListingId: {
        type: Schema.Types.ObjectId,
        ref: 'JobListing',
        required: true
    },
    JobApplicationId: {
        type: Schema.Types.ObjectId,
        ref: 'JobApplication',
        required: true
    },
    JobApplicationStatusId: {
        type: Schema.Types.ObjectId,
        ref: 'JobApplicationStatus',
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Information', InformationSchema);