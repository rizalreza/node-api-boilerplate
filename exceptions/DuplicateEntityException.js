module.exports = class DuplicateEntityException extends Error {
    constructor(message, data = null) {
        super(message);
        this.name = "Duplicate entity";
        this.data = data;
        this.code = 409;
    }
}
