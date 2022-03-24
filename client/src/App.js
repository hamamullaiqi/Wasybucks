import React, { useContext, useEffect } from 'react';
// import Header from './components/Navbar/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/css/Style.css'
import Landing from './components/Pages/Landing';
import DetailProduct from './components/Pages/DetailProduct';
import CartPage from './components/Pages/CartPage';
import AddProduct from './components/Pages/AddProduct';
import AddToping from './components/Pages/AddToping';
import IncomeTransaction from './components/Pages/IncomeTransaction';
import UserProfile from './components/Pages/UserProfile';
import { BrowserRouter as Router,Navigate,Route, Routes, useNavigate } from "react-router-dom";
import PrivateRouteAdmin from './components/Route/PrivateRouteAdmin';
import PrivateRouteUser from './components/Route/PrivateRouteUser';
import NotFound from './components/Pages/NotFound'
import { UserContext } from './context/userContext';
import ListItems from './components/Pages/ListItems';
import UpdateProduct from './components/Pages/UpdateProduct';
import UpdateTopping from './components/Pages/UpdateTopping';









//api

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);

  
  
  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    
    if (!state.isLogin && !state.isAdminLogin) {
        return navigate("/landing")
    } else {
      if (state.user.status === "admin") {
        return navigate("/income-transaction")

      } else if (state.user.status === "customer") {
        return navigate("/landing")

      }
    }
  }, [state]);
  

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
  
      
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      // console.log(response);
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
      
      
      // Send data to useContext

      

          if(response.data.data.user.status === "admin") {
              dispatch({
                  type: "ADMIN_SUCCESS",
                  payload,
                  });
                
          }  
          if(response.data.data.user.status === "customer") {
              dispatch({
                  type: "USER_SUCCESS",
                  payload,
                });
          }
    
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);

  return (
        
        <Routes>
            {/* Public Route */}
          
          
          

          {/* User Route */}
          {/* <Route exact path='/' element={<PrivateRouteUser />} > */}
            <Route exact path='/landing' element={<Landing />} />
            <Route exact path='/user-profile/:id' element={<UserProfile />} />
            <Route exact path='/cart-page/:id' element={<CartPage />} />
            <Route exact path='/detail-product/:id' element={<DetailProduct />} />
            
          {/* </Route> */}


          {/* Admin Route */}
          {/* <Route exact path='/' element={<PrivateRouteAdmin />} > */}
            <Route exact path='/add-product' element={<AddProduct />} />
            <Route exact path='/edit-product/:id' element={<UpdateProduct />} />

            <Route exact path='/add-topping' element={<AddToping />} />
            <Route exact path='/edit-topping/:id' element={<UpdateTopping />} />

            <Route exact path='/income-transaction' element={<IncomeTransaction />} />
            <Route exact path='/list-items' element={<ListItems />} />
            <Route exact path='' element={<NotFound />} /> 
          {/* </Route> */}
          
          <Route exact path='*' element={<NotFound />} /> 

        </Routes>
      


      
      
      
  );
}

export default App;
