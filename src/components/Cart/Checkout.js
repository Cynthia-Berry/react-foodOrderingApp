import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();
	
	const confirmHandler = event => {
		event.preventDefault();
		
		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		
		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
		
		setFormInputValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postalCode: enteredPostalCodeIsValid,
			city: enteredCityIsValid,
		})
		
		const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
		
		if (!formIsValid) {
			return;
		}
		
		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity
		});
	};
	
	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`}>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef}/><br/>
				{!formInputValidity.name && <small>Please enter a valid Name.</small>}
			</div>
			<div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef}/><br/>
				{!formInputValidity.street && <small>Please enter a valid Street.</small>}
			</div>
			<div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalInputRef}/><br/>
				{!formInputValidity.postalCode && <small>Please enter a valid Postal Code (5 characters long).</small>}
			</div>
			<div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef}/><br/>
				{!formInputValidity.city && <small>Please enter a valid City.</small>}
			
			</div>
			<div className={classes.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button type={"submit"} className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
