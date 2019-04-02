import React, { Component } from 'react';
import { Container, Header, Form, Button } from 'semantic-ui-react';
import { login } from '../../redux/actionCreators/loginActions';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import './login.css';

export class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state)
        this.setState({
            email: '',
            password: ''
        })
    }


    render() {
        const { loginSuccess, token, role } = this.props
        if (loginSuccess === true) {
            localStorage.setItem("token", "Bearer " + token)
            localStorage.setItem('role', role)
            if (role === "admin") {
                window.location.replace("/admin_products")
            } else {
                window.location.replace("/")
            }
        }
        const { isFetching } = this.props
        if (isFetching === true) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }
        return (
            <Container id="login-form">
                <Header>Log in below</Header><br></br>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input type="email" fluid label="Email" onChange={this.handleChange} name="email" />
                    <Form.Input type="password" fluid label="Password" onChange={this.handleChange} name="password" />
                    <Button fluid className="ui green button" type="submit">Login</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.loginReducer.isFetching,
        loginSuccess: state.loginReducer.loginSuccess,
        token: state.loginReducer.token,
        role: state.loginReducer.role
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (login_data) => { dispatch(login(login_data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
