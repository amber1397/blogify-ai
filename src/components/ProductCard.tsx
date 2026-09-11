import React from 'react';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const ProductCard: React.FC<ProductProps> = ({ name, description, price, imageUrl, category }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col justify-between">
      <div>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        <div className="p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {category}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-2">{name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-5 pt-0 flex items-center justify-between">
        <span className="text-xl font-extrabold text-gray-900">${price}</span>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};