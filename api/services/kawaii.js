const Kawaii = require('../models/kawaii');

const getKawaiiList = (query = {}) => {
    const { userId } = query;
    return result = Kawaii.find({ userId: userId });
};

const updateKawaii = (query = {}) => {
    const { userId, position, kawaiiList } = query;
    return Kawaii.findOneAndUpdate({userId: userId, position: position}, {$set: {kawaiiList: kawaiiList}}, {upsert: true, new: true});
};

const deleteKawaii = (query) => {
    const { userId } = query;
    return Kawaii.findOneAndRemove({userId: userId});
};

exports.getKawaiiList = getKawaiiList;
exports.updateKawaii = updateKawaii;
exports.deleteKawaii = deleteKawaii;