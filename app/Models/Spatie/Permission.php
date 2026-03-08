<?php

namespace App\Models\Spatie;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    protected static function booted(): void
    {
        static::creating(function (Permission $permission) {
            if (empty($permission->id)) {
                $permission->id = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
}