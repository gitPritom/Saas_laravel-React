<?php

namespace App\Models\Spatie;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted(): void
    {
        static::creating(function (Role $role) {
            if (empty($role->id)) {
                $role->id = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
}