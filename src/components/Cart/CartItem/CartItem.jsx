import React from 'react';
import {Typography, Button , Card , CardActions , CardContent, CardMedia} from "@material-ui/core";
import useStyles from "./styles";

function CartItem({item,onUpdatecartqty,onremovecart}) {

    const classes= useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name}  className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4" >{item.name} </Typography>
                <Typography variant="h5" >{item.line_total.formatted_with_symbol} </Typography>
            </CardContent>
            <CardActions  className={classes.cardActions} >
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={()=> onUpdatecartqty(item.id, item.quantity - 1)} >-</Button>
                    <Typography variant="h4" >{item.quantity} </Typography>
                    <Button type="button" size="small"  onClick={()=> onUpdatecartqty(item.id, item.quantity + 1)}>+</Button>

                </div>
                <Button type="button" variant="contained" color="secondary" onClick={()=> onremovecart(item.id)} >Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
