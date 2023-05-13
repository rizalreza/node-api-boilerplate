const BaseUseCase = require("../BaseUseCase");
const GenericResponseEntity = require("../../entities/GenericResponseEntity");
const BadParameterException = require("../../exceptions/BadParameterException");
const bcrypt = require('bcrypt');
const User = require("../../models/orm/User");

module.exports = class SampleUseCase extends BaseUseCase {
    constructor(opts, transaction) {
        super(opts, transaction);
        this.user = opts?.user || User;
    }

    rules() {
        return {
            email: 'required|string',
            password: 'required|string',
            full_name: 'required|string',
            nik: 'required|integer',
            phone: 'required|integer',
        };
    }

    async validate(payload, errorMessage = 'Bad parameter') {
        await super.validate(payload, errorMessage);

        const [email, nik, phone] = await Promise.all([
            this.user.findOne({
                where: {
                    email: payload.email
                }
            }),
            this.user.findOne({
                where: {
                    nik: payload.nik
                }
            }),
            this.user.findOne({
                where: {
                    phone: payload.phone
                }
            }),
        ])

        const errorData = {}
        if(email) {
            errorData['email'] = [`The email already used`]
        }
        if(nik) {
            errorData['nik'] = [`The nik already used`]
        }
        if(phone) {
            errorData['phone'] = [`The phone already used`]
        }

        if(Object.keys(errorData).length){
            throw new BadParameterException("Register user failed", errorData);
        }
    }

    async exec(payload) {
        const response = new GenericResponseEntity();

        try {
            await this.validate(payload, "Register user failed");

            payload.password = await this.generatePassword(payload.password);

            await this.user.create(payload);

            return response.successResponse(
                "Register user success",
                200,
                payload
            );
        } catch (e) {
            return response.errorResponse(
                'Ooops something went wrong.',
                500,
                e
            );
        }
    }

    async generatePassword(plainText) {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 10));
        return await bcrypt.hash(plainText.toString(), salt);
    }
}