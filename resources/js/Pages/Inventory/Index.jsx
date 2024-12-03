import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import EditStockModal from './Partials/EditStockModal';

export default function Index({ products }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedStock, setSelectedStock] = useState(null); // Selected category state

    const handleSaveStock = (quantity) => {
        router.patch(route('inventory.update', selectedStock.id), {
            quantity: quantity,
        });

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
                        <div className="grid grid-cols-3 gap-2 p-4">
                            {/* Restock Inventory Section */}
                            <div className="col-span-2">
                                <div className="rounded-lg bg-white shadow">
                                    <div className="border-b p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <h5 className="text-lg font-semibold text-gray-800">
                                                    Restock Inventory
                                                </h5>
                                                <p className="text-sm text-gray-500">
                                                    Manage your stocks and
                                                    inventory
                                                </p>
                                            </div>
                                            <div className="w-full md:w-72">
                                                <TextInput
                                                    type="text"
                                                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:ring-pink-500"
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto p-4">
                                        <ul className="divide-y divide-gray-100">
                                            {products.map((product) => (
                                                <li
                                                    key={product.id}
                                                    className="flex justify-between py-5"
                                                >
                                                    <div className="flex gap-x-4">
                                                        <img
                                                            alt=""
                                                            src={
                                                                product.imageURL
                                                            }
                                                            className="h-12 w-12 rounded-full bg-gray-50"
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
                                                            {
                                                                product.category
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Last Restocked:{' '}
                                                            {formatDateTime(
                                                                product
                                                                    .inventory
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
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Low Stock Alert Section */}
                            <div className="col-span-1">
                                <h5 className="p-3 text-lg font-semibold text-red-500">
                                    Low Stock Alert
                                </h5>
                                <div className="max-h-96 overflow-y-auto p-4">
                                    <ul className="divide-y divide-gray-100 p-4">
                                        {products
                                            .filter(
                                                (product) =>
                                                    product.inventory.quantity <
                                                    5,
                                            ) // Adjust threshold as needed
                                            .map((product) => (
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
