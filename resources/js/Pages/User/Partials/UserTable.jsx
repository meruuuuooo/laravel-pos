import PrimaryButton from '@/Components/PrimaryButton';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
const TABLE_HEAD = ['Member', 'Role', 'Status', 'Created At'];

export default function UserTable({ users }) {
    return (
        <div className="rounded-lg bg-white shadow">
            <div className="rounded-t-lg border-b p-4">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <h5 className="text-blue-gray-900 text-lg font-semibold">
                            User list
                        </h5>
                        <p className="mt-1 text-sm font-normal text-gray-500">
                            See information about all members
                        </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Link href={route('user.create')}>
                            <PrimaryButton className="bg-green-500 hover:bg-green-700 focus:bg-green-700 focus:ring-pink-500 active:bg-green-900">
                                <UserPlusIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />
                                Add user
                            </PrimaryButton>
                        </Link>
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
                        {users.map((user) => (
                            <tr key={user.name}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://avatar.iran.liara.run/username?username=${user.name}`}
                                            alt={user.name}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <div className="flex flex-col">
                                            <p className="text-blue-gray-700 text-sm font-medium">
                                                {user.name}
                                            </p>
                                            <p className="text-blue-gray-500 text-sm font-normal">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <p className="text-blue-gray-700 text-sm font-medium">
                                            {user.role}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className={`text-blue-gray-700 rounded-md px-2 py-1 text-xs font-medium ${
                                            user.email_verified_at
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {user.email_verified_at
                                            ? 'Verified'
                                            : 'Unverified'}
                                    </span>
                                </td>
                                <td>
                                    <p className="text-blue-gray-700 text-sm font-normal">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
