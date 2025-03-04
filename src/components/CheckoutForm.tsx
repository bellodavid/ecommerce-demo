import { useState, useEffect } from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import StandalonePaymentForm from "./BCPay";

import axios from "axios";

interface CheckoutFormProps {
  totalAmount: number;
  onClose: () => void;
}

export default function CheckoutForm({
  totalAmount,
  onClose,
}: CheckoutFormProps) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [paymentDescription, setPaymentDescription] =
    useState<string>("Product Purchase");
  const { clearCart, items } = useCartStore();

  // Convert dollar amount to cents for the payment processor
  const amountInCents = Math.round(totalAmount * 100);

  console.log(totalAmount);

  // Generate payment description based on cart items
  useEffect(() => {
    if (items.length === 1) {
      setPaymentDescription(`Purchase: ${items[0].product.name}`);
    } else if (items.length > 1) {
      const mainItem = items[0].product.name;
      const otherCount = items.length - 1;
      setPaymentDescription(
        `Purchase: ${mainItem} and ${otherCount} other item${
          otherCount > 1 ? "s" : ""
        }`
      );
    }
  }, [items]);

  const handleSuccess = (data: any) => {
    console.log("Payment successful:", data);
    setPaymentStatus("success");
    clearCart();
  };

  const handleError = (error: any) => {
    console.error("Payment failed:", error);
    setPaymentStatus("error");
  };

  if (paymentStatus === "success") {
    return (
      <div className="text-center py-8">
        <svg
          className="mx-auto h-12 w-12 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
          Payment successful!
        </h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Thank you for your purchase.
        </p>
        <div className="mt-6">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Complete Your Purchase
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          You're about to pay ${totalAmount.toFixed(2)} for your items.
        </p>
      </div>

      {paymentStatus === "error" && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Payment failed
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                There was an error processing your payment. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}

      <StandalonePaymentForm
        storeId="0fc1200d-381d-4600-810c-dc757a804629"
        amount={
          totalAmount
        } /* Using actual amount in dollars instead of cents */
        currency="USD"
        description={paymentDescription}
        walletAddress="0xbcCC71800D147a297c81Bb8dabf2Cdcf67E394b3"
        redirectUrl={
          typeof window !== "undefined"
            ? `${window.location.origin}/checkout/success`
            : ""
        }
        onSuccess={handleSuccess}
        onError={handleError}
        isOpen={true}
        onClose={onClose}
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
