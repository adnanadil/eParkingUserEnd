// This component is made from the react-native-credit-card-input library and it helps 
// us to show a very pretty credit card UI to allow the user to enter their credit card details.

import { CreditCardInput } from "react-native-credit-card-input";

// This is the main function for the credit card component
export const CreditCardInputComponent = ({ name, onSuccess, onError }) => {

  // If details on the card are changed 
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };
    if (!isIncomplete) {
      onSuccess(card);
      console.log("Credit card filled")
    }
  };
  return <CreditCardInput onChange={onChange} />;
};


