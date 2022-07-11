import {useContext} from "react";
import Modal from "../UI/Modal";
import classes from './Cart.module.css';
import CartContext from "../../store/cart.context";
import CartItem from "./CartItem";

const Cart = (props) => {
	const context = useContext(CartContext);
	
	const totalAmount = `$${context.totalAmount.toFixed(2)}`;
	const hasItems = context.items.length > 0;
	
	const cartItemRemoveHandler = id => {
		context.removeItem(id);
	}
	
	const cartItemAddHandler = item => {
		context.addItem({...item, amount: 1});
	}
	
	const cartItems = <ul className={classes['cart-items']}>
		{context.items.map(
			item => <CartItem
				key={item.id}
				name={item.name}
				price={item.price}
				amount={item.amount}
				onAdd={cartItemAddHandler.bind(null, item)}
				onRemove={cartItemRemoveHandler.bind(null, item.id)}
			/>
		)}
	</ul>;
	
	
	return (
		<Modal onDismiss={props.onDismissCart}>
			<div className={classes.cartItems}>
				{cartItems}
				<div className={classes.total}>
					<span>Total Amount</span>
					<span>{totalAmount}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={props.onDismissCart} className={classes['button--alt']}>Close</button>
					{hasItems && <button className={classes.button}>Order</button>}
				</div>
			</div>
		</Modal>
	)
}
export default Cart;