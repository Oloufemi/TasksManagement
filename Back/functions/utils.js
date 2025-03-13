function verifyAllWorkPropertiesExist(work) {
    return !!(work?.workTitle && work?.workManager && work?.workType
        && work?.workStatus && work?.workContractID);
}

module.exports = {
    verifyAllWorkPropertiesExist
}
