import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import productsReducer from './productsReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer'


const rootReducer = combineReducers({
    loginReducer,
    productsReducer,
    categoryReducer,
    cartReducer
})

export default rootReducer