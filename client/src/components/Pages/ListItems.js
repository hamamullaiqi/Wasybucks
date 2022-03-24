
import { Button, Container, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from "react-router-dom"
import ModalDelete from '../Modal/ModalDelete';


import { API } from '../../config/api'
import NavAdmin from '../Navbar/NavAdmin';
const convertRupiah = require('rupiah-format')




const ListItems = () => {

  const navigate = useNavigate()


    //product
    const [modalDeleteProduct, setModalDeleteProduct] = useState(false)
    const [idDelete, setIdDelete] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const handleClose = () => setModalDeleteProduct(false);
    const handleShow = () => setModalDeleteProduct(true);


    //topping
    const [modalDeleteTopping, setModalDeleteTopping] = useState(false)
    const [idDeleteTopping, setIdDeleteTopping] = useState(null);
    const [deleteTopping, setDeleteTopping] = useState(null);
    const handleCloseModalTopping = () => setModalDeleteTopping(false);
    const handleShowModalTopping = () => setModalDeleteTopping(true);


  const [products, setProducts] = useState([])
  const [toppings, setToppings] = useState([])


  const handleAddProduct = () =>{
    navigate("/add-product")
  }

  const handleAddTopping = () =>{
    navigate("/add-topping")
  }

  const handleEditProduct = (id) => { navigate(`/edit-product/${id}`)}

  const handleEditTopping = (id) => { navigate(`/edit-topping/${id}`)}

  const getProduct = async () => {
    try {

        const response = await API.get(`/products`)

        setProducts(response.data.data.products)
        console.log(response.data.data.products)
        
        
    } catch (error) {
        console.log(error)
    }
}

const getToppings = async () => {
  try {

      const response = await API.get("/toppings")

      setToppings(response.data.data.topping)
      console.log(response.data)
     
      
  } catch (error) {
      console.log(error)
  }
}

useEffect(() => {
  
  getToppings()
  return getProduct()
  
},[])


//product

const handleDeleteProducts = (id) => {
  console.log(id);
  setIdDelete(id)
  handleShow()
}
const deleteProductById = async (id) => {
  try {
      await API.delete(`/product/${id}`)
      getProduct()
      
      
  } catch (error) {
      console.log();
  }
}
useEffect(() => {

  
  if (deleteProduct) {

    handleClose();

    deleteProductById(idDelete);
    setDeleteProduct(null);
    
  }
}, [deleteProduct]);


//topping
const handleDeleteTopping = (id) => {
  console.log(id);
  setIdDeleteTopping(id)
  handleShowModalTopping()
}
const deleteToppingById = async (id) => {
  try {
      await API.delete(`/topping/${id}`)
      getToppings()
      
      
  } catch (error) {
      console.log();
  }
}
useEffect(() => {

  
  if (deleteTopping) {

    handleCloseModalTopping();

    deleteToppingById(idDeleteTopping);
    setDeleteTopping(null);
    
  }
}, [deleteTopping]);

  return (
    <>
    
      <NavAdmin />
      <div className='ListItems mb-5'>

        <Container>
            


            <h3 className='text-bold text-red mb-5'>Products List</h3>
            
            <Button variant=" light" className="mb-3  btn-red  bg-red" onClick={handleAddProduct} >Add Product</Button>
            <Table  bordered  >
                <thead  className='bg-red text-bold text-center '>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name Product</th>
                        <th >Price </th>
                        <th >Action </th>
                    </tr>
                </thead>
                {products.length !== 0 ? (
                  <>
                  {products.map((item, index) => (
                    <tbody className='bg-light'>
                    <tr>
                        <td>{index+1}</td>
                        <td>
                          <img 
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: "5rem",
                              height: "5rem",
                              objectFit: "cover"
                            }}
                          />
                          
                          
                        
                        </td>
                        <td>{item.title}</td>
                        <td >{convertRupiah.convert(item.price)} </td>
                      
                        <td className='d-flex justify-content-center'>
                            
                          <Button variant="warning me-3" onClick={() => handleEditProduct(item.id)}>Edit</Button>
 
                          <Button variant="danger" onClick={() => handleDeleteProducts(item.id)}>delete</Button>
                          
                        </td>

                      

                    </tr>
                </tbody>
                  ) )}
                  </>
                ) : ( <tbody>
                  <tr>
                      <td>1</td>
                      <td>Data Kosong</td>
                      <td>Data Kosong</td>
                      <td >Data Kosong</td>
                      <td >Data Kosong</td>
                  </tr>
              </tbody>)}
              
            </Table>

            <h3 className='text-bold text-red mt-5 mb-5'>Toppings List</h3>
            
            <Button variant=" light" className="mb-3  btn-red  bg-red " onClick={handleAddTopping} >Add Toppings</Button>
            <Table  bordered  >
                <thead  className='bg-red text-bold text-center '>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name Product</th>
                        <th >Price </th>
                        <th >Action </th>
                    </tr>
                </thead>
                {toppings.length !== 0 ? (
                  <>
                  {toppings.map((item, index) => (
                    <tbody className='bg-light'>
                    <tr>
                        <td>{index+1}</td>
                        <td>
                          <img 
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: "5rem",
                              height: "5rem",
                              objectFit: "cover"
                            }}
                          />
                          
                          
                        
                        </td>
                        <td>{item.title}</td>
                        <td >{convertRupiah.convert(item.price)} </td>
                      
                        <td className='d-flex justify-content-center'>

                          <Button variant="warning me-3" onClick={() => handleEditTopping(item.id)}  >Edit</Button>
                          <Button variant="danger" onClick={() => handleDeleteTopping(item.id)} >delete</Button>
                          
                        </td>

                      

                    </tr>
                </tbody>
                  ) )}
                  </>
                ) : ( <tbody>
                  <tr>
                      <td>1</td>
                      <td>Data Kosong</td>
                      <td>Data Kosong</td>
                      <td >Data Kosong</td>
                      <td >Data Kosong</td>
                  </tr>
              </tbody>)}
              
            </Table>


        </Container>
        <ModalDelete show={modalDeleteProduct} setDeleteOrder={setDeleteProduct} handleClose={handleClose}/>
        <ModalDelete show={modalDeleteTopping} setDeleteOrder={setDeleteTopping} handleClose={handleCloseModalTopping}/>




      </div>

    </>
   
  )
}

export default ListItems