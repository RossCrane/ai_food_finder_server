'use strict';

const User = require('../models/usermodel');

const API_KEY = process.env.OPENAI_API_KEY;

// This is the controller for the OpenAI API
const getOptions = async (req, res) => {
	res.set('Access-Control-Allow-Origin', process.env.CLIENT_URL);
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		},
		// 'gpt-4-1106-preview', 'gpt-3.5-turbo'
		body: JSON.stringify({
			model: 'gpt-4-1106-preview',
			messages: [{ role: 'user', content: req.body.message }],
			// If you chose this project to refactor and change to typescript, you will need to sign up for the OpenAI API and get your own API key and adjust the tokens if you are using the free version
			max_tokens: 800,
		}),
	};
	try {
		const response = await fetch(
			'https://api.openai.com/v1/chat/completions',
			options
		);
		const data = await response.json();
		res.send(data);
	} catch (e) {
		console.error(e);
		res.status(500).send('error getting options');
	}
};

const updateUserPreferences = async (req, res) => {
	try {
		// console.log('Request Body:', req.body);
		const { clerkUserId, emailAddress, allergies, diets } = req.body;

		// Find the user by Clerk user ID and update their preferences
		const updatedUser = await User.findOneAndUpdate(
			{ clerkUserId: clerkUserId },
			{
				$set: {
					emailAddress: emailAddress,
					allergies: allergies,
					diets: diets,
				},
			},
			{ new: true, upsert: true }
		);

		if (!updatedUser) {
			console.log('User not found');
			return res.status(404).json({ error: 'User not found' });
		}

		// console.log('Updated User:', updatedUser);

		res.json(updatedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getUserPreferences = async (req, res) => {
	try {
		const { clerkUserId } = req.query;
		// console.log('Clerk User ID:', clerkUserId);

		if (!clerkUserId) {
			return res.status(400).json({ error: 'Clerk user ID is required' });
		}

		const user = await User.findOne({ clerkUserId: clerkUserId });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Send back the user's allergies and diets
		res.json({ allergies: user.allergies, diets: user.diets });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getOptions, updateUserPreferences, getUserPreferences };
