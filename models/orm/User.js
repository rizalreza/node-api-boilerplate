const { BaseModel, DB, DataTypes } = require('../BaseModel');

class User extends BaseModel {
    static attributes() {
        return {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            full_name: {
                type: DataTypes.STRING,
            },
            nik: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            dob: {
                type: DataTypes.DATE,
            },
            nationality: {
                type: DataTypes.STRING,
            },
            idcard_url: {
                type: DataTypes.STRING,
            },
            selfie_url: {
                type: DataTypes.STRING,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            updated_at: {
                field: "updated_at",
                type: DataTypes.DATE,
            },
        };
    }
}


User.init(User.attributes(), {
    sequelize: DB,
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
