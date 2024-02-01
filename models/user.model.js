import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    fullName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    currentAddress: {
        type: String,
    },
    durationAtCurrentAddress: {
        type: String,
    },
    employmentStatus: {
        type: String,
    },
    additionalSavings: {
        type: String,
    },
    
});

const User = mongoose.model("User", userSchema);

export default User
