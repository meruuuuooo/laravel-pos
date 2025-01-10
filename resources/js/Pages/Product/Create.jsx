import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CreateForm from './partials/CreateForm';

export default function Create({ categories }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Product
                </h2>
            }
        >
            <Head title="Product" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <CreateForm categories={categories} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
