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

const corsOptions = {
	origin: 'http://localhost:5173', // Replace with your frontend's actual origin
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
connectDB();

app.use(cors(corsOptions));

const clerk = new Client(process.env.CLERK_SECRET_KEY);

app.use(router);

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
