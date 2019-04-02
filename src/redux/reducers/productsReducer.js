import {
    GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS,
    ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS
} from '../actionTypes/productActiontypes';

const initState = {
    products: [],
    isFetching: false
}

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isFetching: false,
                allProductsSuccess: true
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                allProductsSuccess: false
            }
        case ADD_PRODUCT_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: [...state.products, action.payload],
                newPdtSuccess: true
            }
        case ADD_PRODUCT_FAILURE:
            return {
                ...state,
                isFetching: false,
                newPdtSuccess: false
            }
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                products: state.products.filter(product => product.product_id !== action.product_id),
                deletePdtSuccess: true
            }
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                isFetching: false,
                deletePdtSuccess: false
            }
        default:
            return state;
    }
}

export default productsReducer