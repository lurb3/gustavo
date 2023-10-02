<?php

namespace App\Services;

use App\Models\Note;

class NotesService
{
    public function changeNotePosition(Note $note, $position)
    {
        if ((int) $note->position === (int) $position) {
            return false;
        }

        try {
            $incrementPosition = $note->position < $position;
            Note::where('user_id', $note->user_id)
                ->whereBetween('position', [
                    $incrementPosition ? $note->position + 1 : (int) $position,
                    $incrementPosition ? (int) $position : $note->position - 1
                ])
                ->chunkById(100, function ($notes) use ($incrementPosition) {
                    foreach ($notes as $updateNote){
                        $newPos = $incrementPosition ? $updateNote->position - 1 : $updateNote->position + 1;
                        $updateNote->update(['position' => $newPos]);
                    }
                });
            $note->update(['position' => $position]);

            return true;
        } catch (\Exception $e) {
            return $e;
        }
    }
}
