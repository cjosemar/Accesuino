<?php

namespace App\Entities;

use App\Support\HasPermissionsUuid;
use App\Support\UuidScopeTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;

class Horario extends Model
{
    use UuidScopeTrait, HasPermissionsUuid, SoftDeletes;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'horarios';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable =
        [
            'uuid',
            'nombre',
            'hora_inicio',
            'hora_salida',
            'horas_trabajo'
        ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'deleted_at'
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
     * @return \Illuminate\Database\Eloquent\Builder|Model
     */
    public static function create(array $attributes = [])
    {


       if (!(array_key_exists('horas_trabajo', $attributes))) {

           $horario['hora_inicio'] = Carbon::createFromTimeString($attributes['hora_inicio']);
           $horario['hora_salida'] = Carbon::createFromTimeString($attributes['hora_salida']);
           $horario['horas_trabajo'] = $horario['hora_salida']->diff($horario['hora_inicio'])->h;

           $horario['nombre'] = $attributes['nombre'];

        }
        if (!(array_key_exists('hora_salida', $attributes))) {
            $horario['hora_inicio'] = Carbon::createFromTimeString($attributes['hora_inicio']);
            $horario['horas_trabajo'] = $attributes['horas_trabajo'];
            $horario['hora_salida'] = Carbon::createFromTimeString($attributes['hora_inicio'])->addHours($horario['horas_trabajo']);
            $horario['nombre'] = $attributes['nombre'];
        }

        if ((array_key_exists('horas_trabajo', $attributes))){
            $horario['nombre'] = $attributes['nombre'];
            $horario['hora_inicio'] = Carbon::createFromTimeString($attributes['hora_inicio']);
            $horario['hora_salida'] = Carbon::createFromTimeString($attributes['hora_salida']);
            $horario['horas_trabajo'] = $attributes['horas_trabajo'];
        }

        $model = static::query()->create($horario);

        return $model;
    }


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function  empleados()
    {
        return $this->hasMany(Empleado::class, 'horario_uuid', 'uuid');
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
