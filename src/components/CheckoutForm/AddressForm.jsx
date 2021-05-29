import React from "react";
import { useState, useEffect } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import { commerce } from "../../lib/commerce";
import {Link} from "react-router-dom"

function AddressForm({ checkoutToken ,next}) {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
	const [shippingSubdivision, setShippingSubdivision] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	const methods = useForm();

	const countries = Object.entries(
		shippingCountries
	).map(([code, name]) => ({ id: code, label: name }));
	const subdivisions = Object.entries(
		shippingSubdivisions
	).map(([code, name]) => ({ id: code, label: name }));


	const options= shippingOptions.map((so)=>({
		id:so.id,
		label: `${so.description} - (${so.price.formatted_with_symbol})`
	}))

	console.log(shippingOptions);

	const fetchSHIPPINGCOUNTRIES = async (checkoutTokenId) => {
		const {
			countries,
		} = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		setShippingCountries(countries);

		setShippingCountry(Object.keys(countries)[0]);
	};

	const fetchSubDivisions = async (countryCode) => {
		const {
			subdivisions,
		} = await commerce.services.localeListSubdivisions(countryCode);
		setShippingSubdivisions(subdivisions);
		setShippingSubdivision(Object.keys(subdivisions)[0]);
	};

	const fetchShipingOptions= async (checkoutTokenId,country,region = null)=>{
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country ,region} )
		setShippingOptions(options)
		setShippingOption(options[0].id)
	}

	useEffect(() => {
		fetchSHIPPINGCOUNTRIES(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchSubDivisions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if(shippingSubdivision) fetchShipingOptions(checkoutToken.id ,shippingCountry,shippingSubdivision)
	}, [shippingSubdivision]);

	return (
		<div>
			<Typography variant="h6" gutterBottom>
				Shipping Adress
			</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data)=> next({...data,setShippingCountry,shippingSubdivision,setShippingOption}) )}>
					<Grid container spacing={3}>
						<FormInput
							
							name="firstname"
							label="First Name"
						/>
						<FormInput
							
							name="lastname"
							label="Last Name"
						/>
						<FormInput
							
							name="addresse1"
							label="Address"
						/>
						<FormInput
							
							name="email"
							label="EMAIL"
						/>
						<FormInput
							
							name="city"
							label="City"
						/>
						<FormInput
							
							name="ZIP "
							label="ZIP/Postal code"
						/>
						<Grid item xs={12} sm={6}>
							<InputLabel>
								Shipping Country
							</InputLabel>
							<Select
								value={
									shippingCountry
								}
								fullWidth
								onChange={(e) =>
									setShippingCountry(
										e
											.target
											.value
									)
								}
							>
								{countries.map(
									(
										country
									) => (
										<MenuItem
											value={
												country.id
											}
											key={
												country.id
											}
										>
											{
												country.label
											}
										</MenuItem>
									)
								)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>
								Shipping
								Subdivision
							</InputLabel>
							<Select
								value={
									shippingSubdivision
								}
								fullWidth
								onChange={(e) =>
									setShippingSubdivisions(
										e
											.target
											.value
									)
								}
							>
								{subdivisions.map(
									(
										subdivision
									) => (
										<MenuItem
											value={
												subdivision.id
											}
											key={
												subdivision.id
											}
										>
											{
												subdivision.label
											}
										</MenuItem>
									)
								)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
                            <InputLabel>Shipping option</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) =>
									setShippingOption(
										e
											.target
											.value
									)}>
							{options.map(
									(
										option
									) => (
										<MenuItem
											value={
												option.id
											}
											key={
												option.id
											}
										>
											{
												option.label
											}
										</MenuItem>
									)
								)}
                            </Select>
                        </Grid>
					</Grid>
					<br />
					<div style={{display:"flex", justifyContent:"space-between"}}>
								
								<Button component={Link}  to="/cart" variant="outline">
											back to cart
								</Button>
								<Button type="submit" color="primary" variant="contained">
											next
								</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}

export default AddressForm;
