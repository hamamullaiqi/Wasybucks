const express = require('express')
const { getUsers,  addUsers, deleteUser, getUser, updateUser } = require('../controllers/user')

const { register, login, checkAuth } = require("../controllers/auth")

const router = express.Router()


//middleware

const {auth} = require("../middlewares/auth")
const { getProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/product')
const { uploadFile } = require('../middlewares/uploadFile')

const { getToppings, getTopping, addTopping, updateTopping, deleteTopping } = require('../controllers/topping')
const { getProfiles, getProfile, addProfile } = require('../controllers/profile')

const { getOrderLists, addOrderList, getOrderList, deleteOrderList } = require('../controllers/order_list')
const { addTransation, getOrderTransaction,getTransaction, getTransactions, updateTransaction, getTransactionUser } = require('../controllers/transaction')
const { getCart, deleteCartList } = require('../controllers/cart')
// const { addOrderToppings } = require('../controllers/order_topping')





router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.patch("/user/:id", auth,uploadFile("image"),  updateUser)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)


//auth 
router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth, checkAuth)

//route product
router.get("/products", getProducts)
router.get("/product/:id", auth, getProduct)
router.post("/product", auth, uploadFile("image"), addProduct)
router.delete("/product/:id", auth, deleteProduct)
router.patch("/product/:id", uploadFile("image"), auth, updateProduct)



//route toping
router.get("/toppings", auth, getToppings)
router.get("/topping/:id", auth, getTopping)
router.post("/topping", auth, uploadFile("image"), addTopping)
router.patch("/topping/:id", auth, uploadFile("image"), updateTopping)
router.delete("/topping/:id", auth, deleteTopping)



//route profile

// router.get("/profiles", auth, getProfiles)
router.get("/profile/:id", auth, getProfile)
router.post("/profile/:id", auth, addProfile)



//router transaction
router.get("/transactions", auth, getTransactions)
router.get("/transaction/:id", auth, getTransaction)
router.post("/transaction/:id",  auth,uploadFile("attch_transaction"), addTransation)
router.patch("/transaction/:id", auth, updateTransaction)
router.get("/transaction-user/:id", auth, getTransactionUser)





//router order list
router.get("/order-lists", auth, getOrderLists)
router.get("/order-list/:id", auth, getOrderList )
router.delete("/order-list/:id", auth, deleteOrderList)
router.post("/order-list", auth, addOrderList)

//cart
router.get("/cart/:id", auth, getCart )
router.delete("/cart/:id", auth, deleteCartList)


//order-transaction
router.get("/order-transaction/:id", auth, getOrderTransaction )









module.exports = router