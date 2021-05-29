import { Container, Typography , Button , Grid} from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";
import {Link } from "react-router-dom";


function Cart({cart,handleUpdateCartqty,handleRemove,handleEmpty}) {
    const classes = useStyles();

    
    const EmptyCart= () => {
        return(
            <Typography variant="subtitle">
            YOu have no items in your shopping cart. 
            <Link to="/" className={classes.link}> start shopping!!!! </Link>
        </Typography >
        )
      
    };
    const FilledCart= () => {
        return (
        <>
        <Grid container spacing={3} >

            {
                cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} 
                        onUpdatecartqty={handleUpdateCartqty}
                        onremovecart={handleRemove}

                        />
                    </Grid>
                ))
            }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.empytyButton} size="large" type="button" variant="contained" color="secondary"
                    onClick={handleEmpty}
                    
                    >
                        empty cart
                    </Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                        checkout
                    </Button>
                </div>
            </div>
        </>
        )
    };


    if(!cart.line_items) return "Loading....... ";



    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>
                your shopping cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FilledCart />}

        </Container>
    )
}

export default Cart
