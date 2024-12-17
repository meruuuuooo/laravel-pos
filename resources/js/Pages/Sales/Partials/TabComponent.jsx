import { useState } from 'react';

const TabComponent = ({ sales, startDate, endDate, totalSalesAmount }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div>
            <div className="mb-4 border-b border-gray-200">
                <ul
                    className="-mb-px flex flex-wrap text-center text-sm font-medium"
                    role="tablist"
                >
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block rounded-t-lg border-b-2 p-4 ${activeTab === 'sales1' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
                            onClick={() => setActiveTab('sales1')}
                            type="button"
                            role="tab"
                            aria-controls="sales1"
                            aria-selected={activeTab === 'sales1'}
                        >
                            Monthly Sales
                        </button>
                    </li>
                    <li className="me-2" role="presentation">
                        <button
                            className={`inline-block rounded-t-lg border-b-2 p-4 ${activeTab === 'sales2' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
                            onClick={() => setActiveTab('sales2')}
                            type="button"
                            role="tab"
                            aria-controls="sales2"
                            aria-selected={activeTab === 'sales2'}
                        >
                            Best Selling Products
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-styled-tab-content">
                {activeTab === 'sales1' && (
                    <div className="rounded-lg bg-gray-50 p-4">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="m-8 overflow-x-auto">
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
                                            A Cosin Street Zone 12 Poblacion,
                                            Tagoloan, Philippines
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            +63 963 131 1938
                                        </p>
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
                                                <th className="border border-gray-500 p-2">
                                                    Products
                                                </th>
                                                <th className="border border-gray-500 p-2">
                                                    Quantity
                                                </th>
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
                                                    className={
                                                        index % 2 === 0
                                                            ? 'bg-pink-200'
                                                            : ''
                                                    }
                                                >
                                                    <td className="border border-gray-400 p-2">
                                                        {sale.sale_date}
                                                    </td>
                                                    <td className="border border-gray-400 p-2">
                                                        {sale.processed_by}
                                                    </td>
                                                    <td className="border border-gray-400 p-2">
                                                        {sale.products
                                                            .map(
                                                                (product) =>
                                                                    product.product_name,
                                                            )
                                                            .join(', ')}
                                                    </td>
                                                    <td className="border border-gray-400 p-2">
                                                        {sale.products
                                                            .map(
                                                                (product) =>
                                                                    product.quantity_sold,
                                                            )
                                                            .join(', ')}
                                                    </td>
                                                    <td className="border border-gray-400 p-2">
                                                        {sale.products
                                                            .map((product) =>
                                                                new Intl.NumberFormat(
                                                                    'en-PH',
                                                                    {
                                                                        style: 'currency',
                                                                        currency:
                                                                            'PHP',
                                                                    },
                                                                ).format(
                                                                    product.line_total,
                                                                ),
                                                            )
                                                            .join(', ')}
                                                    </td>
                                                    <td className="border border-gray-400 p-2">
                                                        {new Intl.NumberFormat(
                                                            'en-PH',
                                                            {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            },
                                                        ).format(
                                                            sale.total_sale_amount,
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Summary Section */}
                                <div className="mx-8 mt-4 text-sm">
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-700">
                                            Total Sales:
                                        </span>
                                        <span className="font-bold text-pink-400">
                                            {new Intl.NumberFormat('en-PH', {
                                                style: 'currency',
                                                currency: 'PHP',
                                            }).format(totalSalesAmount)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-700">
                                            Total Transactions:
                                        </span>
                                        <span className="font-bold text-pink-500">
                                            {sales.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sales2' && (
                    <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            This is some placeholder content the{' '}
                            <strong className="font-medium text-gray-800">
                                Dashboard tab's associated content
                            </strong>
                            .
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabComponent;
