import Image from 'next/image';
import { Product } from '@/store/useCartStore';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
