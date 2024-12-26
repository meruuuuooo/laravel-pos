<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Http\RedirectResponse;



class UserController extends Controller
{


    public function index()
    {

        $users = User::where('id', '!=', auth()->id())->get();

        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }


    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|exists:roles,name', // Validate the role
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        // Assign the role to the user
        $user->assignRole($request->role);

        event(new Registered($user));

        return redirect(route('user.index', absolute: false));
    }


    public function destroy(User $user): void
    {
        $user->delete();
    }
}
