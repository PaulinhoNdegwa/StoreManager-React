import React, { Component, Fragment } from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
// import Laptop from '../../assets/laptop.jpg';
import NewProduct from './NewProduct';
import AllProducts from './AllProducts'

export class AdminProducts extends Component {

    render() {
        return (
            <Fragment>
                <NewProduct />
                <Divider />
                <AllProducts />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.productsReducer.isFetching,
        allProductsSuccess: state.productsReducer.allProductsSuccess
    }
}

export default connect(mapStateToProps)(AdminProducts)
