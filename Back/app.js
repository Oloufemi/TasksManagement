const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const workRoute = require('./routes/works-routes');

app.use(express.json());
app.use(morgan('tiny'));
app.use('/works', workRoute);

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

module.exports = app;
