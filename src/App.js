import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AdminProducts from './components/Products/AdminProducts';
import StoreHome from './components/Products/StoreHome'
import { Container } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Category from './components/Categories/Category'
import { Divider } from 'semantic-ui-react';
import "./index.css"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Container className="main-container">
                    <div className="App" id="app-root">
                        <ToastContainer position="top-center" autoClose={2000} />
                        <Navbar />
                        <Divider />
                        <div className="app">
                            <Switch>
                                <Route exact path="/" component={StoreHome} />
                                <Route exact path="/admin_products" component={AdminProducts} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/category" component={Category} />
                            </Switch>
                        </div>
                    </div>
                </Container>
            </BrowserRouter>
        );
    }
}

export default App;
