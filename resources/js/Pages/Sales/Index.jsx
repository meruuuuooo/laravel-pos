import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
// import MonthlySalesSummaryTable from './Partials/MonthlySalesSummaryTable';
import { useEffect, useRef, useState } from 'react';
import Swal2 from 'sweetalert2';

export default function Index({
    sales,
    topProducts,
    startDate,
    endDate,
    totalSalesAmount,
}) {
    const [activeTab, setActiveTab] = useState('profile');
    const [dateRange, setDateRange] = useState({
        start: startDate,
        end: endDate,
    });

    useEffect(() => {
        setActiveTab('sales1');
    }, []);

    const reportSalesRef = useRef(null); // For Sales Report
    const reportBestsellersRef = useRef(null); // For Bestselling Products

    const totalRevenue = topProducts.reduce(
        (total, product) => total + product.total_revenue,
        0,
    );

    const handleDateChange = (field, value) => {
        setDateRange((prev) => ({ ...prev, [field]: value }));
    };

    const applyFilter = () => {
        router.get(
            route('sale.index'),
            {
                start_date: dateRange.start,
                end_date: dateRange.end,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => {
                    Swal2.fire({
                        title: 'Loading...',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal2.showLoading();
                        },
                    });
                },
                onSuccess: () => {
                    Swal2.close();
                },
                onError: () => {
                    Swal2.close();
                    Swal2.fire({
                        title: 'Error!',
                        text: 'An error occurred while fetching data.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                },
            },
        );
    };

    const handleReset = () => {
        setDateRange({
            start: startDate,
            end: endDate,
        });

        router.get(
            route('sale.index'),
            {},
            { preserveScroll: true, preserveState: true },
        );
    };

    // Print Sales Report
    const printSalesReport = () => {
        const printContent = reportSalesRef.current.innerHTML; // Get table content
        const originalContent = document.body.innerHTML; // Store original page content

        document.body.innerHTML = printContent; // Replace page content with table content
        window.print(); // Trigger the print dialog
        document.body.innerHTML = originalContent; // Restore original content
        window.location.reload(); // Reload the page to reset state
    };

    // Print Bestselling Products Report
    const printBestsellersReport = () => {
        const printContent = reportBestsellersRef.current.innerHTML; // Get table content
        const originalContent = document.body.innerHTML; // Store original page content

        document.body.innerHTML = printContent; // Replace page content with table content
        window.print(); // Trigger the print dialog
        document.body.innerHTML = originalContent; // Restore original content
        window.location.reload(); // Reload the page to reset state
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sales Report
                </h2>
            }
        >
            <Head title="Sales Report" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="h-full w-full rounded-lg bg-white p-6 shadow">
                        <div className="rounded-t-lg border-b p-4">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        Generate Sales Report
                                    </h5>
                                    <p className="mt-1 text-sm font-normal text-gray-500">
                                        Track your sales performance
                                    </p>
                                </div>
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
                                                handleDateChange(
                                                    'start',
                                                    e.target.value,
                                                )
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
                                                handleDateChange(
                                                    'end',
                                                    e.target.value,
                                                )
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
                                            onClick={handleReset}
                                            className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 border-b border-gray-200">
                                    <ul
                                        className="-mb-px flex flex-wrap text-center text-sm font-medium"
                                        role="tablist"
                                    >
                                        <li
                                            className="me-2"
                                            role="presentation"
                                        >
                                            <button
                                                className={`inline-block rounded-t-lg border-b-2 p-4 ${activeTab === 'sales1' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
                                                onClick={() =>
                                                    setActiveTab('sales1')
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls="sales1"
                                                aria-selected={
                                                    activeTab === 'sales1'
                                                }
                                            >
                                                Monthly Sales
                                            </button>
                                        </li>
                                        <li
                                            className="me-2"
                                            role="presentation"
                                        >
                                            <button
                                                className={`inline-block rounded-t-lg border-b-2 p-4 ${activeTab === 'sales2' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-600'}`}
                                                onClick={() =>
                                                    setActiveTab('sales2')
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls="sales2"
                                                aria-selected={
                                                    activeTab === 'sales2'
                                                }
                                            >
                                                Best Selling Products
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <div id="default-styled-tab-content">
                                    {activeTab === 'sales1' && (
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <div className="mb-4 flex justify-between">
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    Sales Report
                                                </h5>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={
                                                            printSalesReport
                                                        }
                                                        className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                                                    >
                                                        Print Report
                                                    </button>
                                                </div>
                                            </div>
                                            <div ref={reportSalesRef}>
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
                                                                Pats Convenience
                                                                Store
                                                            </h1>
                                                            <p className="text-sm text-gray-600">
                                                                A Cosin Street
                                                                Zone 12
                                                                Poblacion,
                                                                Tagoloan,
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
                                                                Date Range:{' '}
                                                                {startDate} -{' '}
                                                                {endDate}
                                                            </p>
                                                        </div>
                                                        <table className="w-full border-collapse border border-gray-500 text-center text-sm">
                                                            <thead className="bg-pink-50">
                                                                <tr>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Sale
                                                                        Date
                                                                    </th>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Processed
                                                                        By
                                                                    </th>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Products
                                                                    </th>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Quantity
                                                                    </th>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Line
                                                                        Total
                                                                    </th>
                                                                    <th className="border border-gray-500 p-2">
                                                                        Total
                                                                        Sale
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {sales.map(
                                                                    (
                                                                        sale,
                                                                        index,
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                            className={
                                                                                index %
                                                                                    2 ===
                                                                                0
                                                                                    ? 'bg-pink-200'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            <td className="border border-gray-400 p-2">
                                                                                {
                                                                                    sale.sale_date
                                                                                }
                                                                            </td>
                                                                            <td className="border border-gray-400 p-2">
                                                                                {
                                                                                    sale.processed_by
                                                                                }
                                                                            </td>
                                                                            <td className="border border-gray-400 p-2">
                                                                                {sale.products
                                                                                    .map(
                                                                                        (
                                                                                            product,
                                                                                        ) =>
                                                                                            product.product_name,
                                                                                    )
                                                                                    .join(
                                                                                        ', ',
                                                                                    )}
                                                                            </td>
                                                                            <td className="border border-gray-400 p-2">
                                                                                {sale.products
                                                                                    .map(
                                                                                        (
                                                                                            product,
                                                                                        ) =>
                                                                                            product.quantity_sold,
                                                                                    )
                                                                                    .join(
                                                                                        ', ',
                                                                                    )}
                                                                            </td>
                                                                            <td className="border border-gray-400 p-2">
                                                                                {sale.products
                                                                                    .map(
                                                                                        (
                                                                                            product,
                                                                                        ) =>
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
                                                                                    .join(
                                                                                        ', ',
                                                                                    )}
                                                                            </td>
                                                                            <td className="border border-gray-400 p-2">
                                                                                {new Intl.NumberFormat(
                                                                                    'en-PH',
                                                                                    {
                                                                                        style: 'currency',
                                                                                        currency:
                                                                                            'PHP',
                                                                                    },
                                                                                ).format(
                                                                                    sale.total_sale_amount,
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ),
                                                                )}
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
                                                                {new Intl.NumberFormat(
                                                                    'en-PH',
                                                                    {
                                                                        style: 'currency',
                                                                        currency:
                                                                            'PHP',
                                                                    },
                                                                ).format(
                                                                    totalSalesAmount,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between py-2">
                                                            <span className="text-gray-700">
                                                                Total
                                                                Transactions:
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
                                            <div className="mb-4 flex justify-between">
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    Best Selling Products
                                                </h5>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={
                                                            printBestsellersReport
                                                        }
                                                        className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                                                    >
                                                        Print Report
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                ref={reportBestsellersRef}
                                                className="m-8 overflow-x-auto"
                                            >
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="mb-4 text-center">
                                                        <img
                                                            src="/icons/Business logo.jpeg"
                                                            alt="Business Logo"
                                                            className="mx-auto h-20 w-auto"
                                                        />
                                                        <h1 className="text-xl font-bold text-pink-600">
                                                            Pats Convenience
                                                            Store
                                                        </h1>
                                                        <p className="text-sm text-gray-600">
                                                            A Cosin Street Zone
                                                            12 Poblacion,
                                                            Tagoloan,
                                                            Philippines
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            +63 963 131 1938
                                                        </p>
                                                    </div>
                                                    <div className="mb-4 text-center">
                                                        <h2 className="text-lg font-semibold text-pink-600">
                                                            Bestselling Products
                                                            Report
                                                        </h2>
                                                        <p className="text-xs text-gray-500">
                                                            Date Range:{' '}
                                                            {dateRange.start} to{' '}
                                                            {dateRange.end}
                                                        </p>
                                                    </div>
                                                    <table className="w-full border-collapse border border-gray-500 text-center text-sm">
                                                        <thead className="bg-pink-50">
                                                            <tr>
                                                                <th className="border border-gray-500 p-2">
                                                                    Rank
                                                                </th>
                                                                <th className="border border-gray-500 p-2">
                                                                    Product Name
                                                                </th>
                                                                <th className="border border-gray-500 p-2">
                                                                    Units Sold
                                                                </th>
                                                                <th className="border border-gray-500 p-2">
                                                                    Total
                                                                    Revenue
                                                                </th>
                                                                <th className="border border-gray-500 p-2">
                                                                    Category
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {topProducts.map(
                                                                (
                                                                    product,
                                                                    index,
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={
                                                                            index %
                                                                                2 ===
                                                                            0
                                                                                ? 'bg-pink-200'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        <td className="border border-gray-500 p-2">
                                                                            {
                                                                                product.rank
                                                                            }
                                                                        </td>
                                                                        <td className="border border-gray-500 p-2">
                                                                            {
                                                                                product.product_name
                                                                            }
                                                                        </td>
                                                                        <td className="border border-gray-500 p-2">
                                                                            {
                                                                                product.total_quantity_sold
                                                                            }
                                                                        </td>
                                                                        <td className="border border-gray-500 p-2">
                                                                            {new Intl.NumberFormat(
                                                                                'en-PH',
                                                                                {
                                                                                    style: 'currency',
                                                                                    currency:
                                                                                        'PHP',
                                                                                },
                                                                            ).format(
                                                                                product.total_revenue,
                                                                            )}
                                                                        </td>
                                                                        <td className="border border-gray-500 p-2">
                                                                            {
                                                                                product.category_name
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ),
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>

                                                {/* Summary Section */}
                                                <div className="mx-8 mt-8 border-t pt-4">
                                                    <h3 className="text-lg font-semibold text-pink-600">
                                                        Sales Summary
                                                    </h3>
                                                    <div className="flex justify-between text-sm">
                                                        <span>
                                                            Total Revenue:
                                                        </span>
                                                        <span className="font-bold text-pink-600">
                                                            {new Intl.NumberFormat(
                                                                'en-PH',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'PHP',
                                                                },
                                                            ).format(
                                                                totalRevenue,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
