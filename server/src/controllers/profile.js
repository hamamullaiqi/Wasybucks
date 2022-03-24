
const { profile,user } = require("../../models")



exports.getProfiles = async (req, res) => {
    try {

        const dataProfiles = await profile.findAll({
            
            include : {
                model: user,
                as: "user",
                attributes : {
                    exclude : ["createdAt", "updatedAt", "password"]
                }
            },
            
            attributes : {
                exclude : ["createdAt", "updatedAt", ]
            }

            
        }) 
    
        // if(dataProfiles == "") 
        // return res.status(404).send({
        //     message : "Profiles Not Found"
        // })
    
        res.send({
            status : "success",
            dataProfiles
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
        
    }
    
    
}

exports.getProfile = async (req, res) => {
    try {

        const { id } = req.params

        

        let dataProfile = await profile.findOne({
            where :{
                id_user : id
            },
            attributes : {
                exclude : ["createdAt", "updatedAt", "idUser"]
            },

            include : [

                {
                    model: user,
                    as: "user",
                    attributes : {
                        exclude : ["createdAt", "updatedAt", "password"]
                    }
                },
                
               
            ] 
        }) 

        // if(!dataProfile) 
        // return res.status(404).send({
        //     message : "Profile Not Found"
        // })
    
        dataProfile = JSON.parse(JSON.stringify(dataProfile))

        dataProfile = {
            ...dataProfile, image: process.env.FILE_PATH + dataProfile.image }
            
    
        res.send({
            status : "success",
            message : `Profile by id : ${id}`,
            data : {
                dataProfile
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

exports.addProfile = async (req, res) => {

    try {


        
        const data = {
            
            image : req.file.filename
        }

        let dataProfile = await profile.create(data, {
            ...data,
            
            attributes: {
                exclude : ["createAt", "updateAt"]
            }
        }) 
    

        dataProfile = JSON.parse(JSON.stringify(dataProfile))

        dataProfile = {
            
            image : process.env.FILE_PATH + dataProfile.image
        }

        


        if(dataProfile == "") 
        return res.status(404).send({
            message : "Profiles Not Found"
        })
    
        res.status(201).send({
            status : "success",
            message : `Add Profile success`,
            profile : {
                dataProfile
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

