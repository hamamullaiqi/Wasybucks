'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "buyer",
        foreignKey: {
          name: "id_user",
        },
      });

      transaction.hasMany(models.order_transaction, {
        as: "order_transaction",
        foreignKey: {
          name: "id_transaction",
        },
      });

      transaction.belongsToMany(models.order_list, {
        as: "order_lists",
        through:{
          model: "order_transactions",
          as: "bridge"
        },
        foreignKey: {
          name: "id_orders",
        },
      });

      transaction.belongsToMany(models.topping, {
        as: "toppings",
        through:{
          model: "item_topping",
          as: "bridge"
        },
        foreignKey: {
          name: "id_transaction",
        },
      });


     

      
      



    }
  }
  transaction.init({
    id_user: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total_pay: DataTypes.INTEGER,
    attch_transaction: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    poscode: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};