const { cart, user, product, topping, order_topping, order_list } = require("../../models")



exports.getCart = async (req, res) => {
    try {
        
        const { id } = req.params

        const dataCart = await cart.findAll({
            where: {
                id_user : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            },
        
    })

           let idOrder =  dataCart.map(item =>{
                return item.id_order
           } )



                let orderList = await order_list.findAll({
                    where: {
                        id_user : id,
                        id : idOrder
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
           

    // orderList = JSON.parse(JSON.stringify(orderList));

    // orderList = orderList.map((item) => {
    //   return {
    //     ...item,
    //     product: {
    //       ...item.product,
    //       image: process.env.FILE_PATH + item.product.image,
    //     },
    //   };
    // });

       
        // if(orderList == "")
        // return res.status(404).send({
        //     message : "You Dont Have Orders"
        // })
        

        
        res.send({
            status : "success",
            data : {
                cart : 
                dataCart,
                orderList
                
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

exports.deleteCartList = async (req, res) => {

    try {

        let { id }  = req.params
        
        JSON.parse(id).map(async (item) => {


            const idItem = item
            // console.log(item);
            
            await cart.destroy({
                where: {
                    id_order : idItem
                }
            })


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

