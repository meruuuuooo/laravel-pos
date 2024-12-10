import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
import { useRef, useState } from 'react';

const SalesReport = ({ sales, startDate, endDate, totalSalesAmount }) => {
    const [dateRange, setDateRange] = useState({
        start: startDate,
        end: endDate,
    });

    const reportRef = useRef();

    const handleDateChange = (field, value) => {
        setDateRange((prev) => ({ ...prev, [field]: value }));
    };

    const applyFilter = () => {
        router.get(
            route('sales.monthlySales'),
            {
                start_date: dateRange.start,
                end_date: dateRange.end,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const downloadPDF = () => {
        const element = reportRef.current;
        const options = {
            filename: `Sales_Report_${dateRange.start || 'N/A'}_to_${dateRange.end || 'N/A'}.pdf`,
            jsPDF: { format: 'a4', orientation: 'portrait' },
            html2canvas: { scale: 2 },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };
        html2pdf().set(options).from(element).save();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-pink-500">
                    Monthly Sales Report
                </h2>
            }
        >
            <Head title="Sales Report" />
            <div className="rounded-lg bg-white p-6 shadow-md">
                {/* Date Filter and Actions */}
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                        <label
                            htmlFor="start-date"
                            className="block text-xs font-medium text-gray-700"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="start-date"
                            value={dateRange.start}
                            onChange={(e) =>
                                handleDateChange('start', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="end-date"
                            className="block text-xs font-medium text-gray-700"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="end-date"
                            value={dateRange.end}
                            onChange={(e) =>
                                handleDateChange('end', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                    </div>
                    <div className="flex items-end space-x-2">
                        <button
                            onClick={applyFilter}
                            className="w-full rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                        >
                            Filter
                        </button>
                        <button
                            onClick={downloadPDF}
                            className="w-full rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Report Table */}
                <div ref={reportRef} className="m-8 overflow-x-auto">
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
                                A Cosin Street Zone 12 Poblacion, Tagoloan,
                                Philippines
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
                                Date Range: {dateRange.start} to {dateRange.end}
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
                                            index % 2 === 0 ? 'bg-pink-200' : ''
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
                                                            currency: 'PHP',
                                                        },
                                                    ).format(
                                                        product.line_total,
                                                    ),
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

                    {/* Summary Section */}
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
        </AuthenticatedLayout>
    );
};

export default SalesReport;
