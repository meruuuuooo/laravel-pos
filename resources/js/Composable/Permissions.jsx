import { usePage } from '@inertiajs/react';

export function usePermission() {
    const hasRole = (name) => usePage().props.auth.roles.includes(name);
    const hasPermission = (name) =>
        usePage().props.auth.permission.includes(name);

    return { hasRole, hasPermission };
}
