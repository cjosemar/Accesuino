<?php

namespace App\Entities;

use App\Support\UuidScopeTrait;

/**
 * Class Permission.
 */
class Permission extends \Spatie\Permission\Models\Permission
{
    use UuidScopeTrait;

    protected $guard_name = '*';

    /**
     * @var array
     */
    protected $fillable = ['name', 'uuid', 'guard_name'];
}
