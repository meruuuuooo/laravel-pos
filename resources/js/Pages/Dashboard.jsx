import BarChart from '@/Components/BarChart';
import Pagination from '@/Components/Pagination';
import ReceiptModal from '@/Components/ReceiptModal';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@headlessui/react';
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
    lowStockProducts,
}) {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    // Function to open the modal and set the selected log
    const openModal = (log) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null);
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
                    <div className="grid grid-cols-4 grid-rows-5 gap-4">
                        <div className="border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="flex flex-col items-start">
                                <img
                                    src="/icons/d-sales.png"
                                    alt="sales-icon"
                                    className="h-1/6 w-20 p-2"
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
                                    className="h-1/6 w-20 p-2"
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
                                    className="h-1/6 w-20 p-2"
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
                                    className="h-1/6 w-20 p-2"
                                />

                                <span className="py-2 text-2xl font-semibold text-pink-500">
                                    {totalCategory}
                                </span>
                                <p className="text-sm text-gray-500">
                                    Total Category
                                </p>
                            </div>
                        </div>
                        <div className="col-span-3 row-span-2 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
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
                        <div className="col-start-4 row-span-2 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="rounded-lg bg-white p-6 shadow-md">
                                <h2 className="mb-4 text-xl font-semibold text-red-800">
                                    Low Stock Products
                                </h2>
                                {lowStockProducts.length > 0 ? (
                                    <div className="max-h-96 space-y-4 overflow-y-auto">
                                        <ul className="space-y-4">
                                            {lowStockProducts.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center space-x-4 rounded-md bg-red-50 p-4 shadow-sm"
                                                >
                                                    {/* Product Image */}
                                                    <img
                                                        src={
                                                            item.product
                                                                .imageURL
                                                        }
                                                        alt={item.product.name}
                                                        className="h-12 w-12 rounded-md object-cover"
                                                    />
                                                    {/* Product Info */}
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-800">
                                                            {item.product.name}
                                                        </h3>
                                                        <p className="text-sm font-semibold text-red-700">
                                                            Quantity:{' '}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">
                                        No low-stock products found.
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-span-4 row-span-2 row-start-4 border border-pink-400 bg-white p-3 shadow-sm sm:rounded-lg">
                            <div className="px-3">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Logs
                                </h2>
                                <div className="max-h-96 overflow-y-auto p-2">
                                    <ul className="divide-y divide-gray-100">
                                        {logs.data.map((log) => (
                                            <li key={log.id} className="py-2">
                                                {/* Sale Information */}
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            Cashier:{' '}
                                                            {log.cashier ||
                                                                'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-900">
                                                            Products Sold:{' '}
                                                            {log.products_sold ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    {/* Product Images */}
                                                    <div className="flex items-start justify-start gap-2 overflow-x-auto">
                                                        {log.products.map(
                                                            (
                                                                product,
                                                                index,
                                                            ) => (
                                                                <img
                                                                    key={index}
                                                                    alt={
                                                                        product.name ||
                                                                        'Product Image'
                                                                    }
                                                                    src={
                                                                        product.imageURL ||
                                                                        '/placeholder.jpg'
                                                                    }
                                                                    className="h-12 w-12 rounded-md bg-gray-50"
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-900">
                                                            Total:{' '}
                                                            {new Intl.NumberFormat(
                                                                'en-PH',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'PHP',
                                                                },
                                                            ).format(
                                                                log.total_amount ||
                                                                    0,
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Sold At:{' '}
                                                            {new Date(
                                                                log.sold_at,
                                                            ).toLocaleString(
                                                                'en-PH',
                                                                {
                                                                    dateStyle:
                                                                        'medium',
                                                                    timeStyle:
                                                                        'short',
                                                                },
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-900">
                                                            Payment Method:{' '}
                                                            {log.payment_method ||
                                                                'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-900">
                                                            Amount:{' '}
                                                            {new Intl.NumberFormat(
                                                                'en-PH',
                                                                {
                                                                    style: 'currency',
                                                                    currency:
                                                                        'PHP',
                                                                },
                                                            ).format(
                                                                log.payment_amount ||
                                                                    0,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            onClick={() =>
                                                                openModal(log)
                                                            }
                                                            className="w-full rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                                                        >
                                                            View Receipt
                                                        </Button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Pagination value={logs} />
                                <ReceiptModal
                                    isOpen={isModalOpen}
                                    closeModal={closeModal}
                                    log={selectedLog}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
