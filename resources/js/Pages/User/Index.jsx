import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UserTable from './Partials/UserTable';

export default function Index({ users }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User Management
                </h2>
            }
        >
            <Head title="User" />

            <div className="p-6">
                <div className="w-96 pb-4">
                    <div className="w-70 box-border h-40 rounded-md border-4 border-pink-500 p-3">
                        <p className="text-gray-500">Total Users</p>
                        <div className="flex items-center justify-evenly">
                            <p className="text-5xl italic text-pink-500">
                                {users.length}
                            </p>
                            <img
                                src="./icons/icons8-users-96.png"
                                alt="Product"
                                className="h-20 w-20 rounded-md"
                            />
                        </div>
                    </div>
                </div>
                {/* User table component */}
                <UserTable users={users} />
            </div>
        </AuthenticatedLayout>
    );
}
