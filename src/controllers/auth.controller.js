const authService = require('../services/auth.service');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');
const { BadRequest } = require('../common/error.response');

const register = async (req, res, next) => {
    const { fullname, phoneNumber, password, role } = req.body;
    await authService.register({ fullname, phoneNumber, password, role });
    const response = new CreatedResponse({ message: 'Register successfully' });
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
