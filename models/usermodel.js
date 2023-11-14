'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	clerkUserId: {
		type: String,
		required: true,
		unique: true,
	},
	emailAddress: {
		type: String,
		required: false,
		unique: true,
	},
	allergies: {
		type: [String], // Array of strings to store allergies
		required: false, // Set to true if it's mandatory
		default: [], // Default empty array if no allergies are specified
	},
	diets: {
		type: [String], // Array of strings to store diet preferences
		required: false, // Set to true if it's mandatory
		default: [], // Default empty array if no diets are specified
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
