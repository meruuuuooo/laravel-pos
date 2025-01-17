import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { usePermission } from '@/Composable/Permissions';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { hasRole } = usePermission();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-44 border-r border-gray-200 bg-white transition-transform duration-300 sm:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:relative sm:block`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex flex-col items-center justify-between p-4">
                        <Link href="/" className="mx-auto">
                            <img
                                src="/icons/business logo.jpeg"
                                alt="business Logo"
                                className="w-13 h-13"
                            />
                        </Link>
                        {/* Toggle button for smaller screens */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 sm:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <p className="text-sm text-pink-500">
                            {hasRole('admin') ? 'Admin' : 'Cashier'}
                        </p>
                    </div>

                    <ul className="space-y-2">
                        <li
                            className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                route().current('dashboard')
                                    ? 'bg-pink-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <img
                                src="/icons/dashboard.png"
                                alt="Dashboard Logo"
                                className="h-8 w-8"
                            />
                            <NavLink
                                href={route('dashboard')}
                                className={`flex items-center space-x-3 px-4 transition ${
                                    route().current('dashboard')
                                        ? 'text-white'
                                        : 'text-gray-700'
                                }`}
                            >
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        {hasRole('cashier') && (
                            <li
                                className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                    route().current('order.index')
                                        ? 'bg-pink-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <img
                                    src="/icons/orders.png"
                                    alt="Order Logo"
                                    className="h-8 w-8"
                                />
                                <NavLink
                                    href={route('order.index')}
                                    className={`flex items-center space-x-3 px-4 transition ${
                                        route().current('order.index')
                                            ? 'text-white'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    <span>Order</span>
                                </NavLink>
                            </li>
                        )}

                        {hasRole('admin') || hasRole('cashier') ? (
                            <li
                                className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                    route().current('inventory.index')
                                        ? 'bg-pink-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <img
                                    src="/icons/inventory.png"
                                    alt="Inventory Logo"
                                    className="h-8 w-8"
                                />
                                <NavLink
                                    href={route('inventory.index')}
                                    className={`flex items-center space-x-3 px-4 transition ${
                                        route().current('inventory.index')
                                            ? 'text-white'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    <span>Inventory</span>
                                </NavLink>
                            </li>
                        ) : null}

                        {hasRole('admin') && (
                            <>
                                <li
                                    className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                        route().current('product.index')
                                            ? 'bg-pink-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <img
                                        src="/icons/product.png"
                                        alt="Product Logo"
                                        className="h-8 w-8"
                                    />
                                    <NavLink
                                        href={route('product.index')}
                                        className={`flex items-center space-x-3 px-4 transition ${
                                            route().current('product.index')
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span>Products</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                        route().current('category.index')
                                            ? 'bg-pink-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <img
                                        src="/icons/icons8-categories-32.png"
                                        alt="Category Logo"
                                        className="h-8 w-8"
                                    />
                                    <NavLink
                                        href={route('category.index')}
                                        className={`flex items-center space-x-3 px-4 transition ${
                                            route().current('category.index')
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span>Category</span>
                                    </NavLink>
                                </li>
                                <li
                                    className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                        route().current('sale.index')
                                            ? 'bg-pink-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <img
                                        src="/icons/sales.png"
                                        alt="Category Logo"
                                        className="h-8 w-8"
                                    />
                                    <NavLink
                                        href={route('sale.index')}
                                        className={`flex items-center space-x-3 px-4 transition ${
                                            route().current('sale.index')
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span>Sales Report</span>
                                    </NavLink>
                                </li>
                                {/* <li
                                    className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                        route().current('product.trash')
                                            ? 'bg-pink-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <img
                                        src="/icons/trash.png"
                                        alt="trash Logo"
                                        className="h-8 w-8"
                                    />
                                    <NavLink
                                        href={route('product.trash')}
                                        className={`flex items-center space-x-3 px-4 transition ${
                                            route().current('product.trash')
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span>Trash</span>
                                    </NavLink>
                                </li> */}
                                <li
                                    className={`flex items-center space-x-3 p-2 shadow-sm transition ${
                                        route().current('user.index')
                                            ? 'bg-pink-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <img
                                        src="/icons/users.png"
                                        alt="Category Logo"
                                        className="h-8 w-8"
                                    />
                                    <NavLink
                                        href={route('user.index')}
                                        className={`flex items-center space-x-3 px-4 transition ${
                                            route().current('user.index')
                                                ? 'text-white'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        <span>User</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                <header className="hidden items-center justify-between bg-white px-6 py-3 shadow sm:flex">
                    <p className="text-xl font-bold">
                        <span className="text-pink-500">Pats </span>
                        Convenience
                    </p>
                    <div className="flex items-center space-x-6">
                        {/* Notification Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="relative flex items-center text-gray-500 focus:outline-none">
                                    <svg
                                        className="h-6 w-6 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
                                        />
                                    </svg>
                                    {/* Notification Badge */}
                                    <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        3
                                    </span>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="w-72">
                                <div className="p-4 text-sm font-semibold text-gray-700">
                                    Notifications
                                </div>
                                <ul className="max-h-64 overflow-auto">
                                    <li className="border-b px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                                        New order received!
                                    </li>
                                    <li className="border-b px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                                        Inventory updated.
                                    </li>
                                    <li className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                                        Profile settings updated.
                                    </li>
                                </ul>
                                <div className="p-2 text-center">
                                    <button className="text-sm text-blue-500 hover:underline">
                                        View all
                                    </button>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                        {/* User Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center text-sm text-gray-500 focus:outline-none">
                                    <svg
                                        className="mr-2 h-5 w-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm0 2c-3.86 0-7 2.686-7 6v1h14v-1c0-3.314-3.14-6-7-6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {user.name}
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
