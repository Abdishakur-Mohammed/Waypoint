import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['wishlist', 'applied', 'interview', 'offer', 'rejected'],
        default: 'wishlist'
    },
    appliedIn: {
        type: String,
        required: true
    },
    locationType: {
        type: String,
        required: true
    },
    salary: {
        type: String
    },
    notes: {
        type: String
    },
    appliedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


}, { timestamps: true })


const Application = mongoose.model("Application", applicationSchema)

export default Application;