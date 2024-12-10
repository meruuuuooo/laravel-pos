import BarChart from '@/Components/BarChart';
import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const PERIOD = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];

export default function Dashboard({
    totalSales,
    totalInventories,
    totalProduct,
    totalCategory,
    salesData,
    logs,
}) {
    console.log(logs);

    const [period, setPeriod] = useState('daily');
    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const labels = salesData.map((item) => item.period);
        const data = salesData.map((item) => item.total_sales);

        setChartLabels(labels);
        setChartData(data);
    }, [salesData]);

    const handlePeriodChange = (e) => {
        const selectedPeriod = e.target.value;
        setPeriod(selectedPeriod);

        router.get(
            route('dashboard'),
            { period: selectedPeriod },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 grid-rows-6 gap-4">
                        <div className="border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-start">
                                <img
                                    src="/icons/d-sales.png"
                                    alt="sales-icon"
                                    className="h-12 w-12 p-2"
                                />

                                <span className="py-2 text-2xl font-semibold text-pink-500">
                                    {new Intl.NumberFormat('en-PH', {
                                        style: 'currency',
                                        currency: 'PHP',
                                    }).format(totalSales)}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Total Sales
                                </p>
                            </div>
                        </div>
                        <div className="border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-start">
                                <img
                                    src="/icons/d-inventory.png"
                                    alt="inventory-icon"
                                    className="h-12 w-12 p-2"
                                />

                                <span className="py-2 text-2xl font-semibold text-pink-500">
                                    {totalInventories}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Total Invetory
                                </p>
                            </div>
                        </div>
                        <div className="border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-start">
                                <img
                                    src="/icons/d-product.png"
                                    alt="product-icon"
                                    className="h-12 w-12 p-2"
                                />

                                <span className="py-2 text-2xl font-semibold text-pink-500">
                                    {totalProduct}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Total Product
                                </p>
                            </div>
                        </div>
                        <div className="border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-start">
                                <img
                                    src="/icons/d-categories.png"
                                    alt="category-icon"
                                    className="h-12 w-12 p-2"
                                />

                                <span className="py-2 text-2xl font-semibold text-pink-500">
                                    {totalCategory}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Total Category
                                </p>
                            </div>
                        </div>
                        <div className="col-span-3 row-span-3 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="px-3">
                                <div className="flex flex-row justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Sales Analytics
                                    </h2>

                                    <SelectInput
                                        name="period"
                                        value={period}
                                        onChange={handlePeriodChange}
                                        className="h-10 w-1/4"
                                        options={PERIOD}
                                    />
                                </div>
                                <div className="grid w-[800px] justify-items-center p-2">
                                    <BarChart
                                        labels={chartLabels}
                                        data={chartData}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-start-4 row-span-3 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="px-3">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Products
                                </h2>
                            </div>
                        </div>
                        <div className="col-span-4 row-span-2 row-start-5 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="px-3">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Logs
                                </h2>
                                <div className="max-h-96 overflow-y-auto p-2">
                                    <ul className="divide-y divide-gray-100">
                                        {logs.data.map((log) => (
                                            <li
                                                key={log.id}
                                                className="flex justify-between py-2"
                                            >
                                                {/* Product Information */}
                                                <div className="flex gap-x-4">
                                                    <img
                                                        alt={
                                                            log.product?.name ||
                                                            'Product Image'
                                                        }
                                                        src={
                                                            log.product
                                                                ?.imageURL ||
                                                            '/placeholder.jpg'
                                                        }
                                                        className="h-12 w-12 rounded-md bg-gray-50"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {log.product
                                                                ?.name || 'N/A'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Sold by:{' '}
                                                            {log.sale.user
                                                                .name || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Sale Information */}
                                                <div>
                                                    <p className="text-sm text-gray-900">
                                                        Quantity Sold:{' '}
                                                        {log.quantity_sold || 0}
                                                    </p>
                                                    <p className="text-sm text-gray-900">
                                                        Total:{' '}
                                                        {new Intl.NumberFormat(
                                                            'en-PH',
                                                            {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            },
                                                        ).format(
                                                            log.line_total || 0,
                                                        )}
                                                    </p>
                                                </div>
                                                {/* Time of Sale */}
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Sold At:{' '}
                                                        {new Date(
                                                            log.sale.created_at,
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            },
                                                        )}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Pagination value={logs} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
