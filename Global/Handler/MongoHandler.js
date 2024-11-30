const mongoose = require('mongoose');
const settings = require('../Config/Settings.js');

const connectToMongo = async () => {
    try {
        await mongoose.connect(settings.mongoURI);
        console.log('MongoDB bağlantısı başarılı!');
    } catch (error) {
        console.error('MongoDB bağlantısı başarısız:', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
