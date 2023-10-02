<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Note extends Model
{
    use HasFactory;

    protected $table = 'notes';

    protected $fillable = [
        'title',
        'text',
        'position',
        'note_list_id',
        'user_id'
    ];

    public function noteList(): HasOne
    {
        return $this->hasOne(NoteList::class);
    }
}
