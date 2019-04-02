import React, { Component, Fragment } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux'
import AllCategories from './AllCategories'
import CreateCategory from './CreateCategory';

export class Category extends Component {

    render() {
        return (
            <Fragment>
                <CreateCategory />
                <Divider></Divider>
                <Container>
                    <Header>Categories</Header>
                    <AllCategories />
                </Container>
            </Fragment>
        )
    }
}

export default connect()(Category)
