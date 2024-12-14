import { useRef } from 'react';

const ReceiptModal = ({ isOpen, closeModal, log }) => {
    const printRef = useRef();

    if (!isOpen || !log) return null;

    const handlePrint = () => {
        const printContent = printRef.current;
        const originalContent = document.body.innerHTML;

        // Replace the body's content with the printable content
        document.body.innerHTML = printContent.innerHTML;

        // Trigger the print dialog
        window.print();

        // Restore the original content after printing
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to reset the page's state
    };

    // Calculate change
    const change = (log.payment_amount || 0) - (log.total_amount || 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 max-w-lg rounded-md bg-white p-6">
                <div ref={printRef}>
                    {/* Header */}
                    <div className="mb-4 text-center">
                        <img
                            src="icons/Business logo.jpeg"
                            alt="Store Logo"
                            className="mx-auto h-20"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">
                            Pats Convenience Store
                        </h2>
                        <p className="text-sm text-gray-600">
                            A Cosin Street Zone 12 Poblacion, Tagoloan,
                            Philippines
                        </p>
                        <p className="text-sm text-gray-500">
                            +63 963 131 1938
                        </p>
                        <p className="text-xs text-gray-400">
                            caranzosharmaine19@gmail.com
                        </p>
                    </div>

                    <div className="my-4">
                        <hr className="border-gray-300" />
                    </div>

                    {/* Receipt Details */}
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            Cashier: {log.cashier || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-900">
                            Date:{' '}
                            {new Date(log.sold_at).toLocaleString('en-PH', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                            })}
                        </p>
                        <p className="text-sm text-gray-900">
                            Payment Method: {log.payment_method || 'N/A'}
                        </p>
                        {log.payment_method === 'Gcash' && (
                            <p className="text-sm text-gray-900">
                                Gcash Number: {log.customer_number || 'N/A'}
                            </p>
                        )}
                        <p className="text-sm text-gray-900">
                            Total Amount:{' '}
                            {new Intl.NumberFormat('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(log.total_amount || 0)}
                        </p>
                        <p className="text-sm text-gray-900">
                            Amount Paid:{' '}
                            {new Intl.NumberFormat('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(log.payment_amount || 0)}
                        </p>
                        <p
                            className={`text-sm text-gray-900 ${change < 0 ? 'text-red-500' : ''}`}
                        >
                            Change:{' '}
                            {new Intl.NumberFormat('en-PH', {
                                style: 'currency',
                                currency: 'PHP',
                            }).format(change)}
                        </p>
                    </div>

                    <div className="my-4">
                        <hr className="border-gray-300" />
                    </div>

                    {/* Purchased Items */}
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900">
                            Items Purchased
                        </h4>
                        <ul className="list-none">
                            {log.products.map((product, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between text-sm text-gray-900"
                                >
                                    <span>
                                        {product.name} (x{product.quantity || 1}
                                        )
                                    </span>
                                    <span>
                                        {new Intl.NumberFormat('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }).format(
                                            product.price *
                                                (product.quantity || 1),
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="my-4">
                        <hr className="border-gray-300" />
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-500">
                        <p>Thank you for shopping with us!</p>
                        <p>Visit us again soon.</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handlePrint}
                        className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                    >
                        Print
                    </button>
                    <button
                        onClick={closeModal}
                        className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;
