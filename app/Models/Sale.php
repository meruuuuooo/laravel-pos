<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model
{

    protected $fillable = ['user_id', 'total_amount'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function salesDetails(): HasMany
    {
        return $this->hasMany(SalesDetail::class);
    }
}
