const BadParameterException = require('../exceptions/BadParameterException');
const ExpectationFailedException = require('../exceptions/ExpectationFailedException');
const Validator = require('validatorjs');

module.exports = class BaseUseCase {
    constructor(opts, transaction = null) {
        this.transaction = transaction;
    }

    rules() {
        return {};
    }

    validate(payload, errorMessage = 'Bad parameter') {
        const validator = new Validator(payload, this.rules());
        if (validator.check() === false) {
            throw new BadParameterException(
                errorMessage,
                validator.errors.all()
            );
        }
    }

    async exec() {
        throw new ExpectationFailedException('Please contact administrator to solve this error');
    }
}
