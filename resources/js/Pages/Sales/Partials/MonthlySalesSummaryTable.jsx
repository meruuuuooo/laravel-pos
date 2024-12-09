const MonthlySalesSummaryTable = ({ sales }) => {
    console.log(sales);

    const formatMonthName = (monthYear) => {
        const [year, month] = monthYear.split('-');
        const date = new Date(year, month - 1); // Month is 0-indexed in JavaScript Date
        const options = { year: 'numeric', month: 'long' }; // Format to include month name and year
        return date.toLocaleDateString('en-US', options); // e.g. "December 2024"
    };

    if (!sales || Object.keys(sales).length === 0) {
        return (
            <div className="h-full w-full rounded-lg bg-white p-4 shadow">
                <h5 className="text-lg font-semibold text-gray-800">
                    Monthly Sales Summary
                </h5>
                <p className="mt-1 text-sm font-normal text-gray-500">
                    No sales data available.
                </p>
            </div>
        );
    }

    // Get all unique categories dynamically from sales data
    const allCategories = Object.keys(sales)
        .flatMap((monthYear) => Object.keys(sales[monthYear].sales_by_category))
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

    return (
        <div className="h-full w-full rounded-lg bg-white shadow">
            <div className="rounded-t-lg border-b p-4">
                <div className="mb-8">
                    <h5 className="text-lg font-semibold text-gray-800">
                        Monthly Sales Summary
                    </h5>
                    <p className="mt-1 text-sm font-normal text-gray-500">
                        Track your sales performance for the selected period
                    </p>
                </div>
            </div>
            <div className="p-4">
                {Object.keys(sales).map((monthYear) => {
                    const sale = sales[monthYear]; // Access sales for the current month

                    return (
                        <div key={monthYear} className="mt-4">
                            <h6 className="text-md font-semibold text-gray-800">
                                Sales Summary for {formatMonthName(monthYear)}
                            </h6>
                            <div className="overflow-x-auto">
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            <th className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800">
                                                Date Range
                                            </th>
                                            <th className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800">
                                                Total Sales
                                            </th>
                                            {allCategories
                                                .slice(0, 3)
                                                .map((category) => (
                                                    <th
                                                        key={category}
                                                        className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800"
                                                    >
                                                        Category ({category})
                                                    </th>
                                                ))}
                                            <th className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800">
                                                Top-selling Products
                                            </th>
                                            <th className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800">
                                                Sales Transactions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="max-h-96 overflow-y-auto">
                                        <tr>
                                            <td className="flex flex-col items-center justify-center px-4 py-3 text-gray-800">
                                                <span>
                                                    {sale.date_range.start}
                                                </span>
                                                -
                                                <span>
                                                    {sale.date_range.end}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                ₱
                                                {sale.total_sales.toLocaleString()}
                                            </td>
                                            {allCategories
                                                .slice(0, 3)
                                                .map((category) => (
                                                    <td
                                                        key={category}
                                                        className="px-4 py-3 text-gray-800"
                                                    >
                                                        ₱
                                                        {sale.sales_by_category[
                                                            category
                                                        ] || 0}
                                                    </td>
                                                ))}
                                            <td className="flex flex-col px-4 py-3 text-gray-800">
                                                {sale.top_selling_products.map(
                                                    (product, index) => (
                                                        <span
                                                            key={index}
                                                            className="block"
                                                        >
                                                            {product}
                                                        </span>
                                                    ),
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {sale.sales_transactions}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlySalesSummaryTable;
