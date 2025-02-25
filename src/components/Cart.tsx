import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-4">
        <p className="text-gray-600 dark:text-gray-300 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Your Cart ({getTotalItems()} items)</h2>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item) => (
          <div key={item.product.id} className="py-4 flex items-center">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">{item.product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="text-gray-500 dark:text-gray-400 focus:outline-none"
                disabled={item.quantity <= 1}
              >
                <span className="sr-only">Decrease quantity</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="mx-2 text-gray-700 dark:text-gray-300">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="text-gray-500 dark:text-gray-400 focus:outline-none"
              >
                <span className="sr-only">Increase quantity</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="ml-4 text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
          <p>Subtotal</p>
          <p>${getTotalPrice().toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Always render CheckoutForm but control visibility with isOpen prop */}
      <div className={`mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 ${isCheckoutOpen ? 'block' : 'hidden'}`}>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Checkout</h3>
        <CheckoutForm 
          totalAmount={getTotalPrice()} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      </div>
    </div>
  );
}
