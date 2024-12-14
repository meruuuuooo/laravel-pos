const ReceiptModal = ({ show, handleClose, sale }) => {
    if (!sale) {
        return null; // Render nothing if sale data is not available
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity ${
                show ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
        >
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold">Receipt</h2>
                    <button className="text-gray-500" onClick={handleClose}>
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>

                <div className="mt-4">
                    <p>
                        <strong>Sale ID:</strong> {sale.id}
                    </p>
                    <p>
                        <strong>Date:</strong>{' '}
                        {new Date(sale.sale_date).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Total Amount:</strong> $
                        {sale.total_amount.toFixed(2)}
                    </p>
                    <h5 className="mt-4 font-semibold">Items:</h5>
                    <ul className="mt-2 space-y-2">
                        {sale.details.map((detail, index) => (
                            <li key={index} className="flex justify-between">
                                <span>
                                    <strong>{detail.product_name}</strong>
                                </span>
                                <span>
                                    {detail.quantity_sold} × $
                                    {detail.line_total.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-4 text-right">
                    <button
                        className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;
