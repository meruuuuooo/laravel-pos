import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
// import MonthlySalesSummaryTable from './Partials/MonthlySalesSummaryTable';
import ProductSalesComparison from './Partials/ProductSalesComparison';
import SalesComparison from './Partials/SalesComparison';

export default function Index({ today, yesterday, productSalesComparison }) {
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
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Sales Comparison */}
                        <div className="border border-pink-400 bg-white p-4 shadow-sm sm:rounded-lg">
                            <h5 className="mb-4 text-lg font-semibold text-gray-800">
                                Sales Comparison
                            </h5>
                            <SalesComparison
                                todaysSales={today}
                                yesterdaysSales={yesterday}
                            />
                        </div>

                        {/* Product Sales Comparison */}
                        <div className="border border-pink-400 bg-white p-4 shadow-sm sm:rounded-lg">
                            <h5 className="mb-4 text-lg font-semibold text-gray-800">
                                Product Sales Comparison
                            </h5>
                            <ProductSalesComparison
                                productSalesComparison={productSalesComparison}
                            />
                        </div>
                    </div>

                    <div className="h-full w-full rounded-lg bg-white shadow">
                        <div className="rounded-t-lg border-b p-4">
                            <div className="mb-8">
                                <h5 className="text-lg font-semibold text-gray-800">
                                    Generate Sales Report
                                </h5>
                                <p className="mt-1 text-sm font-normal text-gray-500">
                                    Track your sales performance
                                </p>
                            </div>
                            <div className="flex flex-row gap-4">
                                <Link href={route('sales.monthlySales')}>
                                    <button className="w-64 rounded-lg bg-blue-400 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        View Monthly Sales Report
                                    </button>
                                </Link>
                                <Link href={route('sales.bestSellingProducts')}>
                                    <button className="w-64 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                        View Top Products Report
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
