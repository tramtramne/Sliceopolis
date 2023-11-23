const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.log('Error occurred in file:', error.stack.split('\n')[1].trim());
            next(error);
        }
    };
};

module.exports = asyncHandler;
