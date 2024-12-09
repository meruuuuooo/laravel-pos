import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import html2pdf from 'html2pdf.js';
import { useRef, useState } from 'react';

const BestSellingProducts = ({ sales, startDate, endDate }) => {
    const [dateRange, setDateRange] = useState({
        start: startDate,
        end: endDate,
    });

    const reportRef = useRef();

    // Calculate Total Revenue
    const totalRevenue = sales.reduce(
        (total, product) => total + product.total_revenue,
        0,
    );

    const handleDateChange = (field, value) => {
        setDateRange((prev) => ({ ...prev, [field]: value }));
    };

    const applyFilter = () => {
        router.get(
            route('sales.bestSellingProducts'),
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
            filename: `Bestselling_Products_Report_${dateRange.start || 'N/A'}_to_${dateRange.end || 'N/A'}.pdf`,
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
                    Top 10 Best-Selling Products
                </h2>
            }
        >
            <Head title="Sales Report" />
            <div className="rounded-lg bg-white p-8 shadow-md">
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
                            className="mt-1 w-full rounded-md border-pink-300 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500"
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
                            className="mt-1 w-full rounded-md border-pink-300 text-sm shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        />
                    </div>
                    <div className="flex items-end space-x-2">
                        <button
                            onClick={applyFilter}
                            className="w-full rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                        >
                            Apply Range Filter
                        </button>
                        <button
                            onClick={downloadPDF}
                            className="w-full rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Report Section */}
                <div ref={reportRef} className="m-8 overflow-x-auto">
                    <div className="flex flex-col items-center justify-center">
                        {/* Report Header */}
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
                                Bestselling Products Report
                            </h2>
                            <p className="text-xs text-gray-500">
                                Date Range: {dateRange.start} to {dateRange.end}
                            </p>
                        </div>
                        <table className="w-full border-collapse border border-pink-500 text-center text-sm">
                            <thead className="bg-pink-50">
                                <tr>
                                    <th className="border border-pink-500 p-2">
                                        Rank
                                    </th>
                                    <th className="border border-pink-500 p-2">
                                        Product Name
                                    </th>
                                    <th className="border border-pink-500 p-2">
                                        Units Sold
                                    </th>
                                    <th className="border border-pink-500 p-2">
                                        Total Revenue
                                    </th>
                                    <th className="border border-pink-500 p-2">
                                        Category
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((product, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0 ? 'bg-pink-50' : ''
                                        }
                                    >
                                        <td className="border border-pink-500 p-2">
                                            {product.rank}
                                        </td>
                                        <td className="border border-pink-500 p-2">
                                            {product.product_name}
                                        </td>
                                        <td className="border border-pink-500 p-2">
                                            {product.total_quantity_sold}
                                        </td>
                                        <td className="border border-pink-500 p-2">
                                            {new Intl.NumberFormat('en-PH', {
                                                style: 'currency',
                                                currency: 'PHP',
                                            }).format(product.total_revenue)}
                                        </td>
                                        <td className="border border-pink-500 p-2">
                                            {product.category_name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Section */}
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default BestSellingProducts;
