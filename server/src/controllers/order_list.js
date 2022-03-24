
const { order_list, user, product, topping, order_topping, cart } = require("../../models")



exports.getOrderLists = async (req, res) => {

    try {
        let orderList = await order_list.findAll({

            include : [ 
            {
                model: user,
                as: "buyer",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password", "status"]
                }
            },
            {
                model: product,
                as: "product",
                attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }
            },
            {
                model: topping,
                as: "toppings",
                throught: {
                  model: order_topping,
                  as: "bridge",
                  attributes: {
                    exclude : ["createdAt", "updatedAt"]

                  }
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt", "id",],
                },
            }
        ],

            attributes : {
                exclude : ["createdAt", "updatedAt", "id_user", "id_product", "id_topping"]
            }
        })

        if(orderList == "")
        return res.status(404).send({
            message : "You Dont Have Orders"
        })

        orderList = JSON.parse(JSON.stringify(orderList));

       

        orderList = orderList.map((item) => {
          return {
            ...item,
            product: {
              ...item.product,
              image: process.env.FILE_PATH + item.product.image,
            },
          };
        });
    

         

        
        res.send({
            status : "success",
            data : {
                order : 
                orderList,
                
            },
            
           
        })
        
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
exports.getOrderList = async (req, res) => {
    try {
        
        const { id } = req.params

        let orderList = await order_list.findAll({
            where: {
                id_user : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt", "id_user", "id_product", "id_topping"]
            },
        
            include : [ 
            // {
            //     model: user,
            //     as: "buyer",
            //     attributes : {
            //         exclude : ["createdAt", "updatedAt", "password", "status"]
            //     }
            // },
            {
                model: product,
                as: "product",
                attributes : {
                    exclude : ["createdAt", "updatedAt"]
                }
            },
            {
                model: topping,
                as: "toppings",
                throught: {
                  model: order_topping,
                  as: "bridge",
                  attributes: {
                    exclude : ["createdAt", "updatedAt"]

                  }
                },
                attributes: {
                  exclude: ["createdAt", "updatedAt",],
                },
            }
        ],
    })
           



    orderList = JSON.parse(JSON.stringify(orderList));

    orderList = orderList.map((item) => {
      return {
        ...item,
        product: {
          ...item.product,
          image: process.env.FILE_PATH + item.product.image,
        },
      };
    });

       
        // if(orderList == "")
        // return res.status(404).send({
        //     message : "You Dont Have Orders"
        // })
        

        
        res.send({
            status : "success",
            data : {
                order : 
                orderList,
                
            },
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
exports.addOrderList = async (req, res) => {

    try {

        const {id} = req.user

        let dataCreate = req.body
        
        console.log(dataCreate);

        

        let newOrderList = await order_list.create({
            ...dataCreate,
            
        }) 

        
            dataCreate.id_toppings.map(async (item) => {
                console.log(item);
                const idTopping = item
                const idOrder = newOrderList.id

                const toppingOrder = await order_topping.create({
                        id_order_toping : idOrder, 
                        id_toppings : idTopping
                        
                    })
            })

        const idOrder = newOrderList.id

        let dataCart = await cart.create({
            id_user : id,
            id_order: idOrder
        })

        res.send({
            status: 'success',
            data: {
                
                newOrderList,
                
            }
      
          })

        
      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
        
}

exports.deleteOrderList = async (req, res) => {

    try {

        let { id } = req.params
        
       await order_list.destroy({
           where: {
               id
           }
       })

        

       

        res.send({
            status: 'success',
            message : 'Delete success'
      
          })

        
      
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
        
}

