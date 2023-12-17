const authService = require('../services/auth.service');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const { BadRequest } = require('../common/error.response');
const validator = require('../validators');
const register = async (req, res, next) => {
    const { fullname, phoneNumber, password } = req.body;
    const userInput = { fullname, phoneNumber, password };
    const { value, error } = validator.registerValidator(userInput);
    if (error) {
        throw new BadRequest(error);
    }
    await authService.register(value);
    const response = new CreatedResponse({ message: 'Register successfully', metadata: value });
    return response.send(req, res);
};

const login = async (req, res, next) => {
    if (!req.body.phoneNumber || !req.body.password) {
        throw new BadRequest('Missing phone number or password');
    }
    const { phoneNumber, password } = req.body;
    const token = await authService.login(phoneNumber, password);
    const response = new SuccessResponse({ message: 'Login successfully', metadata: { token, ROLE: req.user } });
    return response.send({ req, res, cookies: { token: [token] } });
};
module.exports = { register, login };
