import React, { useState } from 'react';
import { Button,Stack } from 'react-bootstrap';
import ModalLogin from '../Modal/ModalLogin';
import ModalRegister from '../Modal/ModalRegister';
import { Navbar,Nav,Container, Dropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';

export default function NavPublic ()  {

    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false);
    const handleModalLogin = () => setModalLogin(true)
    const handleModalRegister = () => setModalRegister(true)

    const handleSwitchRegister = () => {
        setModalRegister(true)
        return(setModalLogin(false))
     }
     const handleSwitchLogin = () => {
        setModalLogin(true)
        return(setModalRegister(false))
     }
     
    
  return (

                <Navbar expand="lg"className="py-4 mb-5" >
                    <Container fluid className="justify-content-between ms-5 me-5">
                        <Navbar.Brand >
                            <Link to="/landing">
                            
                            
                            <img 
                                src="/img/logo.svg"
                                width="80"
                                height="80"
                                alt="logo"
                            />
                            </Link>
                        </Navbar.Brand>
                        
                        <Nav >

            
                        <Stack direction="horizontal" gap={3} >
                            <Button  onClick={handleModalLogin} className="btn-red px-5 outline-red " variant="light" >Login</Button>
                            
                            <Button  onClick={handleModalRegister}  className="btn-red bg-red px-5" variant="light">Register</Button>
                        </Stack>
                                
                        </Nav>
                        </Container >
               
        
           
                    {modalLogin && <ModalLogin show={modalLogin} onHide={() => setModalLogin(false)} handleSwitchRegister={handleSwitchRegister}  />}
                    {modalRegister && <ModalRegister show={modalRegister} onHide={() => setModalRegister(false)} handleSwitchLogin={handleSwitchLogin} />}
                </Navbar>
    )
};
