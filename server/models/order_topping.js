'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  order_topping.init({
    id_order_toping: DataTypes.INTEGER,
    id_toppings: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_topping',
  });
  return order_topping;
};