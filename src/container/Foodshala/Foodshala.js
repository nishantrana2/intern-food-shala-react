import React, { Component } from "react";

import { Route } from "react-router-dom";

import { getUser } from "../../store/reducer";
import { connect } from "react-redux";

import CustomerSignUp from "../../components/Customer/CustomerSignUp";
import ClientSignUp from "../../components/Client/ClientSignUp";
import Navbar from "../../components/Navbar/Navbar";
import SignInForm from "../../components/SignInForm/SignInForm";

import Restaurants from "../../components/Restaurants/Restaurants";
import RestaurantMenu from "../../components/RestaurantMenu/RestaurantMenu";
import Cart from "../../components/Cart/Cart";
import MyOrders from "../../components/My Orders/MyOrders";
import AddMenu from "../../components/AddMenu/AddMenu";

class Foodshala extends Component {
    state = {
        form: "s-in",
        show: false,
        selectedRestaurant: null,
    };

    showModal = (form) => {
        this.setState({ show: true, form });
    };

    popModal = () => {
        this.setState({ show: false });
    };

    menuHandler = (restaurant) => {
        this.setState({ selectedRestaurant: restaurant });
    };

    render() {
        return (
            <React.Fragment>
                <Navbar cancel={this.popModal} showModal={this.showModal} />
                <div
                    style={{
                        padding: "10rem 1rem 1rem 1rem",
                    }}
                >
                    {this.props.user === null ||
                        this.props.user.accountType === "Customer" ? (
                            <Route
                                path="/"
                                exact
                                render={() => (
                                    <Restaurants menuHandler={this.menuHandler} />
                                )}
                            />
                        ) : (
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <RestaurantMenu
                                        {...this.props.history}
                                        restaurant={{
                                            id: this.props.user._id,
                                            name: this.props.user.restaurantName, 
                                        }}
                                        noEdit
                                    />
                                )}
                            />
                        )}
                    <Route
                        exact
                        path="/menu"
                        render={() => (
                            <RestaurantMenu
                                {...this.props.history}
                                restaurant={this.state.selectedRestaurant}
                            />
                        )}
                    />
                    {this.props.user ? (
                        <Route
                            path="/cart"
                            render={() => (
                                <Cart showModal={() => this.showModal("s-in")} />
                            )}

                        />) : <Route
                            path="/cart"
                            render={() => (
                                <h1>Please Sign Up for Order</h1>
                            )}

                        />

                    }

                    <Route path="/myorders" render={() => <MyOrders />} />
                    <Route path="/orders" render={() => <MyOrders />} />
                    <Route path="/signuprestaurant" render={() => <CustomerSignUp />} />
                    <Route path="/signupUser" render={() => <ClientSignUp />} />
                    <Route path="/signin" render={() => <SignInForm />} />
                    <Route path="/addmenu" render={() => <AddMenu />} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
});

export default connect(mapStateToProps)(Foodshala);
