export default function ProductCard({ value, onClickProduct, cart }) {
    return (
        <>
            {value.data.map((product) => (
                <div
                    key={product.id}
                    className="max-w-sm overflow-hidden rounded-lg border border-pink-200 bg-white shadow-lg sm:max-w-xs lg:max-w-md"
                >
                    <img
                        src={product.imageURL}
                        alt={product.name}
                        className="h-32 w-full object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-md font-bold text-gray-800">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-gray-600">
                            {new Intl.NumberFormat('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(product.price)}
                        </p>
                        <button
                            onClick={() => {
                                onClickProduct(product);
                            }}
                            disabled={
                                cart.find((item) => item.id === product.id)
                                    ?.quantity >= product.inventory.quantity
                            }
                            className={`mt-2 w-full rounded-md border-2 px-3 py-1 font-semibold ${
                                cart.find((item) => item.id === product.id)
                                    ?.quantity >= product.inventory.quantity
                                    ? 'cursor-not-allowed border-gray-400 text-gray-400'
                                    : 'border-pink-400 text-pink-400 hover:bg-pink-300 hover:text-white focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                            }`}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
