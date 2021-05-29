import React from 'react'
import {Card, CardMedia,CardContent, CardActions,Typography, IconButton} from "@material-ui/core";
import { AddShoppingCart} from "@material-ui/icons";
import useStyles from "./styles";

function Product({product,onAddToCart}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media}
            image={product.media.source}
            title={product.name}
            
            />
            <CardContent >
                <div className={classes.cardContent}>
                    <Typography varient="h5" gutterBottom>
                        {product.name}
                        </Typography>
                        <Typography varient="h5" >
                        {product.price.formatted_with_code}
                        </Typography>
                </div>
                
                <Typography dangerouslySetInnerHTML={{__html:product.description }} varient="body2" color="textSecondary" />
                
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add To Card" onClick={() => onAddToCart(product.id,1)}> 
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

            
           

        </Card>
    )
}

export default Product