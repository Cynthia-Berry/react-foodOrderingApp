import {useContext, useEffect, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart.context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
	const context = useContext(CartContext);
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const {items} = context;
	
	const numberOfCartItems = items.reduce((currentNumber, item) => {
		return currentNumber + item.amount;
	}, 0);
	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
	
	useEffect(() => {
		if (context.items.length === 0) {
			return
		}
		setBtnIsHighlighted(true);
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);
		
		return() => {clearTimeout(timer)};
	}, [context.items.length, items])
	
	
	return <button className={btnClasses} onClick={props.onShowCart}>
		<span className={classes.icon}><CartIcon/></span>
		<span className={classes.bump}>Cart</span>
		<span className={classes.badge}>{numberOfCartItems}</span>
	</button>
	
}

export default HeaderCartButton;