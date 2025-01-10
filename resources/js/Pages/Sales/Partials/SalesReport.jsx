const Header = ({ printSalesReport }) => {
    return (
        <div className="mb-4 flex justify-between">
            <h5 className="text-lg font-semibold text-gray-800">
                Sales Report
            </h5>
            <div className="flex items-center space-x-2">
                <button
                    onClick={printSalesReport}
                    className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                >
                    Print Report
                </button>
            </div>
        </div>
    );
};

const SaleReport = ({ sales, startDate, endDate }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Header Section */}
            <div className="mb-4 text-center">
                <img
                    src="/icons/Business logo.jpeg"
                    alt="Business Logo"
                    className="mx-auto h-20 w-auto"
                />
                <h1 className="text-xl font-bold text-pink-600">
                    Pats Convenience Store
                </h1>
                <p className="text-sm text-gray-600">
                    A Cosin Street Zone 12 Poblacion, Tagoloan, Philippines
                </p>
                <p className="text-sm text-gray-600">+63 963 131 1938</p>
            </div>
            <div className="mb-4 text-center">
                <h2 className="text-lg font-semibold text-pink-600">
                    Sales Report
                </h2>
                <p className="text-xs text-gray-500">
                    Date Range: {startDate} - {endDate}
                </p>
            </div>
            <table className="w-full border-collapse border border-gray-500 text-center text-sm">
                <thead className="bg-pink-50">
                    <tr>
                        <th className="border border-gray-500 p-2">
                            Sale Date
                        </th>
                        <th className="border border-gray-500 p-2">
                            Processed By
                        </th>
                        <th className="border border-gray-500 p-2">Products</th>
                        <th className="border border-gray-500 p-2">Quantity</th>
                        <th className="border border-gray-500 p-2">
                            Line Total
                        </th>
                        <th className="border border-gray-500 p-2">
                            Total Sale
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-pink-200' : ''}
                        >
                            <td className="border border-gray-400 p-2">
                                {sale.sale_date}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {sale.processed_by}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {sale.products
                                    .map((product) => product.product_name)
                                    .join(', ')}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {sale.products
                                    .map((product) => product.quantity_sold)
                                    .join(', ')}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {sale.products
                                    .map((product) =>
                                        new Intl.NumberFormat('en-PH', {
                                            style: 'currency',
                                            currency: 'PHP',
                                        }).format(product.line_total),
                                    )
                                    .join(', ')}
                            </td>
                            <td className="border border-gray-400 p-2">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(sale.total_sale_amount)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const SalesSummary = ({ sales, totalSalesAmount }) => {
    return (
        <div className="mx-8 mt-4 text-sm">
            <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Total Sales:</span>
                <span className="font-bold text-pink-400">
                    {new Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                    }).format(totalSalesAmount)}
                </span>
            </div>
            <div className="flex items-center justify-between py-2">
                <span className="text-gray-700">Total Transactions:</span>
                <span className="font-bold text-pink-500">{sales.length}</span>
            </div>
        </div>
    );
};

export default function SalesReportComponent({
    printSalesReport,
    reportSalesRef,
    sales,
    startDate,
    endDate,
    totalSalesAmount,
}) {
    return (
        <div className="rounded-lg bg-gray-50 p-4">
            <Header printSalesReport={printSalesReport} />
            <div ref={reportSalesRef} className="m-8 overflow-x-auto">
                <SaleReport
                    sales={sales}
                    startDate={startDate}
                    endDate={endDate}
                />
                <SalesSummary
                    totalSalesAmount={totalSalesAmount}
                    sales={sales}
                />
            </div>
        </div>
    );
}
