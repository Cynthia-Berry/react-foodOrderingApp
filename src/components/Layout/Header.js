import mealsImage from '../../assets/images/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";


const Header = props => {
return(
	<>
		<header className={classes.header}>
			<h4>Berryblings' Meals</h4>
			<HeaderCartButton onShowCart={props.onShowCart}/>
		</header>
		<div className={classes['main-image']}>
			<img src={mealsImage} alt="A table of delicious meals"/>
		</div>
	</>
)
};

export default Header;