'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.order_list, {
        as: "order_lists",
        foreignKey: {
          name: "id_order",
        },
      });

    }
  }
  cart.init({
    id_user: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};