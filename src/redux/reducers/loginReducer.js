import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionTypes/loginActiontypes'

const initState = {
    isFetching: false
}

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                loginSuccess: true,
                token: action.token,
                role: action.role
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                loginSuccess: false
            }

        default:
            return state;
    }
}

export default loginReducer