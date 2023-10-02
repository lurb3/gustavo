<?php

namespace App\Http\Controllers;

use App\Models\NoteList;
use Illuminate\Http\Request;

class NoteListsController extends Controller
{
    public function show()
    {
        $userId = auth()->user()->id;

        try {
            $noteLists = NoteList::where('user_id', $userId)->orderBy('position')->get();
        } catch (\Exception $e) {
            return $e;
        }

        return response()->json([
            'note_lists' => $noteLists
        ]);
    }
}
