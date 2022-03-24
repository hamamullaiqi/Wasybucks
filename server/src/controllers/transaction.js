const { status } = require("express/lib/response");
const { transaction, order_transaction, order_list,order_topping, product, topping } = require("../../models");



exports.getOrderTransaction = async (req, res) => {
    try {
        
        const { id } = req.params
        

        let dataTransaction = await order_transaction.findAll({
            where: {
                id_user : id,
                
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            },
            include : [

                {
                    model: transaction,
                    as: "transactions",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "password"]
                    }
                },
                {
                    model: order_list,
                    as: "order_lists",
                    include : [
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
                    },
                    

                    ]
                    
                },

            ],

            
           
        
        })

           



            //     let orderList = await order_list.findAll({
            //         where: {
            //             id_user : id,
            //             id : idOrder
            //         },
            //         attributes : {
            //             exclude : ["createdAt", "updatedAt", "id_user", "id_product", "id_topping"]
            //         },
                
            //         include : [ 
            //         // {
            //         //     model: user,
            //         //     as: "buyer",
            //         //     attributes : {
            //         //         exclude : ["createdAt", "updatedAt", "password", "status"]
            //         //     }
            //         // },
            //         {
            //             model: product,
            //             as: "product",
            //             attributes : {
            //                 exclude : ["createdAt", "updatedAt"]
            //             }
            //         },
            //         {
            //             model: topping,
            //             as: "toppings",
            //             throught: {
            //             model: order_topping,
            //             as: "bridge",
            //             attributes: {
            //                 exclude : ["createdAt", "updatedAt"]

            //             }
            //             },
            //             attributes: {
            //             exclude: ["createdAt", "updatedAt",],
            //             },
            //         }
            //     ],
            // })
                



            dataTransaction = JSON.parse(JSON.stringify(dataTransaction));

            dataTransaction = dataTransaction.map((item) => {
            return {
                
                
                   ...item,
                    product: {
                        ...item.order_lists.product,
                        image: process.env.FILE_PATH + item.order_lists.product.image,
                        },

                
                
            };
            });
           

    
       
        // if(dataTransaction == "")
        // return res.status(404).send({
        //     message : "You Dont Have Orders"
        // })
        

        
        res.send({
            status : "success",
            data : {
                dataTransaction,
                
                
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



exports.getTransaction = async (req, res) => {
    
    try {
        
        const { id } = req.params

        let dataTransaction = await transaction.findAll({
            where: {
                id_user : id
                
            },

            include : 
                {
                    model: order_transaction,
                    as: "order_transaction",
                    
                    attributes: {
                        exclude : ["createdAt", "updatedAt"]

                    },
                    include: [
                        {
                            model: order_list,
                            as: "order_lists",
                            
                            attributes: {
                                exclude : ["createdAt", "updatedAt"]
                            },
                            include : [
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
                            },
                            
        
                            ]
                        }
                    ]
                    
                    
                },
            

            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }

        })

        let idTransaction =  dataTransaction.map(item =>{
            console.log(item.id);
            return item.id
       } )

       const transactionList = await order_transaction.findAll({
        where: {
            // id_user : id,
            id_transaction : idTransaction
        },

        attributes : {
            exclude : ["createdAt", "updatedAt"]
        },

    })

    let idOrder =  transactionList.map(item =>{
        console.log(item);
        return item.id_orders
   } )
       


       let orderList = await order_list.findAll({
        where: {
            // id_user : id,
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


            dataTransaction = JSON.parse(JSON.stringify(dataTransaction));
            

            
            dataTransaction = dataTransaction.map((item) => {
                // console.log(item);
                let orderTransataction = item.order_transaction.map(order => {
                    return {
                        ...order,
                        order_lists : {
                            ...order.order_lists,
                            product: {
                                ...order.order_lists.product,
                                image: process.env.FILE_PATH + order.order_lists.product.image,
                                },
                        }
                        
                    };
                    });
                
            return {

                        ...item,
                        attch_transaction: process.env.FILE_PATH + item.attch_transaction,
                        order_transaction : orderTransataction,
                        
                            

                        
                }
            })

        

           

        
        res.send({
            status : "success",
            data : {
                dataTransaction  
                
                // transactionList
                
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


exports.getTransactionUser = async (req, res) => {
    
    try {
        
        const { id } = req.params

        let dataTransaction = await transaction.findAll({
            where: {
                id : id
                
            },

            include : 
                {
                    model: order_transaction,
                    as: "order_transaction",
                    
                    attributes: {
                        exclude : ["createdAt", "updatedAt"]

                    },
                    include: [
                        {
                            model: order_list,
                            as: "order_lists",
                            
                            attributes: {
                                exclude : ["createdAt", "updatedAt"]
                            },
                            include : [
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
                            },
                            
        
                            ]
                        }
                    ]
                    
                    
                },
            

            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }

        })

        let idTransaction =  dataTransaction.map(item =>{
            console.log(item.id);
            return item.id
       } )

       const transactionList = await order_transaction.findAll({
        where: {
            // id_user : id,
            id_transaction : idTransaction
        },

        attributes : {
            exclude : ["createdAt", "updatedAt"]
        },

    })

    let idOrder =  transactionList.map(item =>{
        console.log(item);
        return item.id_orders
   } )
       


       let orderList = await order_list.findAll({
        where: {
            // id_user : id,
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


            dataTransaction = JSON.parse(JSON.stringify(dataTransaction));
            

            
            dataTransaction = dataTransaction.map((item) => {
                // console.log(item);
                let orderTransataction = item.order_transaction.map(order => {
                    return {
                        ...order,
                        order_lists : {
                            ...order.order_lists,
                            product: {
                                ...order.order_lists.product,
                                image: process.env.FILE_PATH + order.order_lists.product.image,
                                },
                        }
                        
                    };
                    });
                
            return {

                        ...item,
                        attch_transaction: process.env.FILE_PATH + item.attch_transaction,
                        order_transaction : orderTransataction,
                        
                            

                        
                }
            })

        

           

        
        res.send({
            status : "success",
            data : {
                dataTransaction  
                
                // transactionList
                
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


exports.getTransactions = async (req, res) => {
    
    try {
        

        let dataTransaction = await transaction.findAll({
            include : 
                {
                    model: order_transaction,
                    as: "order_transaction",
                    
                    attributes: {
                        exclude : ["createdAt", "updatedAt"]

                    },
                    include: [
                        {
                            model: order_list,
                            as: "order_lists",
                            
                            attributes: {
                                exclude : ["createdAt", "updatedAt"]
                            },
                            include : [
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
                            },
                            
        
                            ]
                        }
                    ]
                    
                    
                },
            

            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }

        })

        let idTransaction =  dataTransaction.map(item =>{
            // console.log(item.id);    
            return item.id
       } )

       const transactionList = await order_transaction.findAll({
        where: {
            // id_user : id,
            id_transaction : idTransaction
        },

        attributes : {
            exclude : ["createdAt", "updatedAt"]
        },

    })

    let idOrder =  transactionList.map(item =>{
        // console.log(item);
        return item.id_orders
   } )
       


       let orderList = await order_list.findAll({
        where: {
            // id_user : id,
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


            dataTransaction = JSON.parse(JSON.stringify(dataTransaction));
            

            
            dataTransaction = dataTransaction.map((item) => {
                // console.log(item);
                let orderTransataction = item.order_transaction.map(order => {
                    return {
                        ...order,
                        order_lists : {
                            ...order.order_lists,
                            product: {
                                ...order.order_lists.product,
                                image: process.env.FILE_PATH + order.order_lists.product.image,
                                },
                        }
                        
                    };
                    });
                
            return {

                        ...item,
                        attch_transaction: process.env.FILE_PATH + item.attch_transaction,
                        order_transaction : orderTransataction,
                        
                            

                        
                }
            })

        

           

        
        res.send({
            status : "success",
            data : {
                dataTransaction  
                
                // transactionList
                
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
exports.addTransation = async (req, res) => {

    try {

        const {id} =req.user

        console.log(id);


        let dataCreate = req.body
        
        let newTransaction = await transaction.create({
            ...dataCreate,
            id_user : id,
            attch_transaction : req.file.filename,
            status: "Pending Accept"
 
        }) 

        JSON.parse(dataCreate.id_orders).map(async (item) => {
            

            const idOrder = item
            console.log(item);

            
            const idTransaction = newTransaction.id

             const transactionOrder = await order_transaction.create({
                    id_user : id,
                    id_orders : idOrder,
                    id_transaction : idTransaction, 
                    
                })
  
            
        })
        
            newTransaction = JSON.parse(JSON.stringify(newTransaction))

            newTransaction = {
            ...newTransaction,
            attch_transaction : process.env.FILE_PATH + newTransaction.attch_transaction
        }

     
           
        res.send({
            status: 'success',
            data: {
                
                newTransaction
                
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


exports.updateTransaction= async (req, res) => {
    try {

        const { id } = req.params

        const dataUpdate = {
            status : req.body.status
        }

        const dataTransaction = await transaction.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate
            
        }) 
        
       
        

         

        


        

        res.send({
            status : "success",
            message : `Update product by id: ${id} success`,
            data : {
                dataTransaction
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


