import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ products, categories }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts =
        selectedCategory === 'All'
            ? products
            : products.filter(
                  (product) => product.category.name === selectedCategory,
              );

    const cartItems = [
        {
            id: 1,
            name: 'Product 1',
            price: 10.99,
            quantity: 2,
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15.99,
            quantity: 1,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 20.99,
            quantity: 3,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Order
                </h2>
            }
        >
            <Head title="Order" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-5 grid-rows-2 gap-4">
                        <div className="col-span-3 row-span-2">
                            <div className="bg-white p-4 shadow-sm sm:rounded-lg">
                                <div className="mb-4 border-b">
                                    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800">
                                                Choose Category
                                            </h5>
                                            <p className="text-sm text-pink-500">
                                                {categories.length} Categories
                                            </p>
                                        </div>
                                        <div className="w-full md:w-72">
                                            <TextInput
                                                type="text"
                                                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-pink-500"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div
                                            className="scrollbar-hidden flex space-x-2 overflow-x-auto py-2"
                                            onWheel={(e) => {
                                                e.currentTarget.scrollLeft +=
                                                    e.deltaY;
                                            }}
                                        >
                                            {categories.map(
                                                (category, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            setSelectedCategory(
                                                                category.name,
                                                            )
                                                        }
                                                        className={`inline-block min-w-[120px] cursor-pointer rounded-3xl p-2 text-center transition ${
                                                            selectedCategory ===
                                                            category.name
                                                                ? 'border-2 border-pink-500 bg-gray-200'
                                                                : 'bg-gray-300'
                                                        }`}
                                                    >
                                                        <p
                                                            className={`text-sm font-semibold ${
                                                                selectedCategory ===
                                                                category.name
                                                                    ? 'text-pink-500'
                                                                    : 'text-gray-800'
                                                            }`}
                                                        >
                                                            {category.name}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {filteredProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="max-w-xs overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                                                >
                                                    <img
                                                        src={product.imageURL}
                                                        alt={product.name}
                                                        className="h-32 w-full object-contain"
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="text-md font-bold text-gray-800">
                                                            {product.name}
                                                        </h3>
                                                        <p className="mt-1 text-gray-600">
                                                            $
                                                            {product.price.toFixed(
                                                                2,
                                                            )}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                console.log(
                                                                    `Added ${product.name} to cart`,
                                                                )
                                                            }
                                                            className="mt-2 w-full rounded-md border-2 border-pink-400 px-3 py-1 font-semibold text-pink-400 hover:bg-pink-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-500">
                                            No products available in this
                                            category.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-4 row-span-6">
                            <div className="w-78 bg-white p-4 shadow-sm sm:rounded-lg">
                                <div className="flex justify-between">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        Order Cart
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                        Monday, July 12, 2021
                                    </p>
                                </div>
                                <hr />
                                {/* Cart Content */}
                                <ul className="mt-4 space-y-2 px-6">
                                    {cartItems.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between rounded-3xl border-2 border-pink-400 p-2"
                                        >
                                            {/* Product Image */}
                                            <img
                                                src={item.imageURL}
                                                alt={item.name}
                                                className="h-12 w-12 rounded-lg object-cover"
                                            />

                                            {/* Product Details */}
                                            <div className="ml-4 flex-grow">
                                                <h6 className="text-md font-semibold text-gray-800">
                                                    {item.name}
                                                </h6>
                                                <p className="text-sm text-gray-500">
                                                    ${item.price.toFixed(2)} x{' '}
                                                    {item.quantity}
                                                </p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(index)
                                                    }
                                                    className="h-8 w-8 rounded-full bg-pink-400 text-gray-100 hover:bg-pink-300"
                                                >
                                                    -
                                                </button>
                                                <span className="w-6 text-center text-gray-800">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(index)
                                                    }
                                                    className="h-8 w-8 rounded-full bg-pink-400 text-gray-100 hover:bg-pink-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
{
    /* <button className="ml-4 text-pink-400">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
</button>; */
}
