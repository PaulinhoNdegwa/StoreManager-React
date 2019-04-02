import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCategory } from '../../redux/actionCreators/categoryActions';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';
import Loader from '../Loader/Loader';

export class CreateCategory extends Component {

    state = {
        modalOpen: false,
        cat_name: '',
        desc: ''
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSave = () => {
        const category_data = {
            cat_name: this.state.cat_name,
            desc: this.state.desc
        }
        this.props.addCategory(category_data)
        this.setState({
            modalOpen: false,
            cat_name: '',
            desc: ''
        })
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
        return (
            <Modal open={this.state.modalOpen} trigger={<Button size="small" onClick={this.handleOpen} className="ui green basic button" onClose={this.handleClose}>
                <Icon name="add circle" />Add New Category</Button>} centered={false} size="tiny">
                <Modal.Header>Create new category</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSave}>
                        <Form.Input label="Category Name" type="text" placeholder="Category name" name="cat_name" onChange={this.handleChange} value={this.state.cat_name} />
                        <Form.TextArea label="Description" placeholder="Category description" name="desc" onChange={this.handleChange} value={this.state.desc} />
                    </Form><br></br>
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" color="green" icon="save" content="Save" onClick={this.handleSave} />
                    <Button type="button" color="red" icon="times" content="Close" onClick={this.handleClose} />
                </Modal.Actions>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isFetching: state.categoryReducer.isFetching,
        categories: state.categoryReducer.categories,
        newCatSuccess: state.categoryReducer.newCatSuccess
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category_data) => { dispatch(addCategory(category_data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory)
