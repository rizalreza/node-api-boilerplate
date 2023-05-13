module.exports = class ForbiddenException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Forbidden";
        this.data = data;
        this.code = 403;
    }
}
