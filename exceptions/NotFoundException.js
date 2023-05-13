module.exports = class NotFoundException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Not found";
        this.data = data;
        this.code = 404;
    }
}
