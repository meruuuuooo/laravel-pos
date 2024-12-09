import { Link } from '@inertiajs/react';

export default function Pagination({ value }) {
    return (
        <div className="border-blue-gray-50 flex items-center justify-between border-t p-4">
            {/* Mobile View: Previous and Next Buttons */}
            <div className="flex gap-2 sm:hidden">
                <Link
                    href={value.prev_page_url}
                    preserveScroll
                    className={`rounded-md border border-gray-300 px-4 py-2 text-sm text-blue-500${
                        value.prev_page_url
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'cursor-not-allowed text-gray-400'
                    }`}
                >
                    Previous
                </Link>
                <Link
                    href={value.next_page_url}
                    preserveScroll
                    className={`rounded-md border border-gray-300 px-4 py-2 text-sm text-blue-500 ${
                        value.next_page_url
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'cursor-not-allowed text-gray-400'
                    }`}
                >
                    Next
                </Link>
            </div>

            {/* Desktop View: Pagination Links */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-blue-gray-700 text-sm font-normal">
                        Showing{' '}
                        <span className="font-medium text-black">
                            {value.from}{' '}
                        </span>
                        to{' '}
                        <span className="font-medium text-black">
                            {value.to}{' '}
                        </span>
                        of{' '}
                        <span className="font-medium text-black">
                            {value.total}
                        </span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {value.links.map((link, index) => (
                            <Link
                                preserveScroll
                                href={link.url}
                                key={index}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                    link.active
                                        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                } ${
                                    !link.url &&
                                    'cursor-not-allowed text-gray-400'
                                }`}
                                aria-current={link.active ? 'page' : undefined}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
