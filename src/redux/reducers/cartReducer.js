import {
    ADD_CART_ITEM_REQUEST, ADD_CART_ITEM_FAILURE, ADD_CART_ITEM_SUCCESS,
    GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS,
    DELETE_CART_ITEM_FAILURE, DELETE_CART_ITEM_SUCCESS, DELETE_CART_ITEM_REQUEST,
    CHECKOUT_FAILURE, CHECKOUT_REQUEST, CHECKOUT_SUCCESS
} from '../actionTypes/cartActionTypes';

const initState = {
    cart: [],
    isFetching: false
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_CART_ITEM_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ADD_CART_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                cart: action.payload
            }
        case ADD_CART_ITEM_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case GET_CART_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case GET_CART_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                cart: action.payload
            }
        case GET_CART_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case DELETE_CART_ITEM_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case DELETE_CART_ITEM_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                cart: state.cart.filter(cartitem => cartitem.Cart_Id !== action.cart_id)
            }
        case DELETE_CART_ITEM_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case CHECKOUT_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                cart: []
            }
        case CHECKOUT_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export default cartReducer