import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart ,Checkout} from "./components/";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();

		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productID, quantity) => {
		const item = await commerce.cart.add(productID, quantity);
		setCart(item.cart);
	};
 
	const handleUpdateCartqty = async (productID, quantity) => {
		const response = await commerce.cart.update(productID, {quantity});
		setCart(response.cart);
	};
	const handleRemove = async (productID) => {
		const response = await commerce.cart.remove(productID);
		setCart(response.cart);
	};

	const handleEmpty = async () => {
		const response = await commerce.cart.empty();
		setCart(response.cart);
	};



	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	console.log(cart);

	return (
		<Router>
			<div>
				<Navbar total={cart.total_items} />
				<Switch>
					<Route exact path="/">
						<Products
							products={products}
							onAddToCart={
								handleAddToCart
							}
						/>
					</Route>
					<Route exact path="/cart">
						<Cart cart={cart} 
						 handleUpdateCartqty={handleUpdateCartqty}
						 handleRemove={handleRemove}
						 handleEmpty={handleEmpty}
						/>
					</Route>
					<Route exact path="/checkout" >
							<Checkout
							cart={cart}
							
							/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
