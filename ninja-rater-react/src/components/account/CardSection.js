import React from 'react';
import {CardElement} from 'react-stripe-elements';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import styles from "../../v1-components/register/register.module.scss";
const createOptions = (fontSize, padding) => {
	return {
		style: {
			base: {
				fontSize,
				color: '#424770',
				letterSpacing: '0.025em',
				fontFamily: 'ProximaNova-Light, Helvetia, Arial, sans-serif',
				'::placeholder': {
					color: '#aab7c4',
				},
				padding,
				width: '370px'
			},
			invalid: {
				color: '#9e2146',
			},
		},
	};
};

class CardSection extends React.Component {
	
	render() {
		return (
			// <label style={{width: '100%'}} id="ID_LABEL_CARD_ELEMENTS">
			<div
				// style={{width: '100%'}}
				id="ID_LABEL_CARD_ELEMENTS"
				className={styles.formCssUpdateCreditCard}
			>
				<label className={styles.labelCssUpdateCreditCard}>
					Card number
				<CardNumberElement id="ID_CARD_NUMBER"
						// style={{base: {fontSize: '18px'}}}
						{...createOptions(this.props.fontSize)}
					/>
				</label>
				<label className={styles.labelCssUpdateCreditCard}>
					Expiration date
				<CardExpiryElement id="ID_EXPIRATION"
						// style={{base: {fontSize: '18px'}}}
						{...createOptions(this.props.fontSize)}
					/>
				</label>
				<label className={styles.labelCssUpdateCreditCard}>
					CVC
				<CardCVCElement id="ID_CVC"
						{...createOptions(this.props.fontSize)}
					// style={{base: {fontSize: '18px'}}}
					/>
				</label>
			</div>
			// </label>
		);
	}
}

// export default CardSection;
export default injectStripe(CardSection);
