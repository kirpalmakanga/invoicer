<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invoice extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'reference',
        'customerId',
        'items',
        'paymentMethod',
        'status',
        'datePaid',
        'userId',
    ];

    protected function casts(): array
    {
        return [
            'items' => 'array',
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
            $model->userId = auth('api')->user()->id;
        });
    }
}
