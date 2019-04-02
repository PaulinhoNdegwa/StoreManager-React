import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Menu, Popup, Button, Icon, Table, Divider, Label, Grid } from 'semantic-ui-react';
import { NavLink, withRouter } from 'react-router-dom';
import { getCart, deleteCartItem, checkOut } from '../../redux/actionCreators/cartActions'
import { toast } from 'react-toastify';

class Navbar extends Component {
    componentDidMount() {
        let role = localStorage.getItem("role")
        if (role === "attendant") {
            this.props.getCart()
        }
    }
    handleDelete = (cart_id) => {
        this.props.deleteCartItem(cart_id)
    }
    handleCheckout = () => {
        this.props.checkoutSale()
    }
    handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        window.location.replace("/login")
    }

    render() {
        const { cart } = this.props
        var total_price = 0;
        const cart_total = cart.length
        const cartList = cart.map(cartitem => {
            total_price = total_price + (cartitem.Total_Price * cartitem.Quantity)
            return cart.length > 0 ? (
                <Table.Row key={cartitem.Cart_Id}>
                    <Table.Cell>{cartitem.Product_Name}</Table.Cell>
                    <Table.Cell>{cartitem.Product_Model}</Table.Cell>
                    <Table.Cell>{cartitem.Quantity}</Table.Cell>
                    <Table.Cell>{cartitem.Total_Price * cartitem.Quantity}</Table.Cell>
                    <Table.Cell><Button size="small" className="ui red basic button" onClick={() => { this.handleDelete(cartitem.Cart_Id) }}>Delete</Button></Table.Cell>
                </Table.Row>
            ) : (
                    null
                )
        })

        const adminLinks = () => {
            return (
                <Menu secondary color="teal">
                    <NavLink to="/admin_products">
                        <Menu.Item
                            name='adminHome'
                        />
                    </NavLink>
                    <NavLink to="/category">
                        <Menu.Item
                            name='category'
                        />
                    </NavLink>
                    <Menu.Menu position='right'>
                        <Menu.Item onClick={this.handleLogout}
                            name='logout'
                        />
                    </Menu.Menu>
                </Menu>
            )
        }

        const attendantLinks = () => {
            return (
                <Menu secondary color="teal">
                    <NavLink to="/">
                        <Menu.Item
                            name='home'
                        />
                    </NavLink>
                    <Menu.Menu position='right'>
                        <Popup
                            trigger={
                                <Menu.Item className="ui orange basic button">
                                    <Icon className="cart arrow down" />Cart
                                <Label color="brown" floating>{cart_total}</Label>
                                </Menu.Item>}
                            content={
                                <Fragment>
                                    <Table size="small" singleLine compact color="orange">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Name</Table.HeaderCell>
                                                <Table.HeaderCell>Model</Table.HeaderCell>
                                                <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                <Table.HeaderCell>Price</Table.HeaderCell>
                                                <Table.HeaderCell></Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {cartList}
                                        </Table.Body>
                                    </Table>
                                    <Divider />
                                    <Grid columns={2}>
                                        <Grid.Column textAlign="left">
                                            <Label as="a" ribbon color="blue">Sum Total: <strong>${total_price}</strong></Label>
                                        </Grid.Column>
                                        <Grid.Column textAlign="center">
                                            <Button size="small" className="ui green basic button" onClick={this.handleCheckout}>CheckOut</Button>
                                        </Grid.Column>
                                    </Grid>
                                </Fragment>}
                            position='bottom center'
                            on="click"
                            hideOnScroll
                            wide
                        />
                        <Menu.Item onClick={this.handleLogout}
                            name='logout'
                        />
                    </Menu.Menu>
                </Menu>
            )
        }
        const role = localStorage.getItem('role')
        if (role === "admin") {
            var links = adminLinks()
        }
        else if (role === "attendant") {
            links = attendantLinks()
        }
        else {
            null
        }
        return (
            <Fragment>
                {links}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        getCart: () => { dispatch(getCart()) },
        checkoutSale: () => { dispatch(checkOut()) },
        deleteCartItem: (cart_id) => { dispatch(deleteCartItem(cart_id)) }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(withRouter(Navbar))