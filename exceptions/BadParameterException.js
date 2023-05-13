module.exports = class BadParameterException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Bad parameter";
        this.data = data;
        this.code = 400;
    }
}
