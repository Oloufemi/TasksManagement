const mongoose = require('mongoose').default;

const worksSchema = new mongoose.Schema({
    workTitle: { type: String, required: true },
    workType: { type: String, required: true },
    workManager: { type: String, required: true },
    workContractID: { type: Number, required: true },
    workStatus: { type: String, required: true },
});

module.exports = mongoose.model('work', worksSchema);
