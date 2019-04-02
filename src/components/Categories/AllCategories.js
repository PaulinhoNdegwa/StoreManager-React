import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, deleteCategory } from '../../redux/actionCreators/categoryActions';
import { Table, Button } from 'semantic-ui-react';
import Loader from '../Loader/Loader';

export class AllCategories extends Component {
    componentDidMount() {
        const { getCategories } = this.props
        getCategories()
    }

    handleDelete = (category_id) => {
        this.props.deleteCategory(category_id)
    }
    render() {
        const { categories, isFetching } = this.props
        if (isFetching === true) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }
        const categoryList = categories.map(category => {
            return categories.length > 0 ? (
                <Table.Row key={category.Category_id}>
                    <Table.Cell>{category.Category_Name}</Table.Cell>
                    <Table.Cell>{category.Description}</Table.Cell>
                    <Table.Cell><Button size="small" className="ui red basic button" onClick={() => { this.handleDelete(category.Category_id) }}>Delete</Button></Table.Cell>
                </Table.Row>
            ) : (
                    null
                )
        })
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {categoryList}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        isFetching: state.categoryReducer.isFetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => { dispatch(getCategories()) },
        deleteCategory: (id) => { dispatch(deleteCategory(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
