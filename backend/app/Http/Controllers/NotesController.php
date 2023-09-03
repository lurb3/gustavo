<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NotesController extends Controller
{
    public function show()
    {
        $userId = auth()->user()->id;
        $notes = Note::where('user_id', $userId)->get();

        return response()->json([
            'notes' => $notes
        ]);
    }

    public function create(Request $request)
    {
        $userId = auth()->user()->id;

        $validated = $request->validate([
            'title' => 'required|max:255',
            'text' => 'nullable|max:255'
        ]);

        $validated['user_id'] = $userId;

        $note = Note::create($validated);

        return response()->json($note);
    }

    public function delete($noteId)
    {
        $note = Note::find($noteId);

        if (! $note) {
            return response()->json([
                'message' => 'Note not found'
            ], 404);
        }

        $note->delete();

        return true;
    }
}
