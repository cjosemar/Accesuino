<?php

namespace App\Entities;

use App\Entities\Assets\Asset;
use App\Support\HasPermissionsUuid;
use App\Support\UuidScopeTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Illuminate\Support\Facades\Hash;

class Empleado extends Model
{
    use UuidScopeTrait, HasPermissionsUuid, SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'empleados';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable =
        [
            'uuid',
            'nombre',
            'apellidos',
            'nif',
            'direccion',
            'poblacion',
            'codigopostal',
            'provincia',
            'email',
            'telefono',
            'password',
            'coste_hora',
            'coste_hora_extra',
            'uid_tarjeta',
            'puesto_uuid',
            'horario_uuid',
            'asset_uuid',
        ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden =
        [
            'deleted_at',
            'password',
        ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates =
        [
            'created_at',
            'updated_at',
            'deleted_at'
        ];

    /**
     * @param array $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public static function create(array $attributes = [])
    {
        if (array_key_exists('password', $attributes)) {
            $attributes['password'] = Hash::make($attributes['password']);
        }

        $model = static::query()->create($attributes);

        return $model;
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function asset()
    {
        return $this->hasOne(Asset::class, 'uuid', 'asset_uuid');
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function puesto()
    {

        return $this->belongsTo(Puesto::class, 'puesto_uuid', 'uuid');

    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function horario()
    {
        return $this->belongsTo(Horario::class, 'horario_uuid', 'uuid');
    }

    public function  permisostrabajos()
    {
        return $this->hasMany(PermisoTrabajo::class, 'empleado_uuid', 'uuid');
    }

    public function registro()
    {
        return $this->hasMany(Registro::class, 'empleado_uuid', 'uuid');
    }

    /**
     * Determine if the model may perform the given permission.
     *
     * @param string|int|\Spatie\Permission\Contracts\Permission $permission
     * @param string|null $guardName
     *
     * @return bool
     * @throws PermissionDoesNotExist
     */
    public function hasPermissionTo($permission, $guardName = '*'): bool
    {
        if (config('permission.enable_wildcard_permission', false)) {
            return $this->hasWildcardPermission($permission, $guardName);
        }

        $permissionClass = $this->getPermissionClass();

        if (is_string($permission)) {
            $permission = $permissionClass->findByName(
                $permission,
                $guardName ?? $this->getDefaultGuardName()
            );
        }

        if (is_int($permission)) {
            $permission = $permissionClass->findById(
                $permission,
                $guardName ?? $this->getDefaultGuardName()
            );
        }

        if (! $permission instanceof Permission) {
            throw new PermissionDoesNotExist;
        }

        return $this->hasDirectPermission($permission) || $this->hasPermissionViaRole($permission);
    }

    protected function getDefaultGuardName(): string
    {
        return '*';
    }
}
