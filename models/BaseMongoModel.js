const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const PreconditionRequiredException = require('../exceptions/PreconditionRequiredException');
const dayjs = require('dayjs');

module.exports = class BaseMongoModel {

    connection = null;

    constructor(opts) {
        this.dsn = opts?.dsn;
    }

    async connect() {
        // https://github.com/Automattic/mongoose/blob/master/lib/connectionstate.js
        if (!this.connection || this.connection?.readyState === 0) {
            this.connection = await mongoose.createConnection(this.dsn, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })

            mongoose.set('bufferCommands', false);
            mongoose.set('useFindAndModify', false);

            // you should only see once per request
            // if there is more than one shown on the terminal,
            // then it's indicate wrong implementation
            console.log('Connected to mongodb...')
        }

        return this;
    }

    async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }

    modelName() {
        throw new PreconditionRequiredException('You need to implement modelName function');
    }

    modelAttributes() {
        throw new PreconditionRequiredException('You need to implement modelAttributes function');
    }

    schema() {
        return this.connection.models[this.modelName()]
            ? this.connection.models[this.modelName()]
            : this.connection.model(this.modelName(), new Schema(this.modelAttributes(),
                {
                    strict: false,
                    timestamps: {
                        createdAt: "created_at",
                        updatedAt: "updated_at"
                    }
                }
            ));
    }

    async create(params) {
        await this.connect();

        const schema = this.schema();
        const newData = new schema(params);
        await newData.save();

        return newData;
    }

    async findOne(filter, sort = null) {
        await this.connect();

        let query = this.schema().findOne(filter);
        if (sort) query = query.sort(sort);

        const model = await query;

        return model;
    }

    async findAll(filter = {}, sort = { _id: 1 }, offset = 0, limit = 20) {
        await this.connect();

        const models = await this.schema()
            .find(
                filter,
                null,
                {
                    sort,
                    skip: parseInt(offset, 10),
                    limit: parseInt(limit, 10),
                }
            ).exec()

        return models;
    }

    async count(filter = {}) {
        await this.connect();

        const models = await this.schema().count(filter)

        return models || 0;
    }

    async findOneAndUpdate(filter, params) {
        await this.connect();

        const updatedModel = await this.schema()
            .findOneAndUpdate(filter, {
                $set: params,
            }, { new: true });

        return updatedModel;
    }

    async delete(model) {
        model.deletedAt = dayjs();

        return await this.update(model);
    }
}