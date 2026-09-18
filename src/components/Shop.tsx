import React from 'react';
import { Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'iPhone 17 Pro Max',
    price: 'AED 4,699',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Top Suggestion',
    description: '256GB Storage, A19 Pro Chip, 48MP Triple Camera.'
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 'AED 9,499',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Powerhouse',
    description: 'M4 Max Chip, 32GB RAM, 1TB SSD. Built for professionals.'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S26 Ultra',
    price: 'AED 4,899',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Best for Photography',
    description: '512GB Storage, Snapdragon 8 Gen 4, 200MP Camera.'
  },
  {
    id: 4,
    name: 'iPad Pro 13"',
    price: 'AED 4,299',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800&fm=webp',
    tag: 'Creative Pro',
    description: 'M4 Chip, OLED Display, 256GB Storage. Perfect for artists.'
  }
];

export default function Shop() {
  return (
    <section id="shop" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-white mb-4">Al Sharq Mobile Store</h2>
            <p className="text-brand-grey dark:text-gray-400 mb-2">
              Find the latest <strong>tech accessories</strong> and gadgets at Al Sharq Mobile. From fast-chargers to certified pre-owned smartphones, <strong>Al Sharq Mobile Phone & Computer Trading LLC</strong> offers high-quality tech trading at competitive prices.
            </p>
            <p className="text-brand-grey dark:text-gray-400 text-sm">
              Your trusted <strong>Computer trading LLC Dubai</strong> partner for premium gear.
            </p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-brand-orange font-semibold hover:text-orange-700 transition-colors whitespace-nowrap">
            View All Products <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm group-hover:shadow-md hover:scale-105 transition-all duration-300 border border-transparent dark:border-slate-700">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-700 mb-4 relative">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {product.tag}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <button className="absolute bottom-4 right-4 bg-white text-brand-blue p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-orange hover:text-white">
                  <ShoppingBag className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white group-hover:text-brand-orange transition-colors cursor-pointer line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-brand-blue dark:text-white whitespace-nowrap ml-2">{product.price}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 mt-auto mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
                <button className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Buy Now <ShoppingBag className="w-4 h-4" />
                </button>
                <div className="mt-3 text-center">
                  <a href="mailto:alsharqmobile@gmail.com?subject=Wholesale%20Inquiry" className="text-xs text-brand-blue dark:text-gray-400 hover:text-brand-orange dark:hover:text-brand-orange font-medium underline transition-colors">
                    Buying for a shop? Click here for Wholesale Pricing
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-orange-700 transition-colors">
            View All Products <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
