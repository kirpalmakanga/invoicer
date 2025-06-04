<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Settings extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'name',
        'address',
        'email',
        'companyId',
        'invoicePrefix',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->userId = auth('api')->user()->id;
        });
    }
}
