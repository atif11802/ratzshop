import React from 'react';
import {AppBar, Toolbar, IconButton, Badge , MenuItem , Menu ,Typography } from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import logo from "../../assests/commerce.png"
import useStyles from "./styles";
import {Link,useLocation} from "react-router-dom"

function Navbar({total}) {

    const classes =  useStyles();
 
    const location =useLocation();

    if(location.pathname === "/"){

    }

    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="./" varient="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="eCommerce " height="25px" className={classes.image} />

                        Ratzhop
                    </Typography>
                    <div className={classes.grow} />
                    {
                        location.pathname === "/" && (
                        <div className={classes.button}>
                        
                        <IconButton component={Link} to="./cart" aria-label="show cart item" color="inherit" >
                                <Badge badgeContent={total} color="secondary">
                                    <ShoppingCart />
                                </Badge>

                        </IconButton> 
                        
                    </div>)
                    }
                    
            </Toolbar>

        </AppBar>
            
        </>
    )
}

export default Navbar
