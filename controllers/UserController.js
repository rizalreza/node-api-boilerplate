const { httpResponse } = require('../helpers/response');
const RegisterUseCase = require("../useCases/user/RegisterUseCase");

module.exports = class UserController {

    constructor(opts) {
        this.registerUseCase = opts?.registerUseCase || new RegisterUseCase();
    }

    async register(req, res) {
        httpResponse(await this.registerUseCase.exec({...req.body, ...req.params}, req.authData), res)
    }
}
