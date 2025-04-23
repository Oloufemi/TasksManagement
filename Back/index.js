const http = require('http');
const dotenv = require('dotenv').config();

const app = require('./app');
const connectDB = require('./database/connection');

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

function startServer() {
    connectDB().then(() => {
        console.log('Connect DB execute');
    });
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
