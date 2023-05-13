module.exports = class GenericResponseEntity {

    /**
     * @var {boolean}
     */
    success = false;
    /**
     *
     * @type {string}
     */
    message = null;
    /**
     *
     * @type {string}
     */
    messageTitle = null;
    /**
     * @var {object}
     */
    data = null;
    /**
     * @var {object}
     */
    summary = null;

    statusCode = 400;

    startTime = 0;

    constructor() {
        this.startTime = new Date().getTime();
    }

    toResponse() {
        this.statusCode = this.success ? 200 : (this.statusCode ?? 400);

        return {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            messageTitle: this.messageTitle,
            summary: this.summary,
            data: this.data,
            responseTime: this.startTime
                ? new Date().getTime() - this.startTime + ' ms.'
                : 'unknown',
        };
    }

    errorResponse(message, code, data, _extraData = null, messageTitle = null) {
        const res = new GenericResponseEntity();
        res.success = false;
        res.messageTitle = messageTitle;
        res.message = message;
        res.statusCode = code || 400;

        switch (data?.constructor.name) {
        case 'BadParameterException':
        case 'DuplicateEntityException':
        case 'ExpectationFailedException':
        case 'ForbiddenException':
        case 'NotAuthorizedException':
        case 'NotFoundException':
        case 'PreconditionRequiredException':
            res.message = data?.message;
            res.statusCode = data?.code;
            break;
        default:
            break;
        }

        if (data instanceof Error) {
            console.log(data);
            if (data?.data) {
                res.data = data.data;
            }
        } else {
            res.data = data;
        }

        return res;
    }

    successResponse(message, code, data, messageTitle = null) {
        const res = new GenericResponseEntity();
        res.success = true;
        res.messageTitle = messageTitle;
        res.message = message;
        res.statusCode = code || 200;
        res.data = data;

        return res;
    }
};
