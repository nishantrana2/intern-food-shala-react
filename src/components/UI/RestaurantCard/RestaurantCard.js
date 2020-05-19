import React from "react";

import classes from "./RestaurantCard.module.css";


export default function RestaurantCard(props) {
    return (
        <div className={classes.Card} onClick={props.clicked}>
           
            <h4 className={classes.Title}>{props.name}</h4>
            <div className={classes.Cusines}>
                <h5>ORDER NOW</h5>
                
            </div>
        </div>
    );
}
