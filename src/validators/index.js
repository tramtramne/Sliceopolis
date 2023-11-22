const mongoose = require('mongoose');
const { registerValidator } = require('./auth.validator');

function validateID(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
module.exports = {
    validateID,
    registerValidator
};
