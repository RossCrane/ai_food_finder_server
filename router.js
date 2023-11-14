'use strict';

const express = require('express');
const router = express.Router();
const Controller = require('./controllers/controller.js');

router.use(express.json());
router.get('/', (req, res) => res.send('hello world'));
router.post('/completions', Controller.getOptions);
router.post('/user/preferences', Controller.updateUserPreferences);
router.get('/user/preferences', Controller.getUserPreferences);

module.exports = router;
