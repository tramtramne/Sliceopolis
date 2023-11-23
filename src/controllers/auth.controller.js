const authSerivce = require('../services/auth.service');
const { SuccessResponse, CreatedResponse } = require('../common/success.response');

const register = async (req, res, next) => {
    const { fullname, phoneNumber, password, role } = req.body;
    await authSerivce.register({ fullname, phoneNumber, password, role });
    const response = new CreatedResponse({ message: 'Register successfully' });
    return response.send(req, res);
};

const login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const token = await authSerivce.login(phoneNumber, password);
    console.log(token);
    const response = new SuccessResponse({ message: 'Login successfully' });
    return response.send(req, res, (cookies = { token: [token], maxAge: 900000, httpOnly: true }));
};

module.exports = { register, login };
