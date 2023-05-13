module.exports = class ExpectationFailedException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Expectation failed";
        this.data = data;
        this.code = 417;
    }
}
