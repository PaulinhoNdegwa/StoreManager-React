import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, Button, Image } from 'semantic-ui-react'
import { getProducts } from '../../redux/actionCreators/productActions';
import { addCartItem } from '../../redux/actionCreators/cartActions'
import Loader from '../Loader/Loader';
import './products.css';
import Laptop from '../../assets/laptop.jpg'

export class StoreHome extends Component {
    componentDidMount() {
        const { getProducts } = this.props
        getProducts()
    }
    render() {
        const { products, isFetching, addCartItem } = this.props
        if (isFetching === true) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }
        const productList = products.map(product => {
            const cart_item = {
                product_name: product.product_name,
                product_model: product.product_model,
                quantity: 1
            }
            return products.length > 0 ? (
                <Card key={product.product_id} className="productcard">
                    <Image size="medium" className="product_image" src={Laptop} />
                    <Card.Content>
                        <Card.Header>{product.product_name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Price: ${product.unit_price}</span>
                        </Card.Meta>
                        <Card.Description>{product.product_model}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button className="ui orange basic button" onClick={() => { addCartItem(cart_item) }}>Add to cart</Button>
                    </Card.Content>
                </Card>
            ) : (
                    null
                )
        })
        return (
            <Fragment>
                <Card.Group>
                    {productList}
                </Card.Group>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => { dispatch(getProducts()) },
        addCartItem: (cart_item) => { dispatch(addCartItem(cart_item)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome)
