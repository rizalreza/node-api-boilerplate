const DB = require('../databases/MySQL')
const {Model, DataTypes, QueryTypes, Op } = require("sequelize");

class BaseModel extends Model {

    async findBy(
        filter = {},
        order = [['id', 'desc']],
        offset = 0,
        limit = 20,
        showAll = false
    ) {
        let options = {
            where: filter,
            order,
        };

        if (!showAll) {
            options = {
                ...options,
                offset,
                limit,
            };
        }

        return await this.findAll(options);
    }

}

module.exports = {
    BaseModel,
    DB,
    Op,
    DataTypes,
    QueryTypes
}
