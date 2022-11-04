import React, {useContext, useState} from "react";
import Modal from "../UI/Modal";
import classes from './Cart.module.css';
import CartContext from "../../store/cart.context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = (props) => {
	const context = useContext(CartContext);
	const [isCheckedOut, setIsCheckedOut] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const [error, setError] = useState(false);
	
	const totalAmount = `$${context.totalAmount.toFixed(2)}`;
	const hasItems = context.items.length > 0;
	
	const cartItemRemoveHandler = id => {
		context.removeItem(id);
	}
	
	const cartItemAddHandler = item => {
		context.addItem({...item, amount: 1});
	}
	
	const orderHandler = () => {
		setIsCheckedOut(true);
	}
	
	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		console.log(userData)
		const response = await fetch(`https://react-project-4656d-default-rtdb.firebaseio.com/orders.json`, {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderItems: context.items
			})
		});
		setIsSubmitting(false);
		if (!response.ok) {
			setError(true);
			throw new Error('Something Went Wrong')
		} else {
			setDidSubmit(true);
			context.clearCart();
		}
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
	
	const modalActions = <div className={classes.actions}>
		<button onClick={props.onDismissCart} className={classes['button--alt']}>Close</button>
		{hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
	</div>
	
	const cartModalContent =
		<div className={classes.cartItems}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckedOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onDismissCart}/>}
			{!isCheckedOut && modalActions}
		</div>
	
	const isSubmittingModalContent = <p>Sending Order data...</p>;
	
	const didSubmittingModalContent = <React.Fragment>
		<p>Successfully send order(s)!!</p>
		<div className={classes.actions}>
			<button onClick={props.onDismissCart} className={classes.button}>Close</button>
		</div>
	</React.Fragment>;
	
	
	return (
		<Modal onDismiss={props.onDismissCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmittingModalContent}
		</Modal>
	)
}
export default Cart;
