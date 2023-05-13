const BaseUseCase = require("./BaseUseCase");
const GenericResponseEntity = require("../entities/GenericResponseEntity");
const User = require("../models/orm/User");

module.exports = class SampleUseCase extends BaseUseCase {

    async exec(payload, activeUser) {
        const response = new GenericResponseEntity();

        console.log(activeUser)

        try {
            await this.validate(payload, "Get users failed");

            await this.transaction.commit();

            return response.successResponse(
                "Get users success",
                200,
                await User.findAll()
            );
        } catch (e) {
            if (this.transaction) {
                await this.transaction.rollback();
            }

            return response.errorResponse(
                'Ooops something went wrong.',
                500,
                e
            );
        }
    }
}