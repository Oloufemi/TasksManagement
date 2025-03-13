const mongoose = require('mongoose').default;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const connectDB = async () => {
    try {
        // mongodb connection
        await mongoose.connect(
            'mongodb+srv://Femi:pinYD4DmCuMIOzvp@clusterzta.cronz.mongodb.net/worksdb?retryWrites=true&w=majority&appName=ClusterZTA'
        );
        console.log('MongoDB connected');
    } catch (err) {
        console.log('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
