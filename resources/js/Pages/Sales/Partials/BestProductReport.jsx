const Header = ({ printBestsellersReport }) => {
    return (
        <div className="mb-4 flex justify-between">
            <h5 className="text-lg font-semibold text-gray-800">
                Best Selling Products
            </h5>
            <div className="flex items-center space-x-2">
                <button
                    onClick={printBestsellersReport}
                    className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                >
                    Print Report
                </button>
            </div>
        </div>
    );
};

const SalesReport = ({ topProducts, startDate, endDate }) => {
    return (
        <div className="flex flex-col items-center justify-center">
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
                    Bestselling Products Report
                </h2>
                <p className="text-xs text-gray-500">
                    Date Range: {startDate} - {endDate}
                </p>
            </div>
            <table className="w-full border-collapse border border-gray-500 text-center text-sm">
                <thead className="bg-pink-50">
                    <tr>
                        <th className="border border-gray-500 p-2">Rank</th>
                        <th className="border border-gray-500 p-2">
                            Product Name
                        </th>
                        <th className="border border-gray-500 p-2">
                            Units Sold
                        </th>
                        <th className="border border-gray-500 p-2">
                            Total Revenue
                        </th>
                        <th className="border border-gray-500 p-2">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {topProducts.map((product, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-pink-200' : ''}
                        >
                            <td className="border border-gray-500 p-2">
                                {product.rank}
                            </td>
                            <td className="border border-gray-500 p-2">
                                {product.product_name}
                            </td>
                            <td className="border border-gray-500 p-2">
                                {product.total_quantity_sold}
                            </td>
                            <td className="border border-gray-500 p-2">
                                {new Intl.NumberFormat('en-PH', {
                                    style: 'currency',
                                    currency: 'PHP',
                                }).format(product.total_revenue)}
                            </td>
                            <td className="border border-gray-500 p-2">
                                {product.category_name}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const SalesSummary = ({ totalRevenue }) => {
    return (
        <div className="mx-8 mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold text-pink-600">
                Sales Summary
            </h3>
            <div className="flex justify-between text-sm">
                <span>Total Revenue:</span>
                <span className="font-bold text-pink-600">
                    {new Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                    }).format(totalRevenue)}
                </span>
            </div>
        </div>
    );
};

export default function BestProductReportComponent({
    printBestsellersReport,
    reportBestsellersRef,
    topProducts,
    startDate,
    endDate,
    totalRevenue,
}) {
    return (
        <div className="rounded-lg bg-gray-50 p-4">
            <Header printBestsellersReport={printBestsellersReport} />
            <div ref={reportBestsellersRef} className="m-8 overflow-x-auto">
                <SalesReport
                    topProducts={topProducts}
                    startDate={startDate}
                    endDate={endDate}
                />
                <SalesSummary totalRevenue={totalRevenue} />
            </div>
        </div>
    );
}
