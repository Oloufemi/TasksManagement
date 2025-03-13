const worksMongooseModel = require('./works.mongo');
const {verifyAllWorkPropertiesExist} = require("../functions/utils");

async function getAllWorks() {
    let allWorks;

    try {
        allWorks = await worksMongooseModel.find({}, '-__v -_id');
    } catch (err) {
        allWorks = undefined;
    }
    return allWorks;
}

async function verifyIfWorkExist(contractID) {
    return worksMongooseModel.findOne({
        workContractID: contractID,
    });
}

//Insert a new work in database
async function addWork(workToAdd) {
    let addedWork;
    const allMandatoryExist = verifyAllWorkPropertiesExist(workToAdd);
    if (allMandatoryExist) {
        addedWork = await worksMongooseModel.updateOne(
            {workContractID: workToAdd.workContractID},
            {
                workTitle: workToAdd.workTitle,
                workManager: workToAdd.workManager,
                workType: workToAdd.workType,
                workStatus: workToAdd.workStatus,
                workContractID: workToAdd.workContractID,
            },
            {upsert: true}
        );
    }

    return addedWork;
}

async function modifyWork(contractID, workUpdateValue) {
    const workToModify = await verifyIfWorkExist(contractID);
    let result;
    if (workToModify) {
        result = await worksMongooseModel.findOneAndUpdate(
            {workContractID: workUpdateValue.workContractID},
            {
                workContractID: workUpdateValue.workContractID,
                workType: workUpdateValue.workType,
                workStatus: workUpdateValue.workStatus,
                workManager: workUpdateValue.workManager,
                workTitle: workUpdateValue.workTitle
            }
        );
    }
    return result;
}

async function deleteWork(contractID) {
    const workToDelete = await verifyIfWorkExist(contractID);
    let result;
    if (workToDelete) {
        result = await worksMongooseModel.deleteOne(
            {workContractID: contractID}
        );
    }
    return result;
}

module.exports = {
    getAllWorks,
    addWork,
    modifyWork,
    deleteWork
};
