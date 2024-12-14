<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'quantity',
        'deleted_at'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
