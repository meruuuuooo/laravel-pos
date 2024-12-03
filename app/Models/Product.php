<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'imageURL',
        'name',
        'category_id',
        'price',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function inventory(): HasOne
    {
        return $this->hasOne(Inventory::class);
    }

    public function salesDetails(): HasMany
    {
        return $this->hasMany(SalesDetail::class);
    }

    public function restockingHistory(): HasMany
    {
        return $this->hasMany(RestockingHistory::class);
    }
}
