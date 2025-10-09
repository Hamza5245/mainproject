const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        allowNull: true,
    },
    lastName: {
        type: String,
        allowNull: true,
    },
    token: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: true,
    },
    countryCode: {
        type: String,
        allowNull: true,
    },
    password: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    address: {
        type: String,
        allowNull: true,
    },
    officeAddress: {
        type: String,
        allowNull: true,
    },
    dob: {
        type: String,
        allowNull: true,
    },
    country: {
        type: String,
        allowNull: true,
    },
    city: {
        type: String,
        allowNull: true,
    },
    lat: {
        type: String,
        allowNull: true,
    },
    lng: {
        type: String,
        allowNull: true,
    },
    officeLat: {
        type: String,
        allowNull: true,
    },
    officeLng: {
        type: String,
        allowNull: true,
    },
    block: {
        type: Boolean,
        allowNull: true,
    },
    verify: {
        type: Boolean,
        allowNull: true,
        default: false,
    },
},{timestamps:true});


const User = mongoose.model('User', userSchema);

module.exports = User;
