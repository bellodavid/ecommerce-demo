"use client";

import React from "react";
import * as BananaCrystal from "banana-crystal-payment";



const { PaymentForm } = BananaCrystal;


interface PaymentFormProps {
  storeId: string;
  amount: number;
  currency: string;
  description: string;
  walletAddress: string;
  redirectUrl: string;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const BananaCrystalPayment: React.FC<PaymentFormProps> = (props) => {
  return (
    <PaymentForm
      storeId={props.storeId}
      amount={props.amount}
      currency={props.currency}
      description={props.description}
      walletAddress={props.walletAddress}
      redirectUrl={props.redirectUrl}
      onSuccess={props.onSuccess}
      onError={props.onError}
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
};

export default BananaCrystalPayment;
