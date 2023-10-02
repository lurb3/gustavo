<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NoteList extends Model
{
    use HasFactory;

    protected $table = 'note_lists';

    protected $fillable = [
        'title',
        'position',
        'user_id'
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
