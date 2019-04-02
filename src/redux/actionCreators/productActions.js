import {
    GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS,
    ADD_PRODUCT_FAILURE, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS
} from '../actionTypes/productActiontypes';
import { axiosWithToken } from '../../utils/axiosConfig';
import { toast } from 'react-toastify';


export const getProductsRequest = () => ({
    type: GET_PRODUCTS_REQUEST,
    isFetching: true
})

export const getProductsSuccess = (payload) => ({
    type: GET_PRODUCTS_SUCCESS,
    isFetching: false,
    payload
})

export const getProductsFailure = () => ({
    type: GET_PRODUCTS_FAILURE,
    isFetching: false
})

export const addProductRequest = () => ({
    type: ADD_PRODUCT_REQUEST,
    isFetching: true
})

export const addProductSuccess = (payload) => ({
    type: ADD_PRODUCT_SUCCESS,
    isFetching: false,
    payload
})

export const addProductsFailure = () => ({
    type: ADD_PRODUCT_FAILURE,
    isFetching: false
})

export const deleteProductRequest = () => ({
    type: DELETE_PRODUCT_REQUEST,
    isFetching: true
})

export const deleteProductSuccess = (product_id) => ({
    type: DELETE_PRODUCT_SUCCESS,
    isFetching: false,
    product_id
})

export const deleteProductFailure = () => ({
    type: DELETE_PRODUCT_FAILURE,
    isFetching: false
})

export const getProducts = () => dispatch => {
    dispatch(getProductsRequest())
    axiosWithToken.get("api/v2/products")
        .then(res => {
            if (res.data.status === 200) {
                dispatch(getProductsSuccess(res.data.Products))
            }
            else {
                dispatch(getProductsFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(getProductsFailure())
            toast.error("Error getting products!")
        })
}

export const addProduct = (product_data) => dispatch => {
    dispatch(addProductRequest())
    axiosWithToken.post("api/v2/products", product_data)
        .then(res => {
            if (res.data.status === 201) {
                dispatch(addProductSuccess(res.data.Product_saved))
                toast.success(res.data.message)
            }
            else {
                dispatch(addProductsFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(addProductsFailure())
            toast.error("Error saving product")
        })
}

export const deleteProduct = (product_id) => dispatch => {
    dispatch(deleteProductRequest())
    axiosWithToken.delete("api/v2/products/" + product_id)
        .then(res => {
            if (res.data.status === 200) {
                dispatch(deleteProductSuccess(product_id))
                toast.success(res.data.message)
            }
            else {
                dispatch(deleteProductFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(deleteProductFailure())
            toast.error("Error deleting product!")
        })
}