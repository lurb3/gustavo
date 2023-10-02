<?php

namespace App\Http\Controllers;

use App\Models\NoteList;
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

        $user = User::where('email', $request->email)->first();

        if ($user) {
            return response()->json(['message' => 'Email already exists'], 409);
        }

        $user = User::create(request(['name', 'email', 'password']));
        NoteList::create(['title' => 'To do', 'user_id' => $user->id]);

        auth()->login($user);

        return true;
    }

    public function login()
    {
        if (! auth()->attempt(request(['email', 'password']))) {
            return response()->json(['message' => 'Not authorized'], 401);
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
