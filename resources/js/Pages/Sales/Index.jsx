import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const MONTHS = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

export default function Index() {
    const people = [
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sales Report
                </h2>
            }
        >
            <Head title="Sales Report" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-6 grid-rows-4 gap-6">
                        {/* First Column */}
                        <div className="col-span-2 row-span-1 bg-white p-4 shadow-sm sm:rounded-lg">
                            <p>Content for column 1.</p>
                        </div>

                        {/* Second Column */}
                        <div className="col-span-2 col-start-3 row-span-1 bg-white p-4 shadow-sm sm:rounded-lg">
                            <p>Content for column 2.</p>
                        </div>

                        {/* Third Column */}
                        <div className="col-span-2 col-start-5 row-span-1 bg-white p-4 shadow-sm sm:rounded-lg">
                            <p>Content for column 3.</p>
                        </div>

                        {/* Full Width Content */}
                        <div className="col-span-6 row-span-3 bg-white p-4 shadow-sm sm:rounded-lg">
                            <div className="rounded-lg bg-white shadow">
                                <div className="border-b p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800">
                                                Sales Data
                                            </h5>
                                            <p className="text-sm text-gray-500">
                                                View sales data
                                            </p>
                                        </div>
                                        <div className="flex w-full justify-between md:w-72">
                                            <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-700 focus:ring-pink-500 active:bg-green-900">
                                                Download
                                            </PrimaryButton>
                                            <SelectInput
                                                label="Select Month"
                                                options={MONTHS}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <ul
                                        role="list"
                                        className="divide-y divide-gray-100"
                                    >
                                        {people.map((person) => (
                                            <li
                                                key={person.email}
                                                className="flex items-center justify-between gap-x-6 py-4"
                                            >
                                                {/* Left Section */}
                                                <div className="flex items-center gap-x-4">
                                                    <img
                                                        alt=""
                                                        src={person.imageUrl}
                                                        className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            Item Name
                                                        </p>
                                                        <p className="mt-1 truncate text-xs text-gray-500">
                                                            Quantity: 10
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Middle Section */}
                                                <div className="flex flex-col items-end text-right">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                                        Price:
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        ₱100
                                                    </p>
                                                </div>
                                                {/* Middle Section */}
                                                <div className="flex flex-col items-end text-right">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                                        Total:
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        ₱1000
                                                    </p>
                                                </div>

                                                {/* Right Section */}
                                                <div className="flex items-center gap-x-4">
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {person.name}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500">
                                                            Cashier
                                                        </p>
                                                    </div>
                                                    <img
                                                        alt=""
                                                        src={person.imageUrl}
                                                        className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                                                    />
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
        </AuthenticatedLayout>
    );
}
