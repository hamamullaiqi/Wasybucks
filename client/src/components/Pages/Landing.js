import  React, { useContext } from "react";
import { Container, Row, Col  } from "react-bootstrap";
import '../css/Landing.css'
import NavPublic from "../Navbar/NavPublic";
import NavUser from "../Navbar/NavUser";
import ProductList from "./ProductList";
import { UserContext } from "../../context/userContext";

 




export default function Landing() {
        
    const [state, dispatch] = useContext(UserContext)

        
    return(
            <>
            {state.isLogin ? <NavUser/> : <NavPublic /> }
            <div className="Landing-Page mb-5 ">
                <Container className=" mb-5">
                    <Row className="">
                        <Col lg={12}  className="position-relative">
                            <img
                                src="./img/bg-jumbotron.png"
                                alt="bg-jumbotron"
                                className="position-absolute top-0 start-0 bg-jumbotron  "
                                width={960}
                                
                            />
                         </Col>
                    </Row>
                    <Row className=" align-items-center p-3 ms-5 mt-3">
                        <Col lg={6} >
                            <div className=" ">
                                <h1 className="title text-white">WAYSBUCKS</h1>
                                <p className="sub-title text-white">Things are changing, but we’re still here for you</p>
                                <p className="text-white">We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available</p>                                        
                                <p className="text-white">Let’s Order...</p>
                                </div>
                        </Col>
                        <Col lg={6} className=""  >
                            <img
                                src="./img/img-jumbotron.png"
                                alt="img-jumbotron"
                                width={450}
                                className=" ms-5"
                            />
                        </Col>
                    </Row>
                </Container>

                <ProductList/>
            </div>

            </>
        )
    
}