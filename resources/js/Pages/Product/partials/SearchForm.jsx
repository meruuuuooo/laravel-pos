import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import swal2 from 'sweetalert2';

export default function SearhForm({ filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('product.index'),
            { search },
            {
                preserveState: true,
                preserveScroll: true,
                onStart: () => {
                    swal2.fire({
                        title: 'Searching Products',
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
                onError: () => {
                    swal2.close();
                },
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        router.get(route('product.index'), {}, { preserveState: true });
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-4">
            <TextInput
                type="text"
                className="w-52 rounded-md border border-pink-300 px-4 py-2 text-sm text-gray-800 focus:ring-pink-500"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
    );
}
