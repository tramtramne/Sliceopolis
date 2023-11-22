const createError = (status = 500, message = 'Something went wrong') => {
    const error = new Error(message);
    error.status = status;

    return error;
};

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;
const GENERIC_ERROR = 500;
const NO_CONTENT = 204;
const PAGE_SIZE = 10;

module.exports = {
    createError,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    CONFLICT,
    NOT_FOUND,
    UNPROCESSABLE,
    GENERIC_ERROR,
    NO_CONTENT,
    PAGE_SIZE,
};
