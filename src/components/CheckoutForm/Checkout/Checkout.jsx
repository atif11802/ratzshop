import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import { useState ,useEffect} from "react";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import Payment from "../Payment";
import {commerce}  from "../../../lib/commerce"
const steps = ["shipping address", "payment details"];

function Checkout({cart}) {

    const [checkoutToken, setCheckoutToken]=useState(null);
    const [shippingData, setShippingData]=useState({});
	const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
       const generate = async ()=>{
           try{
               const token = await commerce.checkout.generateToken(cart.id, {type : "cart"})
          console.log(token)
           setCheckoutToken(token);
            }
           catch (error) {

           }
       }
       generate();
    }, [cart])



	

	const nextStep = ()=>setActiveStep((previousactivestep)=> previousactivestep+1)
	const backStep = ()=>setActiveStep((previousactivestep)=> previousactivestep-1)

	const next =(data)=>{
		setShippingData(data);
		nextStep()

	}


	const classes = useStyles();

	

	const Form = () => (activeStep === 0 ? <AddressForm 
        checkoutToken={checkoutToken}
		next={next}
    /> : <Payment />);

	const Confirmation = () => {
		return <div>confirmation</div>;
	};

	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper
						activeStep={activeStep}
						className={classes.stepper}
					>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>
									{step}
								</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<Confirmation />
					) : (
                        checkoutToken && 
						<Form />
					)}
				</Paper>
			</main>
		</>
	);
}

export default Checkout;
