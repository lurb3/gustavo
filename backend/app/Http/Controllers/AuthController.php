<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        $user = User::create(request(['name', 'email', 'password']));
        
        auth()->login($user);
    }

    public function login()
    {
        if (! auth()->attempt(request(['email', 'password']))) {
            abort(403);
        }

        $token = auth()->user()->createToken('auth_token');
        
        return response()->json([
            'user' => auth()->user(),
            'token' => $token->plainTextToken
        ]);
    }

    public function logout()
    {
        $user = auth()->user();
        
        if ($user) {
            $user->currentAccessToken()->delete();
        }
    }

    public function getMe()
    {
        return auth()->user();
    }
}
