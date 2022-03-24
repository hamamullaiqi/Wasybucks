import React,{ useContext, } from 'react';
import { UserContext } from '../../context/userContext';

import { Navbar,Nav,Container, Dropdown } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';


const NavAdmin = () => {

    const navigate  = useNavigate()

    const [state, dispatch] = useContext(UserContext)
        

    const handleIncomeTransaction = () => {
        navigate("/income-transaction")
    }

    const handleListItems  = () => {
        navigate("/list-items")
    }

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
        
    }
    
  return (
            
            
                <Navbar expand="lg"className="py-4 mb-5" >
                    <Container fluid className="justify-content-between ms-5 me-5">
                        <Navbar.Brand >
                            <Link to="/income-transaction">
                            
                            
                            <img 
                                src="../img/logo.svg"
                                width="80"
                                height="80"
                                alt="logo"
                            />
                            </Link>
                        </Navbar.Brand>
                        
                        <Nav >

            
                            <Dropdown align="end" id="dropdown-menu-align-end">
                                <Dropdown.Toggle  as={Nav.Link} className='Dropdown-Toggle' >
                                    <img
                                        src="../img/avatar-user.png"
                                        alt="avatar-user"
                                    /> 
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" text-bold text-dark">
                                    <Dropdown.Item >
                                        <Link to="/add-product">
                                            <span>
                                                <img
                                                    src="../img/add-product.svg" 
                                                    alt="add-product"
                                                    width={30}
                                                    height={30}
                                                    className="me-3"
                                                />
                                            </span>Add Product
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item  >
                                        <Link to="/add-topping">
                                            <span>
                                                <img
                                                    src="../img/add-toping.svg" 
                                                    alt="add-toping"
                                                    width={30}
                                                    height={30}
                                                    className="me-3"
                                                />
                                            </span>Add Topping
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />   
                                    <Dropdown.Item onClick={handleListItems}>
                                        {/* <Link to="/list-items"> */}
                                            <span>
                                                <img
                                                    src="../img/add-toping.svg" 
                                                    alt="add-toping"
                                                    width={30}
                                                    height={30}
                                                    className="me-3"
                                                />
                                            </span>List Items
                                        {/* </Link> */}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />    
                                    <Dropdown.Item onClick={handleLogout}>
                                        
                                        <span>
                                            <img
                                                src="../img/logout.svg" 
                                                alt="user-profile"
                                                width={30}
                                                height={30}
                                                className="me-3"
                                            />
                                        </span>Log Out</Dropdown.Item>
                                    
                                </Dropdown.Menu>
                                    
                            </Dropdown>
                                
                        </Nav>
                        </Container >
                </Navbar>
                
            
    )
};

export default NavAdmin;
