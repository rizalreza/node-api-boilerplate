module.exports = class PreconditionRequiredException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Precondition Required";
        this.data = data;
        this.code = 428;
    }
}
