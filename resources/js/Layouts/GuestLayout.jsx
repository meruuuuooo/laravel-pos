import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex h-screen w-screen flex-row bg-gray-100">
            {/* Left Side - Image */}
            <div className="flex flex-1 items-center justify-center">
                <img
                    src="icons/bg-login.png"
                    alt="logindesign"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-1 flex-col items-center justify-center bg-white">
                <div className="flex flex-col items-center justify-center">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                    <p className="mt-2 text-3xl font-extrabold text-pink-500 underline">
                        Login
                    </p>
                </div>

                <div className="mt-6 w-full max-w-md overflow-hidden rounded-lg bg-white px-6 py-4 shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
