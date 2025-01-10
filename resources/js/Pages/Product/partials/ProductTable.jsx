import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link, router } from '@inertiajs/react';
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

export default function ProductTable({ products }) {
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
                        onStart: () => {
                            swal2.fire({
                                title: 'Deleting Product',
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
                {products.data.map((product) => (
                    <tr key={product.id}>
                        <td className="px-4 py-3">
                            <img
                                src={product.imageURL}
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
                            {product.inventory.quantity}
                        </td>
                        <td className="px-4 py-3 text-gray-800">
                            {formatDateTime(product.created_at)}
                        </td>
                        <td>
                            <Link href={route('product.edit', product.id)}>
                                <button className="p-2 text-blue-500 hover:text-blue-700">
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                            </Link>
                            <button
                                onClick={() => {
                                    handleDeleteProduct(product.id);
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
    );
}
