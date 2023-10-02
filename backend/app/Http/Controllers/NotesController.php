<?php

namespace App\Http\Controllers;

use App\Models\NoteList;
use App\Services\NotesService;
use Illuminate\Http\Request;
use App\Models\Note;

class NotesController extends Controller
{
    public function show()
    {
        $userId = auth()->user()->id;
        $notes = Note::where('user_id', $userId)->orderBy('position')->get();

        return response()->json([
            'notes' => $notes
        ]);
    }

    public function create(Request $request)
    {
        $userId = auth()->user()->id;

        $validated = $request->validate([
            'title' => 'required|max:255',
            'text' => 'nullable|max:255',
            'note_list_id' => 'required',
        ]);

        $validated['user_id'] = $userId;
        $validated['position'] = Note::where('user_id', $validated['user_id'])->max('position') + 1;

        $noteList = NoteList::where('id', $validated['note_list_id'])
            ->where('user_id', $validated['user_id'])
            ->first();

        if (! $noteList) {
            $validated['note_list_id'] = NoteList::where('user_id', $validated['user_id'])->first()->id;
        }

        try {
            $note = Note::create($validated);
        } catch(\Exception $e) {
            return $e;
        }


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

    public function changePosition($noteId, Request $request)
    {
        $validated = $request->validate([
            'curr' => 'required|min:0'
        ]);

        $note = Note::find($noteId);

        if (! $note) {
            abort(404, "Note not found");
        }

        return app(NotesService::class)->changeNotePosition($note, $validated['curr']);
    }
}
