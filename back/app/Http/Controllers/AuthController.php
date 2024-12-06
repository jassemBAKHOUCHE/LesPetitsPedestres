<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        $request->validate([
            'pseudo' => 'required|string|max:255',
            'password' => 'required|string|min:8',
        ]);

        try {
            $user = User::create([
                'pseudo' => $request->pseudo,
                'password' => Hash::make($request->password),
            ]);
    
            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
            ], 201); // Code HTTP 201 pour la création
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering user',
                'error' => $e->getMessage(),
            ], 500); // Code HTTP 500 pour une erreur interne
        }
    }

    /**
     * Login a user and issue a token.
     */
    public function login(Request $request)
    {
        $request->validate([
            'pseudo' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('pseudo', $request->pseudo)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Logout the user (Revoke all tokens).
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}
