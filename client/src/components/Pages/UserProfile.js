import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API } from '../../config/api';
import NavUser from '../Navbar/NavUser';
import { UserContext } from '../../context/userContext';
import CardTransaction from '../elements/CardTransaction';
import ModalEditProfile from '../Modal/ModalEditProfile';

import dummyImage from "../img/dummy-profile.png"

const UserProfile = () => {


    const  { id } = useParams()
    const [state, dispatch] = useContext(UserContext)

    
    
    const [user, setUser] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const [transaction, setTransaction] = useState([])
    // console.log(transaction);


    const [modalEditProfile, setModalEditProfile] = useState(false)
    const [previewProfile, setPriviewProfile] = useState(null);
    const handleClose = () => setModalEditProfile(false);
    const handleShow = () => setModalEditProfile(true);


    
    // console.log(user);

  


    const getProfile = async () => {
        try {

            const response = await API.get(`/profile/${id}`)
            setUserProfile(response.data.data.dataProfile)
            setPriviewProfile(response.data.data.dataProfile.image)
            
            
            
            

        } catch (error) {
            console.log(error);
        }

        
    }

  const handleEditTopping = (id) => { setModalEditProfile(true)}

    

//     

   useEffect(()=>{
    getProfile()
    return () => 
        setUserProfile([])
    
},[])


   const getTransaction = async () => {
    try {

        const response = await API.get(`/transaction/${id}`)
        setTransaction(response.data.data.dataTransaction)
        
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
    getTransaction()
    return () => 
        setTransaction([])
    
},[])


    

  return (

    

    <>
    
        <NavUser />
        <div className='mb-5'>
            <Container>

                <Row>
                    <Col lg={6}>
                        <h4 className='mb-5 text-bold text-red'>My Profile</h4>
                            <Row>
                                
                                        <Col lg={5}>
                                            <img 
                                                src={userProfile.image === "http://localhost:4000/uploads/null" ? dummyImage : userProfile.image}
                                                alt={user.fullname}
                                                style ={{
                                                    width: "12rem",
                                                    height: "12rem",
                                                    objectFit :"cover",
                                                    borderRadius: "8px" 
                                                }}
                                                
                                            />
                                            
                                        </Col >
                                        <Col  >
                                            <div className='mb-5'>
                                                <h5 className='text-bold '>Full Name</h5>
                                                <p> {user.fullname}</p>
                                            </div>
                                            <div className='mb-5'>
                                                <h5 className='text-bold '>Email</h5>
                                                <p>{user.email}</p>
                                            </div>
                                            
                                        </Col>
                                        <Row>
                                            <Col lg={3}>
                                                <Button onClick={() => handleEditTopping()} variant=" light" className="mb-3  btn-red  bg-red"  >Edit Profile</Button>
                                            </Col>
                                        </Row>
                                       
                                            
                                        
                               
                            </Row>
                    
                    </Col>
                    
                    <Col lg={6}>
                        <h4 className='text-bold'>My Transaction</h4>
                        
                      
                           
                        
                            <div>
                                {transaction.length !== 0 ? (
                                    
                                    <>
                                    {transaction.map(transaction => (
                                         <CardTransaction transaction={transaction} key={transaction.id} />
                                    ))}
                                       
                                    </>
                                ) : (<p>Transaction Not Found</p>) }
                                    
           
                            </div>

                       
                        
                       
                    </Col>
                    
                    
                    
                </Row>

            </Container>
        <ModalEditProfile show={modalEditProfile}   onHide={handleClose}  />
        </div>
    
    </>
      
  );
};

export default UserProfile;
