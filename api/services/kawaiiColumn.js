const columnModel = require('../models/KawaiiColumn');

// Finds all the columns that contain a specified userId
const getColumnsOfUser = query => {
    const { userId } = query;
    const result = columnModel.find({ userId: userId });
    return result;
}

// Create or update an existing column given a userId and position
const updateColumnKawaiis = query => {
    const { userId, position, kawaiisList } = query;
    const result = columnModel.findOneAndUpdate({userId: userId, position: position}, {$set: {kawaiisList: kawaiisList}}, {upsert: true, new: true});
    return result;
}

// Deletes all the columns that contain a specified userId
const deleteColumnsOfUser = query => {
    const { userId } = query;
    const result = columnModel.deleteMany({ userId: userId });
    return result;
}

exports.getColumnsOfUser = getColumnsOfUser;
exports.updateColumnKawaiis = updateColumnKawaiis;
exports.deleteColumnsOfUser = deleteColumnsOfUser;