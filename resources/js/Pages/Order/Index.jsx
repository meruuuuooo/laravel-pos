import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal2 from 'sweetalert2';

const Index = ({ categories, products }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    console.log(products);

    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === 'All' ||
                product.category.name === selectedCategory) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id,
            );
            if (existingItem) {
                toast.info(`${product.name} quantity updated!`);
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            } else {
                toast.success(`${product.name} added to cart!`);
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const incrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    };

    const decrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            ),
        );
    };
    const removeFromCart = (productId) => {
        const product = cart.find((item) => item.id === productId);
        toast.error(`${product.name} removed from cart!`);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const placeOrder = async () => {
        if (cart.length === 0) {
            swal2.fire({
                title: 'Cart is empty',
                text: 'Please add items to your cart before placing an order.',
                icon: 'warning',
            });
            return;
        }

        setLoading(true); // Start loading

        try {
            await router.post(
                route('order.store'),
                {
                    cart: cart.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
                {
                    onSuccess: () => {
                        swal2.fire({
                            title: 'Order placed',
                            text: 'Your order has been placed successfully.',
                            icon: 'success',
                        });

                        setCart([]);
                    },
                },
            );
        } catch (error) {
            swal2.fire({
                title: 'Failed to place order',
                text: 'An error occurred while placing your order. Please try again.',
                icon: 'error',
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        const newTotal = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
        );
        setTotal(newTotal);
    }, [cart]);

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
                    <div className="grid grid-cols-5 grid-rows-4 gap-4">
                        <div className="col-span-3">
                            <div className="mb-4 rounded-lg border border-b border-pink-400 bg-white p-6 shadow-lg">
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
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="flex space-x-2 overflow-x-auto py-2">
                                        <div
                                            onClick={() =>
                                                setSelectedCategory('All')
                                            }
                                            className={`inline-block min-w-[120px] cursor-pointer rounded-3xl p-2 text-center transition ${
                                                selectedCategory === 'All'
                                                    ? 'border-2 border-pink-500 bg-gray-200'
                                                    : 'bg-gray-300'
                                            }`}
                                        >
                                            <p
                                                className={`text-sm font-semibold ${
                                                    selectedCategory === 'All'
                                                        ? 'text-pink-500'
                                                        : 'text-gray-800'
                                                }`}
                                            >
                                                All
                                            </p>
                                        </div>
                                        {categories.map((category) => (
                                            <div
                                                key={category.id}
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-4 row-span-4">
                            {/* Cart Section */}
                            <div className="w-78 rounded-lg border border-pink-400 bg-white p-6 shadow-lg">
                                <h5 className="text-xl font-semibold text-gray-800">
                                    Order Cart
                                </h5>
                                <hr className="my-4" />

                                {/* Cart Items */}
                                <ul className="max-h-80 space-y-4 overflow-y-auto pr-2">
                                    {cart.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between rounded-xl border border-pink-200 p-2"
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={item.imageURL}
                                                    alt={item.name}
                                                    className="h-16 w-16 object-contain"
                                                />
                                                <div className="ml-4">
                                                    <h5 className="text-md font-semibold text-gray-800">
                                                        {item.name}
                                                    </h5>
                                                    <p className="text-sm text-gray-600">
                                                        {new Intl.NumberFormat(
                                                            'en-PH',
                                                            {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            },
                                                        ).format(
                                                            item.price,
                                                        )}{' '}
                                                        x {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        decrementQuantity(
                                                            item.id,
                                                        )
                                                    }
                                                    className="rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300"
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        incrementQuantity(
                                                            item.id,
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity >=
                                                        item.inventory.quantity
                                                    }
                                                    className={`rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-sm text-gray-600 ${
                                                        item.quantity >=
                                                        item.inventory.quantity
                                                            ? 'cursor-not-allowed opacity-50'
                                                            : 'hover:bg-gray-300'
                                                    }`}
                                                >
                                                    +
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item.id)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Total */}
                                <div className="mt-6 flex items-center justify-between">
                                    <h5 className="text-lg font-semibold text-pink-500">
                                        Total
                                    </h5>
                                    <p className="text-lg font-semibold text-green-600">
                                        {new Intl.NumberFormat('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }).format(total)}
                                    </p>
                                </div>

                                {/* Place Order Button */}

                                <button
                                    onClick={placeOrder}
                                    disabled={loading}
                                    className={`mt-4 w-full bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-600 ${
                                        loading
                                            ? 'bg-gray-400'
                                            : 'bg-blue-500 text-white'
                                    }`}
                                >
                                    {loading
                                        ? 'Placing Order...'
                                        : 'Place Order'}
                                </button>
                            </div>
                        </div>
                        <div className="col-span-3 row-span-4 row-start-2">
                            <div className="rounded-lg border border-pink-400 bg-white px-4 sm:rounded-lg">
                                <div className="my-4">
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                            {filteredProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="max-w-xs overflow-hidden rounded-lg border border-pink-200 bg-white shadow-lg"
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
                                                            {new Intl.NumberFormat(
                                                                'en-PH',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'PHP',
                                                                },
                                                            ).format(
                                                                product.price,
                                                            )}
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                addToCart(
                                                                    product,
                                                                )
                                                            }
                                                            disabled={
                                                                cart.find(
                                                                    (item) =>
                                                                        item.id ===
                                                                        product.id,
                                                                )?.quantity >=
                                                                product
                                                                    .inventory
                                                                    .quantity
                                                            }
                                                            className={`mt-2 w-full rounded-md border-2 px-3 py-1 font-semibold ${
                                                                cart.find(
                                                                    (item) =>
                                                                        item.id ===
                                                                        product.id,
                                                                )?.quantity >=
                                                                product
                                                                    .inventory
                                                                    .quantity
                                                                    ? 'cursor-not-allowed border-gray-400 text-gray-400'
                                                                    : 'border-pink-400 text-pink-400 hover:bg-pink-300 hover:text-white'
                                                            }`}
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
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={300}
                limit={1}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="colored"
            />
        </AuthenticatedLayout>
    );
};

export default Index;
