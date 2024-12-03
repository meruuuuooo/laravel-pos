import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-8 grid-rows-9 gap-4">
                        <div className="col-span-2 row-span-2 bg-white p-3 shadow-sm sm:rounded-lg">
                            <p>content 1</p>
                        </div>
                        <div className="col-span-2 col-start-3 row-span-2 bg-white p-3 shadow-sm sm:rounded-lg">
                            <p>content 2</p>
                        </div>
                        <div className="col-span-2 col-start-5 row-span-2 bg-white p-3 shadow-sm sm:rounded-lg">
                            <p>content 3</p>
                        </div>
                        <div className="col-span-2 col-start-7 row-span-2 bg-white p-3 shadow-sm sm:rounded-lg">
                            <p>content 4</p>
                        </div>
                        <div className="col-span-5 row-span-4 row-start-3 bg-white p-3 shadow-sm sm:rounded-lg">
                            sales chart
                        </div>
                        <div className="col-span-3 col-start-6 row-span-7 row-start-3 bg-white p-3 shadow-sm sm:rounded-lg">
                            product chart
                        </div>
                        <div className="col-span-5 row-span-3 row-start-7 bg-white p-3 shadow-sm sm:rounded-lg">
                            logs
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
