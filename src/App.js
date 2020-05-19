import React, { Component } from "react";

import classes from "./App.module.css";

import Foodshala from "./container/Foodshala/Foodshala";
import { Route } from "react-router-dom";

export default class App extends Component {
    state = {
        explore: false,
        disAppear: false,
    };

    exploreHandler = () => {
        var scope = this;
        this.setState({ disAppear: !this.state.disAppear });
        setTimeout(() => {
            scope.setState({ explore: true });
        }, 300);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user !== prevProps.user) {
            setTimeout(() => {
                this.exploreHandler()
            }, 300);
        }
    }

    render() {
        return (
            <main className={classes.Main}>
                <Route
                    path="/"
                    render={
                        () =>

                            < Foodshala />
                    }
                />
            </main>
        );

    }
}