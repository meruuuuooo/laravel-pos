import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, Link, router } from '@inertiajs/react';
import swal2 from 'sweetalert2';

const TABLE_HEAD = [
    'Image',
    'Name',
    'Category',
    'price',
    'quantity',
    'Created At',
    '',
];

const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};

export default function Index({ products }) {
    const handleDeleteProduct = (id) => {
        swal2
            .fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this product!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('product.destroy', id), {
                        preserveScroll: true,
                        preserveState: true,
                        onSuccess: () => {
                            swal2.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success',
                            );
                        },
                    });
                }
            });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product Management
                </h2>
            }
        >
            <Head title="Product" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="h-full w-full rounded-lg bg-white shadow">
                                <div className="rounded-t-lg border-b p-4">
                                    <div className="mb-8 flex items-center justify-between gap-8">
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800">
                                                Product List
                                            </h5>
                                            <p className="mt-1 text-sm font-normal text-gray-500">
                                                Manage your products here
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                            <div className="flex items-center">
                                                <p className="mx-2 text-sm">
                                                    total : 10
                                                </p>

                                                <Link
                                                    href={route(
                                                        'product.create',
                                                    )}
                                                >
                                                    <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-700 focus:ring-pink-500 active:bg-green-900">
                                                        Add new product
                                                    </PrimaryButton>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                        <div className="w-full md:w-72">
                                            <TextInput
                                                type="text"
                                                className="w-full rounded-md border border-pink-300 px-4 py-2 text-sm focus:ring-pink-500"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <table className="mt-4 w-full min-w-max table-auto text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map((head) => (
                                                    <th
                                                        key={head}
                                                        className="border-y border-pink-500 bg-pink-50/50 p-4 text-sm font-medium text-gray-800"
                                                    >
                                                        {head}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-4 py-3">
                                                        <img
                                                            src={
                                                                product.imageURL
                                                            }
                                                            alt="Product"
                                                            className="h-10 w-10 rounded-md"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {product.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {product.category.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {product.price}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {
                                                            product.inventory
                                                                .quantity
                                                        }
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {formatDateTime(
                                                            product.created_at,
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Link
                                                            href={route(
                                                                'product.edit',
                                                                product.id,
                                                            )}
                                                        >
                                                            <button className="p-2 text-blue-500 hover:text-blue-700">
                                                                <PencilIcon className="h-4 w-4" />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                handleDeleteProduct(
                                                                    product.id,
                                                                );
                                                            }}
                                                            className="p-2 text-red-500 hover:text-red-700"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
