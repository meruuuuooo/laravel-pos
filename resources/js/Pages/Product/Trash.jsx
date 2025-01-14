import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import swal2 from 'sweetalert2';

export default function Trash({ products }) {
    console.log(products);

    const TABLE_HEAD = [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'deleted_at', label: 'Deleted At' },
    ];

    const restoreProduct = (productId) => {
        swal2
            .fire({
                title: 'Restore Product',
                text: 'Are you sure you want to restore this product?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Restore',
                cancelButtonText: 'Cancel',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('product.restore', productId), {
                        preserveScroll: true,
                        preserveState: true,
                        onStart: () => {
                            swal2.fire({
                                title: 'Restoring Product',
                                text: 'Please wait...',
                                showConfirmButton: false,
                                allowOutsideClick: false,
                                willOpen: () => {
                                    swal2.showLoading();
                                },
                            });
                        },
                        onSuccess: () => {
                            swal2.close();
                            swal2.fire(
                                'Restored!',
                                'Your product has been Restored.',
                                'success',
                            );
                        },
                    });
                    // router
                    //     .post(route('product.restore', { product: productId }))
                    //     .then(() => {
                    //         swal2.fire(
                    //             'Restored!',
                    //             'The product has been successfully restored.',
                    //             'success',
                    //         );
                    //     })
                    //     .catch(() => {
                    //         swal2.fire(
                    //             'Error',
                    //             'An error occurred while restoring the product.',
                    //             'error',
                    //         );
                    //     });
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
            <Head title="Trash - Products" />

            <div className="p-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="h-full w-full rounded-lg bg-white shadow">
                                <div className="rounded-t-lg border-b p-4">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        Deleted list
                                    </h5>
                                    <p className="mt-1 text-sm font-normal text-gray-500">
                                        Manage your products here
                                    </p>
                                    <Link href={route('product.index')}>
                                        <p className="mt-1 text-sm font-normal text-blue-500">
                                            Go back
                                        </p>
                                    </Link>
                                </div>
                                <div className="p-4 text-gray-800">
                                    <table className="mt-4 w-full min-w-max table-auto border-collapse text-left">
                                        <thead>
                                            <tr>
                                                {TABLE_HEAD.map(
                                                    ({ key, label }) => (
                                                        <th
                                                            key={key}
                                                            className="border-y border-gray-300 bg-gray-100 p-4 text-sm font-medium text-gray-800"
                                                        >
                                                            {label}
                                                        </th>
                                                    ),
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.data.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3">
                                                        <img
                                                            src={
                                                                product.imageURL
                                                            }
                                                            alt={product.name}
                                                            className="h-10 w-10 rounded-md object-cover"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {product.name}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {product.category
                                                            ?.name ||
                                                            'No Category'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        $
                                                        {product.price.toFixed(
                                                            2,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {product.inventory
                                                            ?.quantity || 0}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {new Date(
                                                            product.deleted_at,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                            onClick={() =>
                                                                restoreProduct(
                                                                    product.id,
                                                                )
                                                            }
                                                        >
                                                            Restore
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    <div className="mt-4">
                                        <Pagination value={products} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
