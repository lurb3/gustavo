<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthlyIncome extends Model
{
    use HasFactory;

    protected $table = 'monthly_income';

    protected $fillable = [
        'amount',
        'company_id',
        'user_id'
    ];
}
