import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "@/app/screens/CartReducer";


export default configureStore ({
    reducer:{
        cart:CartReducer
    }
})