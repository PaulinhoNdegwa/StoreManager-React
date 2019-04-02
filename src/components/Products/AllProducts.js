import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { getProducts, deleteProduct } from '../../redux/actionCreators/productActions';

export class AllProducts extends Component {
    componentDidMount() {
        this.props.getProducts()
    }

    handleDelete = (product_id) => {
        const { deleteProduct } = this.props
        deleteProduct(product_id)
    }
    render() {
        const { products } = this.props
        const productList = products.map(product => {
            return products ? (
                <Table.Row key={product.product_id}>
                    <Table.Cell>{product.product_name}</Table.Cell>
                    <Table.Cell>{product.product_model}</Table.Cell>
                    <Table.Cell>{product.unit_price}</Table.Cell>
                    <Table.Cell>{product.category}</Table.Cell>
                    <Table.Cell>{product.quantity}</Table.Cell>
                    <Table.Cell>{product.min_quantity}</Table.Cell>
                    <Table.Cell><Button size="small" className="ui red basic button" onClick={() => { this.handleDelete(product.product_id) }}>Delete</Button></Table.Cell>
                </Table.Row>
            ) : (
                    <div>
                        <h3>No products found</h3>
                    </div>
                )
        })
        return (
            <div>
                <Table color="teal" striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Model</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Min Quantity</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {productList}
                    </Table.Body>
                </Table>
            </div>
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
        deleteProduct: (id) => { dispatch(deleteProduct(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
