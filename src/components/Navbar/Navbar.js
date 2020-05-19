import React, { Component } from "react";
import classes from "./Navbar.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";


import { getUser } from "../../store/reducer";
import { connect } from "react-redux";



class Navbar extends Component {
    state = {
        hover: false,
    };

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    };

    render() {
        return (
            <div className={classes.Navbar}>
                <div className={classes["Item"]}>
                    <a href="/">
                        <NavigationItem reload link="/" logo name="F O O D S H A L A" />
                    </a>
                </div>
                <div className={classes["Item"]}>
                   
                    {!this.props.user ? (
                          <NavigationItem
                          exact
                          link="/signuprestaurant"
                          name="SIGNUP Restaurant"
                      />
                         
                    ) :  null }

                    
                    {!this.props.user ? (
                           <NavigationItem
                           exact
                           link="/signupUser"
                           name="SIGNUP"
                       />
                         
                    ) :  null }

                    {!this.props.user ? (
                        <NavigationItem
                        exact
                        link="/signin"
                        name="SIGNIN"
                    />
                        
                        
                       
                    ) : this.props.user.accountType === "Customer" ? (
                        <NavigationItem
                            exact
                            link="/myorders"
                            name="My Orders"
                        />
                    ) : (
                        
                            <NavigationItem
                                exact
                                link="/addmenu"
                                name="Add Menu"
                            />
                     
                    )}
                    {this.props.user === null ||
                    this.props.user.accountType === "Customer" ? (
                        <NavigationItem
                            exact
                            link="/cart"
                            name="Cart"
                        />
                    ) : (
                        <NavigationItem
                            exact
                            link="/orders"
                            name="Orders"
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
});

export default connect(mapStateToProps)(Navbar);
