import {useEffect, useState} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [httpError, setHttpError] = useState(null);
	
	useEffect(() => {
		const fetchMeals = async () => {
			setIsLoading(true);
			const response = await fetch(`https://react-project-4656d-default-rtdb.firebaseio.com/meals`);
			if (!response.ok) {
				console.log(response)
				setHttpError(true);
				throw new Error('Something Went Wrong')
			}
			const responseData = await response.json();
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};
		
			fetchMeals().catch(error => {
			setIsLoading(false);
			console.log(error)
			setHttpError(error.message);
			});
	}, []);
	
	if (isLoading) {
		return (<section className={classes.meals}>
			<Card>
				<p className={classes.mealIsLoading}>Loading...</p>
			</Card>
		</section>)
	}
	
	if (httpError) {
		return (<section className={classes.meals}>
			<Card>
				<p className={classes.mealIsError}>{httpError}</p>
			</Card>
		</section>)
	}
	
	const mealsList = meals.map(meal => <MealItem
		key={meal.id}
		id={meal.id}
		name={meal.name}
		price={meal.price}
		description={meal.description}/>);
	
	return (
		<section className={classes.meals}>
			<Card>
				<ul>
					{mealsList}
				</ul>
			</Card>
		</section>
	)
}

export default AvailableMeals;

