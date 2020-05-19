import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {productsReducer} from './store/reducer'
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const middlewares = [thunk];

const store = createStore(productsReducer, composeEnhancers(
    applyMiddleware(...middlewares)
    ));
    
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
serviceWorker.unregister();
