'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_transaction.belongsTo(models.user, {
        as: "user_transaction",
        foreignKey: {
          name: "id_user",
        },
      });

      order_transaction.belongsTo(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "id_transaction",
        },
      });

      order_transaction.belongsTo(models.order_list, {
        as: "order_lists",
        foreignKey: {
          name: "id_orders",
        },
      });
    }
  }
  order_transaction.init({
    id_user : DataTypes.INTEGER,
    id_transaction: DataTypes.INTEGER,
    id_orders: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_transaction',
  });
  return order_transaction;
};