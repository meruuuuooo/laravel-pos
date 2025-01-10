import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Swal2 from 'sweetalert2';
import BestProductReportComponent from './Partials/BestProductReport';
import SalesReportComponent from './Partials/SalesReport';

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
    const handlePrintSalesReport = () => {
        const printContent = reportSalesRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    // Print Bestselling Products Report
    const handlePrintBestsellersReport = () => {
        const printContent = reportBestsellersRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
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
                                        <SalesReportComponent
                                            printSalesReport={
                                                handlePrintSalesReport
                                            }
                                            reportSalesRef={reportSalesRef}
                                            sales={sales}
                                            startDate={startDate}
                                            endDate={endDate}
                                            totalSalesAmount={totalSalesAmount}
                                        />
                                    )}

                                    {activeTab === 'sales2' && (
                                        <BestProductReportComponent
                                            printBestsellersReport={
                                                handlePrintBestsellersReport
                                            }
                                            reportBestsellersRef={
                                                reportBestsellersRef
                                            }
                                            topProducts={topProducts}
                                            startDate={startDate}
                                            endDate={endDate}
                                            totalRevenue={totalRevenue}
                                        />
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
