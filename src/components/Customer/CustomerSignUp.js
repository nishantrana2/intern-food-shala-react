import React, { Component } from "react";

import classes from "./CustomerSignUp.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import customerSignUpAction from "../../bloc/auth/customerSignUp";
import {
    getCustomerError,
    getCustomerPending,
    getCustomerSuccess,
} from "../../store/reducer";

import Input from "../Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

class CustomerSignUp extends Component {
    state = {
        primaryDetails: {
            restaurantName: {
                id: "3",
                elementType: "input",
                label: "Restaurant Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            username: {
                id: "4",
                elementType: "input",
                label: "User Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                id: "5",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "password",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            
        },

        formIsValid: false,
        errorText: ""
    };
    checkValid(value, rules) {
        let isValid = false;
        if (rules && rules.required) {
            isValid = value.trim() !== "";
        }
        if (rules && rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength;
        }

        return isValid;
    }

    changeHandler = (event, identifierElement) => {
        const updatedPrimaryDetails = {
            ...this.state.primaryDetails,
        };

        const updatedPrimaryDetailsElement = {
            ...updatedPrimaryDetails[identifierElement],
        };

        updatedPrimaryDetailsElement.value = event.target.value;
        updatedPrimaryDetailsElement.valid = this.checkValid(
            updatedPrimaryDetailsElement.value,
            updatedPrimaryDetailsElement.validation
        );
        updatedPrimaryDetailsElement.touched = true;
        updatedPrimaryDetails[identifierElement] = updatedPrimaryDetailsElement;

        let formIsValid = true;
        for (const item in updatedPrimaryDetails) {
            if (updatedPrimaryDetails[item].tagHandler) {
                formIsValid =
                    updatedPrimaryDetails[item].selected.length > 0 &&
                    formIsValid;
                continue;
            }
            formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
        }

        this.setState({
            primaryDetails: updatedPrimaryDetails,
            formIsValid: formIsValid,
        });
    };

    addItemToCheck = (identifierElement) => {
        if (this.state.primaryDetails[identifierElement].valid) {
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };

            const updatedPrimaryDetailsElement = {
                ...updatedPrimaryDetails[identifierElement],
            };

            updatedPrimaryDetailsElement.selected.push(
                updatedPrimaryDetailsElement.value
            );
            updatedPrimaryDetailsElement.value = "";
            updatedPrimaryDetailsElement.valid = false;
            updatedPrimaryDetailsElement.touched = false;
            updatedPrimaryDetails[
                identifierElement
            ] = updatedPrimaryDetailsElement;
            let formIsValid = true;
            for (const item in updatedPrimaryDetails) {
                if (typeof updatedPrimaryDetails[item] === "string") continue;
                if (updatedPrimaryDetails[item].tagHandler) {
                    formIsValid =
                        updatedPrimaryDetails[item].selected.length > 0 &&
                        formIsValid;
                    continue;
                }
                formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
            }

            this.setState({
                primaryDetails: updatedPrimaryDetails,
                formIsValid: formIsValid,
            });
        }
    };

    removeItemFromCheck = (index, identifierElement) => {
        const updatedPrimaryDetails = {
            ...this.state.primaryDetails,
        };

        const updatedPrimaryDetailsElement = {
            ...updatedPrimaryDetails[identifierElement],
        };

        updatedPrimaryDetailsElement.selected = this.state.primaryDetails[
            identifierElement
        ].selected.filter((ele, i) => i !== index);

        updatedPrimaryDetails[identifierElement] = updatedPrimaryDetailsElement;

        let formIsValid = true;

        for (const item in updatedPrimaryDetails) {
            if (updatedPrimaryDetails[item].tagHandler) {
                formIsValid =
                    updatedPrimaryDetails[item].selected.length > 0 &&
                    formIsValid;
                continue;
            }
            formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
        }

        this.setState({
            primaryDetails: updatedPrimaryDetails,
            formIsValid: formIsValid,
        });
    };

    clientSignUpHandler = (event) => {
        event.preventDefault();
        const data = {};

        for (let field in this.state.primaryDetails) {
            if (this.state.primaryDetails[field].isTag) {
                data[field] = this.state.primaryDetails[field].selected;
                continue;
            }
            data[field] = this.state.primaryDetails[field].value;
        }

        data["accountType"] = "Restaurant";

        

        this.props.customerSignUp(data);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.auth !== prevProps.auth) {
            this.setState({ auth: true });
            
        } else if (this.props.error !== prevProps.error) {
            this.setState({
                errorText: "UserName is already taken.",
            });
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };
            for (let field in updatedPrimaryDetails) {
                updatedPrimaryDetails[field].value = "";
            }

            this.setState({
                primaryDetails: updatedPrimaryDetails,
                formIsValid: false,
            });
        }

    }

    render() {
        let formElements = [];

        for (let item in this.state.primaryDetails) {
            formElements.push({
                id: item,
                config: this.state.primaryDetails[item],
            });
        }

        let button = <Button
        fill
        disabled={!this.state.formIsValid}
        config={{ type: "button" }}
        clicked={(event) => this.clientSignUpHandler(event)}
        name={this.props.pending ? <Spinner /> : "Sign Up"}
          />

        
        let form = formElements.map((formElement) => {
            return (
                <Input
                    key={formElement.id}
                    changed={(event) =>
                        this.changeHandler(event, formElement.id)
                    }
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    addTag={() => this.addItemToCheck(formElement.id)}
                    removeTag={(index) => {
                        this.removeItemFromCheck(index, formElement.id);
                    }}
                    isTag={formElement.config.tagHandler}
                    selected={formElement.config.selected}
                    analyzeText={formElement.config.analyzeText}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    actions={formElement.config.actions}
                />
            );
        });
        if (this.state.auth) {
            form = (
                <h1
                    style={{
                        color: "green",
                        width: "100%",
                        height: "20rem",
                        textAlign: "center",
                    }}
                >
                    {" "}
                    Successfully Registered
                </h1>
            );
            button = <NavLink
       
            to="/"
            
        >
            Home
        </NavLink>
            
        }


        return (
            <form className={classes.Customer}>
                <h5>{this.state.errorText}</h5>
            
                {form}
                {button}
                
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: getCustomerError(state),
    pending: getCustomerPending(state),
    auth: getCustomerSuccess(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            customerSignUp: customerSignUpAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUp);
