import {
    ADD_CATEGORY_FAILURE, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS,
    GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILURE, DELETE_CATEGORIES_REQUEST, DELETE_CATEGORIES_SUCCESS
} from '../actionTypes/categoryTypes'

const initState = {
    categories: [],
    isFetching: false
}


const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_CATEGORY_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                categories: [...state.categories, action.payload],
                newCatSuccess: true
            }
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                newCatSuccess: false
            }
        case GET_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                categories: action.payload
            }
        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case DELETE_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case DELETE_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
                categories: state.categories.filter(category => category.Category_id !== action.payload)
            }
        case DELETE_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export default categoryReducer