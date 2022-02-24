'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class profile extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            profile.belongsTo(models.user, {
                foreignKey: "userId"
            })
        }
    }
    profile.init({
        userId: DataTypes.INTEGER,
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        education: DataTypes.STRING,
        picture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'profile',
    });
    return profile;
};