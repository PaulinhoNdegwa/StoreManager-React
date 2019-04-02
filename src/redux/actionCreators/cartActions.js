import {
    ADD_CART_ITEM_REQUEST, ADD_CART_ITEM_FAILURE, ADD_CART_ITEM_SUCCESS,
    GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS,
    DELETE_CART_ITEM_FAILURE, DELETE_CART_ITEM_SUCCESS, DELETE_CART_ITEM_REQUEST,
    CHECKOUT_FAILURE, CHECKOUT_REQUEST, CHECKOUT_SUCCESS
} from '../actionTypes/cartActionTypes';
import { axiosWithToken } from '../../utils/axiosConfig';
import { toast } from 'react-toastify';


export const addCartItemRequest = () => ({
    type: ADD_CART_ITEM_REQUEST,
    isFetching: true
})

export const addCartItemSuccess = (payload) => ({
    type: ADD_CART_ITEM_SUCCESS,
    isFetching: false,
    payload
})
export const addCartItemFailure = () => ({
    type: ADD_CART_ITEM_FAILURE,
    isFetching: false
})

export const getCartRequest = () => ({
    type: GET_CART_REQUEST,
    isFetching: true
})

export const getCartSuccess = (payload) => ({
    type: GET_CART_SUCCESS,
    isFetching: false,
    payload
})
export const getCartFailure = () => ({
    type: GET_CART_FAILURE,
    isFetching: false
})


export const deleteCartItemRequest = () => ({
    type: DELETE_CART_ITEM_REQUEST,
    isFetching: true
})

export const deleteCartItemSuccess = (cart_id) => ({
    type: DELETE_CART_ITEM_SUCCESS,
    isFetching: false,
    cart_id
})
export const deleteCartItemFailure = () => ({
    type: DELETE_CART_ITEM_FAILURE,
    isFetching: false
})

export const checkOutRequest = () => ({
    type: CHECKOUT_REQUEST,
    isFetching: true
})

export const checkOutSuccess = () => ({
    type: CHECKOUT_SUCCESS,
    isFetching: false
})
export const checkOutFailure = () => ({
    type: CHECKOUT_FAILURE,
    isFetching: false
})


export const addCartItem = (cart_item) => dispatch => {
    dispatch(addCartItemRequest())
    axiosWithToken.post("api/v2/sales", cart_item)
        .then(res => {
            if (res.data.status === 201) {
                dispatch(addCartItemSuccess(res.data.Cart))
                toast.success(res.data.message)
            } else {
                dispatch(addCartItemFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(addCartItemFailure())
            toast.error(err.message)
        })
}

export const getCart = () => dispatch => {
    dispatch(getCartRequest())
    axiosWithToken.get("api/v2/cart")
        .then(res => {
            if (res.data.status === 200) {
                dispatch(getCartSuccess(res.data.Cart))
                toast.success(res.data.message)
            } else {
                dispatch(getCartFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(addCartItemFailure())
            toast.error(err.message)
        })
}

export const deleteCartItem = (cart_id) => dispatch => {
    dispatch(deleteCartItemRequest())
    axiosWithToken.delete("api/v2/cart/" + cart_id)
        .then(res => {
            if (res.data.status === 200) {
                dispatch(deleteCartItemSuccess(cart_id))
                toast.success(res.data.message)
            } else {
                dispatch(deleteCartItemFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(deleteCartItemFailure())
            toast.error(err.message)
        })
}


export const checkOut = () => dispatch => {
    dispatch(checkOutRequest())
    axiosWithToken.post("api/v2/cart")
        .then(res => {
            if (res.data.status === 201) {
                dispatch(checkOutSuccess())
                toast.success(res.data.message)
            } else {
                dispatch(checkOutFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(checkOutFailure())
            toast.error(err.message)
        })
}