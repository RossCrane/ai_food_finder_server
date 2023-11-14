'use strict';

require('dotenv').config();
//console.log(process.env.CLERK_SECRET_KEY);
const express = require('express');
const { Client } = require('@clerk/clerk-sdk-node');
const connectDB = require('./models/index');
const router = require('./router');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

port = process.env.PORT || 80;

const corsOptions = {
	origin: 'https://ai-food-finder-client.vercel.app', // Replace with your frontend's actual origin
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));

const clerk = new Client(process.env.CLERK_SECRET_KEY);

app.use(router);

app.listen(port, () => {
	// console.log(`Server running at http://localhost:${port}`);
});
