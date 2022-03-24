'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_list.belongsTo(models.user, {
        as: "buyer",
        foreignKey: {
          name: "id_user",
        },
      }); 

      // order_list.hasMany(models.transaction, {
      //   as: "order",
      //   foreignKey: {
      //     name: "id_order",
      //   },
      // });

      order_list.belongsTo(models.product, {
        as: "product",
        foreignKey: {
          name: "id_product",
        },
      });

      order_list.belongsToMany(models.topping, {
        as: "toppings",
        through: {
          model: "order_topping",
          as: "bridge"
        },
        foreignKey: "id_order_toping"

      })

      order_list.belongsToMany(models.transaction, {
        as: "transactions",
        through:{
          model: "order_transactions",
          as: "bridge"
        },
        foreignKey: {
          name: "id_transaction",
        },
      });

      order_list.belongsToMany(models.user, {
        as: "buyer_cart",
        through:{
          model: "cart",
          as: "bridge"
        },
        foreignKey: {
          name: "id_user",
        },
      });

      order_list.hasMany(models.order_transaction, {
        as: "order_lists",
        foreignKey: {
          name: "id_orders",
        },
      });

      

           
    }
  }
  order_list.init({
    id_user: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    id_topping: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    sub_total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};