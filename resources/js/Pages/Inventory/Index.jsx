import Pagination from '@/Components/Pagination';
import SeletInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Swal2 from 'sweetalert2';
import EditStockModal from './Partials/EditStockModal';

export default function Index({
    products,
    filters,
    lowStockProducts,
    inventoryReport,
    categories,
    selectedCategory,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedStock, setSelectedStock] = useState(null); // Selected category state

    const [search, setSearch] = useState(filters.search || '');

    const [category, setCategory] = useState(selectedCategory || ''); // Category filter state

    console.log(categories);

    // Map categories for the SelectInput component
    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const handleFilter = () => {
        // Use Inertia router to send category filter to the backend
        router.get(
            route('inventory.index'),
            { category }, // Send selected category as a query param
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    Swal2.fire({
                        title: 'Filtering...',
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
                        icon: 'error',
                        title: 'An error occurred. Please try again.',
                    });
                },
            },
        );
    };

    const handleResetCategory = () => {
        setCategory('');
        router.get(
            route('inventory.index'),
            {},
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('inventory.index'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    Swal2.fire({
                        title: 'Searching...',
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
                        icon: 'error',
                        title: 'An error occurred. Please try again.',
                    });
                },
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        router.get(route('inventory.index'), {}, { preserveState: true });
    };

    const handleSaveStock = (quantity) => {
        router.patch(
            route('inventory.update', selectedStock.id),
            {
                quantity: quantity,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onStart: () => {
                    Swal2.fire({
                        title: 'Saving...',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal2.showLoading();
                        },
                    });
                },
                onSuccess: () => {
                    Swal2.close();
                    Swal2.fire({
                        icon: 'success',
                        title: 'Stock updated successfully!',
                    });
                },
                onError: () => {
                    Swal2.close();
                    Swal2.fire({
                        icon: 'error',
                        title: 'An error occurred. Please try again.',
                    });
                },
            },
        );

        setIsModalOpen(false); // Close the modal
    };

    const handleEditClick = (inventory) => {
        setSelectedStock(inventory); // Set the category to be edited
        setIsModalOpen(true); // Open the modal
    };

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    };

    const printRef = useRef(); // Reference to the table content

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML; // Get table content
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
                    Inventory Management
                </h2>
            }
        >
            <Head title="Inventory" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-4 grid-rows-6 gap-4">
                            <div className="col-span-3">
                                <div className="flex justify-between rounded-lg border border-pink-400 bg-white p-6 shadow-lg">
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Restock Inventory
                                        </h5>
                                        <p className="text-sm text-gray-500">
                                            Manage your stocks and inventory
                                        </p>
                                    </div>
                                    <form
                                        onSubmit={handleSearch}
                                        className="flex gap-4"
                                    >
                                        <TextInput
                                            type="text"
                                            className="w-52 rounded-md border border-pink-300 px-4 py-2 text-sm text-gray-800 focus:ring-pink-500"
                                            placeholder="Search products..."
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className="rounded bg-blue-500 px-4 py-1 text-white"
                                        >
                                            Search
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="rounded bg-gray-500 px-4 py-1 text-white"
                                        >
                                            Reset
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-span-3 col-start-1 row-span-4 row-start-2">
                                <div className="rounded-lg border border-pink-400 bg-white p-4 shadow-lg">
                                    <ul className="divide-y divide-gray-100">
                                        {products.data.map((product) => (
                                            <li
                                                key={product.id}
                                                className="flex justify-between py-4"
                                            >
                                                <div className="flex gap-x-4">
                                                    <img
                                                        alt={product.name}
                                                        src={product.imageURL}
                                                        className="h-10 w-10 rounded-full bg-gray-50"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Stock quantity:{' '}
                                                            {
                                                                product
                                                                    .inventory
                                                                    .quantity
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {product.category.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Last Restocked:{' '}
                                                        {formatDateTime(
                                                            product.inventory
                                                                .updated_at,
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                product.inventory,
                                                            )
                                                        }
                                                        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
                                                    >
                                                        Restock
                                                    </button>
                                                </div>
                                            </li>
                                        )) || (
                                            <li className="p-4 text-center">
                                                No products found.
                                            </li>
                                        )}
                                    </ul>
                                    <Pagination value={products} />
                                </div>
                            </div>
                            <div className="col-start-4 row-span-5 row-start-1">
                                <div className="rounded-lg border border-pink-400 bg-white p-6 shadow-lg">
                                    <h5 className="p-3 text-lg font-semibold text-red-500">
                                        Low Stock Alert
                                    </h5>
                                    <div className="max-h-96 overflow-y-auto p-4">
                                        <ul className="divide-y divide-gray-100 p-4">
                                            {lowStockProducts.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="flex items-center gap-x-4 py-5"
                                                >
                                                    <img
                                                        alt=""
                                                        src={product.imageURL}
                                                        className="h-12 w-12 rounded-full bg-gray-50"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Quantity:{' '}
                                                            {
                                                                product
                                                                    .inventory
                                                                    .quantity
                                                            }
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 row-start-6">
                                <div className="flex justify-between rounded-lg border border-pink-400 bg-white p-6 shadow-lg">
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-800">
                                            Inventory Report
                                        </h5>
                                        <p className="text-sm text-gray-500">
                                            View your inventory report
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="flex justify-between space-x-5">
                                            <SeletInput
                                                label="Select Category"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                                className="w-52 rounded-md border border-pink-300 px-4 py-2 text-sm text-gray-800 focus:ring-pink-500"
                                                options={[
                                                    {
                                                        label: 'All Categories',
                                                        value: '',
                                                    },
                                                    ...categoryOptions,
                                                ]}
                                            />
                                            <button
                                                onClick={handleFilter}
                                                className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
                                            >
                                                Filter
                                            </button>
                                            <button
                                                onClick={handleResetCategory}
                                                className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={handlePrint}
                                                className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                                            >
                                                Print Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={printRef}
                            className="mt-3 rounded-lg border border-pink-400 bg-white p-6 shadow-lg"
                        >
                            <div>
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
                                        Invetory Report
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Generated on{' '}
                                        {new Date().toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <table className="w-full border-collapse border border-gray-500 text-center text-sm">
                                <thead className="bg-pink-50">
                                    <tr>
                                        <th className="border border-gray-500 p-2">
                                            Product Name
                                        </th>
                                        <th className="border border-gray-500 p-2">
                                            Category
                                        </th>
                                        <th className="border border-gray-500 p-2">
                                            Sold Quantity
                                        </th>
                                        <th className="border border-gray-500 p-2">
                                            Remaining Quantity
                                        </th>
                                        <th className="border border-gray-500 p-2">
                                            Total Sales Revenue
                                        </th>
                                        <th className="border border-gray-500 p-2">
                                            Estimated Sales
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(inventoryReport) &&
                                    inventoryReport.length > 0 ? (
                                        inventoryReport.map(
                                            (product, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? 'bg-pink-200'
                                                            : ''
                                                    }
                                                >
                                                    {/* Product Name */}
                                                    <td className="border border-gray-500 p-2">
                                                        {product.name}
                                                    </td>
                                                    {/* Units Sold */}
                                                    <td className="border border-gray-500 p-2">
                                                        {product.category}
                                                    </td>
                                                    {/* Total Revenue */}
                                                    <td className="border border-gray-500 p-2">
                                                        {product.sold_quantity}
                                                    </td>
                                                    {/* Category */}
                                                    <td className="border border-gray-500 p-2">
                                                        {
                                                            product.remaining_quantity
                                                        }
                                                    </td>
                                                    {/* Remaining Stock */}
                                                    <td className="border border-gray-500 p-2">
                                                        {new Intl.NumberFormat(
                                                            'en-PH',
                                                            {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            },
                                                        ).format(
                                                            product.total_sales_revenue,
                                                        )}
                                                    </td>
                                                    <td className="border border-gray-500 p-2">
                                                        {new Intl.NumberFormat(
                                                            'en-PH',
                                                            {
                                                                style: 'currency',
                                                                currency: 'PHP',
                                                            },
                                                        ).format(
                                                            product.estimated_sales,
                                                        )}
                                                    </td>
                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="border border-gray-500 p-2"
                                            >
                                                No products with sales found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <EditStockModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                inventory={selectedStock}
                onSave={handleSaveStock}
            />
        </AuthenticatedLayout>
    );
}
