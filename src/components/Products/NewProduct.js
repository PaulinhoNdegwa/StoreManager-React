import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addProduct } from '../../redux/actionCreators/productActions';
import { Modal, Button, Form, Dropdown, Icon } from 'semantic-ui-react';
import Loader from '../Loader/Loader';
import { getCategories } from '../../redux/actionCreators/categoryActions';

export class NewProduct extends Component {
    state = {
        modalOpen: false,
        categories: this.props.categories,
        product_name: '',
        model: '',
        category: '',
        product_price: null,
        quantity: null,
        min_quantity: null
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSelect = (e, { value }) => {
        this.setState({
            category: value
        })
    }
    handleSave = () => {
        const product_data = {
            product_name: this.state.product_name,
            model: this.state.model,
            category: this.state.category,
            product_price: this.state.product_price,
            quantity: this.state.quantity,
            min_quantity: this.state.min_quantity
        }
        this.props.addProduct(product_data)
        this.setState({
            modalOpen: false,
            product_name: '',
            model: '',
            category: '',
            product_price: '',
            quantity: null,
            min_quantity: null
        })
    }

    componentDidMount() {
        const { getCategories } = this.props
        getCategories()
    }
    render() {
        const { isFetching } = this.props
        if (isFetching === true) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }
        const categories = this.props.categories.map(category => {
            return {
                key: category.Category_id,
                text: category.Category_Name,
                value: category.Category_Name
            }
        })
        return (
            <Modal open={this.state.modalOpen} trigger={< Button size="tiny" onClick={this.handleOpen} className="ui green basic button" onClose={this.handleClose}>
                <Icon name="add circle" /> Add New Product</ Button>} centered={false} size="tiny" >
                <Modal.Header>Create new product</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSave}>
                        <Form.Input label="Product Name" type="text" placeholder="Product name" name="product_name" onChange={this.handleChange} value={this.state.product_name} />
                        <Form.TextArea label="Model" placeholder="Product model description" name="model" onChange={this.handleChange} value={this.state.model} />
                        <Dropdown fluid search selection label="Category" placeholder="Category" name="category" onChange={this.handleSelect} options={categories} />
                        <Form.Input label="Price" placeholder="Product price" name="product_price" onChange={this.handleChange} />
                        <Form.Input label="Quantity" placeholder="Product quantity" name="quantity" onChange={this.handleChange} />
                        <Form.Input label="Minimum Quantity" placeholder="Minimum Quantity" name="min_quantity" onChange={this.handleChange} />
                    </Form><br></br>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" color="green" icon="save" content="Save" onClick={this.handleSave} />
                    <Button type="button" color="red" icon="times" content="Close" onClick={this.handleClose} />
                </Modal.Actions>
            </Modal >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.productsReducer.isFetching,
        categories: state.categoryReducer.categories,
        newPdtSuccess: state.productsReducer.newPdtSuccess
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product_data) => { dispatch(addProduct(product_data)) },
        getCategories: () => { dispatch(getCategories()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)
