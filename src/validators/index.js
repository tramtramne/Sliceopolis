const mongoose = require('mongoose');
const { ErrorResponse } = require('../common/error.response');
const { registerValidator, editProfileValidator } = require('./auth.validator');

function validateID(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
module.exports = {
    validateID,
    registerValidator,
    editProfileValidator,
};
