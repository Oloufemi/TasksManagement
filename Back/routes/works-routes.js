const express = require('express');
const workRoute = express.Router();
const { getWorkList, createWork,updateWork, workSuppression } = require('../controllers/works-controllers');

workRoute.get('', getWorkList);
workRoute.post('', createWork);
workRoute.put('/:contractID', updateWork);
workRoute.delete('/:contractID', workSuppression);

module.exports = workRoute;
