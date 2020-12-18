import React from "react";
import { useForm } from "react-hook-form";
import useStyles from "./CartStyles";
import CartItem from "./CartItem";

export default function SignUp() {
  const classes = useStyles();
  const { register, handleSubmit, getValues, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.cartContainer}>
      <h1 className={classes.formTitle}>your cart</h1>
      <CartItem />
      <CartItem />
    </div>
  );
}
