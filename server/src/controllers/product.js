const { product } = require("../../models")
const path = require("path")
const fs = require("fs")
const { error } = require("console")

exports.getProducts = async (req, res) => {
    try {
        let dataProducts = await product.findAll({
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })

        if(dataProducts == "")
        return res.status(404).send({
            message : "Product Not Found"
        })

        dataProducts = JSON.parse(JSON.stringify(dataProducts))

        dataProducts = dataProducts.map((item) => {
            return {...item, image: process.env.FILE_PATH + item.image }
        })

        res.send({
            status : "success",
            data : {
                products : 
                    dataProducts,
                
            },
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getProduct = async (req, res) => {
    try {

        const { id } = req.params
        let dataProduct = await product.findOne({
            where : {
                id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt"]
            }
        })

        dataProduct = JSON.parse(JSON.stringify(dataProduct))

        dataProduct = {
            ...dataProduct, 
            image: process.env.FILE_PATH + dataProduct.image }
        

        res.send({
            status : "success",
            message : `Product by id : ${id} `,
            data : {
                product : 
                    dataProduct,
                
            },
            
           
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addProduct = async (req, res) => {

    try {

        const dataCreate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }

         

        let newProduct = await product.create(dataCreate,{ 
            ...dataCreate
        }) 

        newProduct = JSON.parse(JSON.stringify(newProduct))

        newProduct = {
            title : req.body.title,
            price : req.body.price,
            image : process.env.FILE_PATH + newProduct.image
        }

        

        res.send({
            status: 'success',
            data: {
                
                newProduct
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

exports.updateProduct= async (req, res) => {
    try {

        const { id } = req.params

        const dataProduct = await product.findOne({
            where : {
                id : id
            },
            
        }) 
        // if(!dataProduct)
        // return res.status(404).send({
        //     message : "Product Not Found"
        // })

        const replaceFile = (filePath)=> {
            //menggabungkan direktori controller , uploads dan nama file Product
            
            filePath = path.join(__dirname, "../../uploads", filePath)
            fs.unlink( filePath, (err) => console.log(err))
        }


        replaceFile(dataProduct.image)

        const dataUpdate = {
            title : req.body.title,
            price : req.body.price,
            image : req.file.filename
        }
        

         let updateProduct = await product.update(dataUpdate, {
            where : {
                id
            },
            ...dataUpdate,
            
        })

        updateProduct = JSON.parse(JSON.stringify(updateProduct))

        updateProduct = {
            ...dataUpdate,
            image : process.env.FILE_PATH + updateProduct.image
        }


        const data = await product.findOne({
            where : {
                id
            },
            
            attributes : {
                exclude : ["updatedAt", "createdAt"]
            }
            
        }) 

        res.send({
            status : "success",
            message : `Update product by id: ${id} success`,
            data : {
                product : data
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

exports.deleteProduct = async (req, res) => {

    try {
        const { id } = req.params
        const data = await product.findOne({
            where : {
                id
            },
            
        }) 
        // if(!data)
        // return res.status(404).send({
        //     message : "Product Not Found"
        // })

        const removeImage = (filePath)=> {
            //menggabungkan direktori controller , uploads dan nama file product
            
            filePath = path.join(__dirname, "../../uploads", filePath)
            fs.unlink(filePath, err => console.log(err))
        }


        removeImage(data.image)

        const deleteData = await product.destroy({
            where : {
                id,
                
            },
            
        })
        
       

        res.send({
            status : "seccess",
            message : `Delete Product by id : ${id}`,
            data : {
                id : data.id
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
