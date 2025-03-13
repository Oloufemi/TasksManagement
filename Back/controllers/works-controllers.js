const { getAllWorks, addWork,modifyWork,deleteWork } = require('../models/works.model');
const {verifyAllWorkPropertiesExist} = require("../functions/utils");

async function createWork(request, response) {
    const result = await addWork(request.body);
    if (result) {
        return response.status(201).json({ result: result });
    } else {
        return response
            .status(400)
            .json({ error: 'Missing fields or country already exist !!' });
    }
}

async function getWorkList(request, response) {
    const result = await getAllWorks();
    if (result) {
        console.log('RESULT', result);
        response.json(result);
    } else {
        response.status(500).json({});
    }
}

async function updateWork(request, response) {
    console.log('updateWork');
    let contractID = Number(request.params.contractID);
    let workNewValue = request.body;
    const allMandatoryExist = verifyAllWorkPropertiesExist(workNewValue);
    if(contractID && workNewValue && allMandatoryExist){
        const result = await modifyWork(contractID, workNewValue);
        if (result) {
            response.json(result);
        } else {
            response.status(500).json({error:'No Work with the specified ContractID'});
        }
    } else {
        response.status(400).json({error:'Missing parameter ContractID or parameters'})
    }
}

async function workSuppression(request, response) {
    let contractID = Number(request.params.contractID);
    if(contractID){
        const result = await deleteWork(contractID);
        if (result) {
            response.json(result);
        } else {
            response.status(500).json({error:'No Work with the specified ContractID'});
        }
    } else {
        response.status(400).json({error:'Missing parameter ContractID'});
    }
}

module.exports = {
    createWork,
    getWorkList,
    updateWork,
    workSuppression
};
