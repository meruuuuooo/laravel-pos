<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    protected $fillable = ['name'];

    public function salesDetails()
    {
        return $this->hasMany(SalesDetail::class);
    }
}
