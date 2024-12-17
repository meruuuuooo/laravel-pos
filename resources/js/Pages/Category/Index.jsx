import InputError from '@/Components/InputError';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import swal2 from 'sweetalert2';
import EditCategoryModal from './Partials/EditCategoryModal';

const TABLE_HEAD = ['ID', 'Name', 'Created At', 'Updated At', 'Action'];

export default function Index({ categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [selectedCategory, setSelectedCategory] = useState(null); // Selected category state
    const [search, setSearch] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('category.index', { search }),
            {
                preserveScroll: true,
                preserveState: true,
            },
            {
                onStart: () => {
                    swal2.fire({
                        title: 'Searching',
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
                },
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        router.get(route('category.index'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleSaveCategory = (newName) => {
        router.patch(route('category.update', selectedCategory.id), {
            name: newName,
        });

        setIsModalOpen(false); // Close the modal
    };

    const handleEditClick = (category) => {
        setSelectedCategory(category); // Set the category to be edited
        setIsModalOpen(true); // Open the modal
    };

    const handleDelete = (category) => {
        swal2
            .fire({
                title: 'Are you sure?',
                text: 'You will not able to recover this category!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(
                        route('category.destroy', { category: category }),
                        {
                            preserveScroll: true,
                            preserveState: true,
                            onStart: () => {
                                swal2.fire({
                                    title: 'Deleting Category',
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
                                    'Success',
                                    'Category deleted successfully',
                                    'success',
                                );
                            },
                            onError: () => {
                                swal2.close();
                                swal2.fire(
                                    'Error',
                                    'An error occurred. Please try again.',
                                    'error',
                                );
                            },
                        },
                    );
                }
            });
    };

    const { data, setData, post, errors, reset } = useForm({
        name: '',
    });

    const AddCategory = (e) => {
        e.preventDefault();

        post(route('category.store'), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset('name'),
            onStart: () => {
                swal2.fire({
                    title: 'Adding Category',
                    text: 'Please wait...',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    willOpen: () => {
                        swal2.showLoading();
                    },
                });
            },
            onSuccess: () => {
                swal2.fire('Success', 'Category added successfully', 'success');
            },
        });
    };

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Category Management
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
                                                Category
                                            </h5>
                                            <p className="mt-1 text-sm font-normal text-gray-500">
                                                Manage your Category here
                                            </p>
                                        </div>
                                        <div>
                                            <form
                                                onSubmit={handleSearch}
                                                className="flex gap-3"
                                            >
                                                <TextInput
                                                    type="text"
                                                    className="w-52 rounded-md border border-pink-300 px-4 py-2 text-sm text-gray-800 focus:ring-pink-500"
                                                    placeholder="Search products..."
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value,
                                                        )
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
                                    <form onSubmit={AddCategory}>
                                        <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
                                            <div className="w-full md:w-72">
                                                <TextInput
                                                    id="category"
                                                    type="text"
                                                    name="category"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            'name',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-md border border-pink-300 px-4 py-2 text-sm text-gray-900 focus:ring-pink-500"
                                                    placeholder="Enter category name"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.name}
                                                />
                                            </div>
                                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                                <div className="flex items-center">
                                                    <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-700 focus:ring-pink-500 active:bg-green-900">
                                                        Add new category
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="p-4 text-gray-800">
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
                                            {categories.data.map((category) => (
                                                <tr key={category.id}>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {category.id}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {category.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {formatDateTime(
                                                            category.created_at,
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-800">
                                                        {formatDateTime(
                                                            category.updated_at,
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    category,
                                                                )
                                                            } // Pass category to handler
                                                            className="p-2 text-blue-500 hover:text-blue-700"
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category,
                                                                )
                                                            }
                                                            className="p-2 text-red-500 hover:text-red-700"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination value={categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Editing Category */}
            <EditCategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
                onSave={handleSaveCategory}
            />
        </AuthenticatedLayout>
    );
}
