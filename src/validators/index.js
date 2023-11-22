const mongoose = require('mongoose');
const { ErrorResponse } = require('../common/error.response');
const validateID = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};
module.exports = {
    validateID,
};