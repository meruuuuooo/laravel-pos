import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ProductTable from './partials/ProductTable';
import SearhForm from './partials/SearchForm';

export default function Index({ products, filters }) {
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
                                            <Link
                                                href={route('product.deleted')}
                                            >
                                                <p className="mt-1 text-sm font-normal text-blue-500">
                                                    View Deleted Products Here
                                                </p>
                                            </Link>
                                        </div>
                                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                            <div className="flex items-center">
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
                                    <div className="gap-4 md:flex-row">
                                        <SearhForm filters={filters} />
                                    </div>
                                </div>
                                <div className="p-4 text-gray-800">
                                    <ProductTable products={products} />
                                    <Pagination value={products} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
