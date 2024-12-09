import { TrashIcon } from '@heroicons/react/24/solid';

const Cart = ({ cart, updateQuantity, removeFromCart, total }) => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-lg">
            <h5 className="text-xl font-semibold text-gray-800">Order Cart</h5>
            <hr className="my-4" />

            {/* Scrollable Cart List */}
            {cart.length > 0 ? (
                <ul className="max-h-80 space-y-4 overflow-y-auto pr-2">
                    {cart.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-4 shadow-lg"
                        >
                            {/* Product Details */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.imageURL || '/icons/default.png'}
                                    alt={item.name}
                                    className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                                />
                                <div>
                                    <h6 className="text-lg font-semibold text-gray-800">
                                        {item.name}
                                    </h6>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} x ₱
                                        {item.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-white"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="w-6 text-center font-semibold text-gray-800">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                        )
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-400"
                                >
                                    +
                                </button>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-gray-500 hover:text-red-500"
                                title="Remove item"
                            >
                                <TrashIcon className="h-6 w-6" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">
                    Your cart is currently empty.
                </p>
            )}

            {/* Cart Summary */}
            <hr className="my-4" />
            <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-700">
                    <span>Sub Total</span>
                    <span>₱{total.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span className="text-pink-400">Total</span>
                    <span className="text-green-500">₱{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={() => alert('Checkout functionality coming soon!')}
                className="mt-6 w-full rounded-lg bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-400"
            >
                Place Order
            </button>
        </div>
    );
};

export default Cart;
