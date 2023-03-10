import React from "react";
import { LiteCreditCardInput, CreditCardInput } from "react-native-credit-card-input";

export const CreditCardInputComponent = ({ name, onSuccess, onError }) => {
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
