'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "id_user",
        },
      });
      user.hasMany(models.transaction, {
        as: "buyer_transaction",
        foreignKey: {
          name: "id_user",
        },
      });

      user.hasMany(models.order_list, {
        as: "buyer_order",
        foreignKey: {
          name: "id_user",
        },
      });

      user.hasMany(models.order_transaction, {
        as: "user_transaction",
        foreignKey: {
          name: "id_user",
        },
      });

      user.belongsToMany(models.order_list, {
        as: "order_cart",
        through:{
          model: "cart",
          as: "bridge"
        },
        foreignKey: {
          name: "id_order",
        },
      });
      
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    status: DataTypes.STRING,

    
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};