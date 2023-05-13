module.exports = class NotAuthorizedException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Not authorized";
        this.data = data;
        this.code = 401;
    }
}
