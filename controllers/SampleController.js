const { httpResponse } = require('../helpers/response');
const SampleUseCase = require("../useCases/SampleUseCase");

module.exports = class SampleController {

    constructor(opts) {
        this.sampleUseCase = opts?.sampleUseCase || new SampleUseCase();
    }

    async sample(req, res) {
        httpResponse(await this.sampleUseCase.exec({...req.body, ...req.params}, req.authData), res)
    }
}
