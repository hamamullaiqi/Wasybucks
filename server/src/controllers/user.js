const {user, profile} = require("../../models")
const path = require('path')
const fs = require("fs")


exports.getUsers = async (req,res) => {
    try {

        const users = await user.findAll({
            
            
            attributes : {
                exclude : ["createdAt", "updatedAt", "password"]
            }
        })

        res.send({
            status:"success",
            data: {
                users,
                
                
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async (req, res) => {
    try {

        const { id } = req.params
        const dataUser = await user.findOne({
            where : {
                id
            },
            
            
            attributes : {
                exclude : ["createdAt", "updatedAt", "password"]
            }
        })

        res.send({
            status: "success",
            message : `User by id : ${id} `,
            dataUser : {
                id : dataUser.id,
                fullname : dataUser.fullname,
                email : dataUser.email,
                profile : dataUser.profile.image,
                
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    
        
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { id } = req.params

        

        const dataUser = await user.findOne({
            where : {
                id
            },
            include : {
                model: profile,
                as: "profile",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "idUser", "id"]
                }
            },
            
        }) 
        
        
        // if(!dataUser)
        // return res.status(404).send({
        //     message : "User Not Found"
        // })

        

        // const replaceFile = (filePath)=> {
        //     //menggabungkan direktori controller , uploads dan nama file Product
            
        //     filePath = path.join(__dirname, "../../uploads", filePath)
        //     fs.unlink( filePath, (err) => console.log(err))
        // }


        // replaceFile(dataUser.profile.image)
        

        const dataUpdate = {
            fullname : req.body.fullname,
            email : req.body.email,
        }

        let updateUser = await user.update(dataUpdate, {
            where: {
                id : id 
            },
            ...dataUpdate
        })


        const dataUpdateProfile ={
            image : req.file.filename,
        }

        
        console.log(id);
        let updateProfileUser = await profile.update(dataUpdateProfile,{
            where : {
                id_user : id
            }, 
            ...dataUpdateProfile
           
        })
        updateProfileUser = JSON.parse(JSON.stringify(updateProfileUser))

        updateProfileUser = {
            ...dataUpdate,
            image : process.env.FILE_PATH + updateProfileUser.image
        }

        res.send({
            status: "success",
            message : `update user by id: ${id} success` 

        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.addUsers = async (req,res) => {
    try {

        const data = req.body
        const dataUser = await user.create(data)

        res.send({
            status:"success",
            message: "Add User success",
            data: {
                dataUser,
                attributes : {
                    exclude : ["createdAt", "updateAt"]
                }
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

exports.deleteUser = async (req,res) => {
    try {
        const { id } = req.params
        await user.destroy({
            where : {
                id
            }
        })

        res.send({
            status:"success",
            message:`Delete user id: ${id} success`,
            data: {
                id
            }
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}