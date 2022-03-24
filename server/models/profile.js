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
        as: "user",
        foreignKey: {
          name: "id_user",
        },
      });
    }
  }
  profile.init({
    id_user: DataTypes.INTEGER,
    image: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    poscode: DataTypes.INTEGER,
    address: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};