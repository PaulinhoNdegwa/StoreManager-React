import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actionTypes/loginActiontypes';
import { axiosDefault } from '../../utils/axiosConfig';
import { toast } from 'react-toastify';

export const loginRequest = () => ({
    type: LOGIN_REQUEST
})

export const loginSuccess = (token, role) => ({
    type: LOGIN_SUCCESS,
    token,
    role
})

export const loginFailure = () => ({
    type: LOGIN_FAILURE
})

export const login = (login_details) => dispatch => {
    dispatch(loginRequest())
    axiosDefault.post("api/v2/auth/login", login_details)
        .then(res => {
            if (res.data.status === 200) {
                dispatch(loginSuccess(res.data.token, res.data.role))
                toast.success("Successful, Welcome")
            }
            else {
                dispatch(loginFailure())
                toast.error(res.data.message)
            }
        })
        .catch(err => {
            dispatch(loginFailure())
            toast.error("Error when logging in")
        })
}